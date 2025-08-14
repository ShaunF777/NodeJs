module.exports = (temp, product) => {
    // Use 'let' so we can mutate output's value as needed
    // Replace all placeholders in the template with product data using regular expressions.
    // The /g flag means "global", so it replaces every occurrence, not just the first.
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
    output = output.replace(/{%IMAGE%}/g, product.image); 
    output = output.replace(/{%PRICE%}/g, product.price); 
    output = output.replace(/{%FROM%}/g, product.from); 
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients); 
    output = output.replace(/{%QUANTITY%}/g, product.quantity); 
    output = output.replace(/{%DESCRIPTION%}/g, product.description); 
    output = output.replace(/{%ID%}/g, product.id); 
    // If product is not organic, add a class to hide the organic badge in template-product.html
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 
    return output; // Return the final HTML string
}