const math = require('./maths');
//if module export nh ilikha h udhar
console.log(math); //empty object because we have not exported anything from the maths.js file
//but agar module export likha h toh poora object export hota h jisme humne jo bhi export kiya h wo hota h
console.log(math); //{ add: [Function: add] } because we have exported the add function from the maths.js file
//agar humne module export me add function ko export kiya h toh hum usko use kar sakte h
console.log(math.add(2, 5));
console.log(math.sub(5, 2));