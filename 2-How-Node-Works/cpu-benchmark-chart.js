// ===============================
// CPU-bound Thread Pool Benchmark
// ===============================
// REQUIRES: npm install chartjs-node-canvas

// This script shows how UV_THREADPOOL_SIZE in Node.js affects
// CPU-bound work execution times by visualizing task timelines.
// It runs a naive prime-counting function (pure JavaScript) with
// 4 and 12 threads, then plots a chart comparing them.

// Import performance API for timing
const { performance } = require('perf_hooks');

// Chart library for drawing the timeline
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

// -----------------------------
// Pure CPU-bound prime counter
// -----------------------------
function cpuTask(n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    let prime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        prime = false;
        break;
      }
    }
    if (prime) count++;
  }
  return count; // Not actually used, just keeps CPU busy
}

// ----------------------------------------
// Run a benchmark with a given thread size
// ----------------------------------------
function runTest(threadPoolSize, tasks, workSize) {
  return new Promise((resolve) => {
    // Set the thread pool size for this run
    process.env.UV_THREADPOOL_SIZE = threadPoolSize.toString();

    const startTime = performance.now();
    let completed = 0;
    const startTimes = []; // Store when each task starts
    const endTimes = []; // Store when each task ends

    console.log(
      `\n--- Running with UV_THREADPOOL_SIZE = ${threadPoolSize} ---`
    );

    for (let i = 0; i < tasks; i++) {
      // Record start time for this task
      startTimes.push({ id: i, time: performance.now() - startTime });

      // Use setImmediate to push the CPU task into the event loop queue
      setImmediate(() => {
        cpuTask(workSize); // Do the heavy work
        // Record end time
        endTimes.push({ id: i, time: performance.now() - startTime });

        completed++;
        if (completed === tasks) {
          const totalTime = performance.now() - startTime;
          console.log(`All ${tasks} tasks done in ${totalTime.toFixed(1)} ms`);
          resolve({ threadPoolSize, startTimes, endTimes, totalTime });
        }
      });
    }
  });
}

// -------------------------------------------
// Draw a horizontal timeline chart of results
// -------------------------------------------
async function drawChart(results, tasks) {
  const width = 1000;
  const height = 600;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  // Convert results to dataset for Chart.js
  const datasets = results.map((res, idx) => {
    return {
      label: `${res.threadPoolSize} Threads`,
      data: res.startTimes.map((st) => {
        const et = res.endTimes.find((x) => x.id === st.id).time;
        return {
          x: [st.time / 1000, et / 1000], // seconds
          y: `${res.threadPoolSize}T-Task${st.id}`,
        };
      }),
      backgroundColor:
        idx === 0 ? 'rgba(255,99,132,0.6)' : 'rgba(54,162,235,0.6)',
      borderColor: idx === 0 ? 'rgba(255,99,132,1)' : 'rgba(54,162,235,1)',
      borderWidth: 1,
      borderSkipped: false,
    };
  });

  // Chart configuration
  const configuration = {
    type: 'bar',
    data: {
      datasets: datasets,
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: { display: true, text: 'Time (seconds)' },
        },
        y: {
          title: { display: true, text: 'Tasks' },
        },
      },
      plugins: {
        tooltip: { enabled: false },
        legend: { position: 'top' },
      },
      parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y',
      },
    },
  };

  // Render chart and save to PNG
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync('threadpool_timeline.png', image);
  console.log('Chart saved to threadpool_timeline.png');
}

// -------------------
// Run the whole test
// -------------------
(async () => {
  const tasks = 12; // Number of CPU jobs to run
  const workSize = 50000; // Bigger number = heavier work

  const res4 = await runTest(4, tasks, workSize);
  const res12 = await runTest(12, tasks, workSize);

  await drawChart([res4, res12], tasks);
})();

// ---------------
// How to run
//----------------
/* Runs 4 threads → logs execution time

Runs 12 threads → logs execution time

Generates threadpool_timeline.png showing the waves of execution.

💡 What you’ll see:

4 threads → tasks finish in several waves because only 4 can run at once.

12 threads → most tasks start and finish together in 1–2 waves. */