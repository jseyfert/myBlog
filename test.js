var dateFormat = require('dateformat');
var now = new Date();
var currentDate =  dateFormat(now, "mmmm dS, yyyy");
console.log(currentDate);