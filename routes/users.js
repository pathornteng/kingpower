var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');

async function getItem(url) {
  html = await rp(url)
  var $ = cheerio.load(html);
  item = {
    name:$('#product-detail-title-product-name').text(),
    sku:$('#product-detail-sku-number').text(),
    price:$('#product-detail-label-product-price').text(),
    description:$('#product-detail-label-shortdescription').text(),
    image:$('#product-slice-image-main-desktop').attr('src'),
  }
  console.log(item)
  return item
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  url = 'https://www.kingpower.com/product/apple-usb-c-to-lightning-cable-1-m?lang=en';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      item = {
        name:$('#product-detail-title-product-name').text(),
        sku:$('#product-detail-sku-number').text(),
        price:$('#product-detail-label-product-price').text(),
        description:$('#product-detail-label-shortdescription').text(),
        image:$('#product-slice-image-main-desktop').attr('src'),
      }
      res.send(item)
    }
  })
});

router.get('/product', async function(req, res, next) {
  url = 'https://www.kingpower.com/category/home-and-living?lang=en&page=100'
 
  html = await rp(url)
  var $ = cheerio.load(html);
  var products = $('.s1xmjep2-7.fCMcWq')
  var items = []
  for(var i=0;i<products.length;i++) {
    var url = 'https://www.kingpower.com' + $('.s1xmjep2-7.fCMcWq')[i].attribs.href;
    console.log(url)
    var item = await getItem(url)
    //console.log(item)
    items.push(item)
  }
  res.send(items)
});

module.exports = router;
