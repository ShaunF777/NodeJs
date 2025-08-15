// benchmark.js
const crypto = require('crypto');

function runTest(threadPoolSize) {
  return new Promise((resolve) => {
    process.env.UV_THREADPOOL_SIZE = threadPoolSize.toString();
    const start = Date.now();

    let completed = 0;
    let running = 0;
    const totalJobs = 12;

    console.log(`\n--- Running with UV_THREADPOOL_SIZE = ${threadPoolSize} ---`);
    console.log(`Starting ${totalJobs} crypto jobs...\n`);

    for (let i = 0; i < totalJobs; i++) {
      console.log(`[${Date.now() - start}ms] Job ${i + 1} STARTED (running: ${++running})`);

      crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        console.log(`[${Date.now() - start}ms] Job ${i + 1} FINISHED (running: ${--running})`);

        completed++;
        if (completed === totalJobs) {
          console.log(`\nAll ${totalJobs} jobs done in ${Date.now() - start} ms\n`);
          resolve();
        }
      });
    }
  });
}

(async () => {
  await runTest(4);   // limited threads
  await runTest(12);  // matches CPU threads
})();

