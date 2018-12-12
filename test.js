var url = require('url');
var adr = 'https://www.kingpower.com/category/beauty/skincare/facial?availability=dutyfree&lang=en&brands=&categories=eye-cream&priceMin=130&priceMax=37990';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

//var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
//console.log(qdata); //returns 'february'
//q.query.page++
page = parseInt(q.query.page) || 0
page += 1
q.query.page = page + ""
delete q.search
console.log(q.query)
console.log(url.format(q))
