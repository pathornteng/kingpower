var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var url = require('url');
mongoose.connect('mongodb://localhost/kingpower')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
// import user model
const Product = require('../models/product');

async function getItem(url) {
  html = await rp(url)
  var $ = cheerio.load(html);
  var sku;
  skuNumber = $('span[data-reactid=315]').text().split(" ")
  console.log(skuNumber.length)
  if (skuNumber.length == 2) {
    sku = skuNumber[1]
  }
  item = {
    url:url,
    name:$('h2[data-reactid=313]').text(),
    sku:sku,
    price:$('span[data-reactid=322]').text(),
    description:$('div[data-reactid=369]').text(),
    image:$('img[data-reactid=310]').attr('src'),
  }
  if (item.name == "") {
    item.name = $('#product-detail-title-product-name').text()
    item.price = $('#product-detail-label-product-price').text()
    item.description = $('#product-detail-label-shortdescription').text()
    item.image = $('#product-slice-image-main-desktop').attr('src')
    item.sku = $('#product-detail-sku-number').text()
  }
  if (item.name == "") {
    item.name = $('h4[data-reactid=252]').text()
    item.sku = $('h5[data-reactid=257]').text()
    item.price = $('span[data-reactid=261]').text()
    item.description = $('div[data-reactid=253]').text()
    item.image = $('img[data-reactid=247]').attr('src')
  }
  if (item.name == "") {
    item.name = $('h2[data-reactid=329]').text()
    item.sku = $('span[data-reactid=335]').text()
    item.price = $('span[data-reactid=339]').text()
    item.description = $('span[data-reactid=330]').text()
    item.image = $('img[data-reactid=318]').attr('src')
  }
  //clinique
  if (item.name == "") {
    item.name = $('h2[data-reactid=310]').text()
    item.sku = $('small[data-reactid=313]').text()
    item.price = $('span[data-reactid=321]').text()
    item.description = $('p[data-reactid=314]').text()
    item.image = $('img[data-reactid=301]').attr('src')
  }
  //lamare
  if (item.name == "") {
    item.name = $('h1[data-reactid=197]').text()
    item.sku = $('div[data-reactid=218]').text()
    item.price = $('span[data-reactid=194]').text()
    item.description = $('p[data-reactid=203]').text()
    item.image = $('img[data-reactid=165]').attr('src')
  }
  //lamare2
  if (item.name == "") {
    item.name = $('h1[data-reactid=171]').text()
    item.sku = $('div[data-reactid=188]').text()
    item.price = $('span[data-reactid=191]').text()
    item.description = $('p[data-reactid=177]').text()
    item.image = $('img[data-reactid=165]').attr('src')
  }
  //lamare3
  if (item.name == "") {
    item.name = $('h1[data-reactid=169]').text()
    item.sku = $('div[data-reactid=186]').text()
    item.price = $('span[data-reactid=189]').text()
    item.description = $('p[data-reactid=175]').text()
    item.image = $('img[data-reactid=163]').attr('src')
  }
  //lamare4
  if (item.name == "") {
    item.name = $('h1[data-reactid=192]').text()
    item.sku = $('div[data-reactid=213]').text()
    item.price = $('span[data-reactid=216]').text()
    item.description = $('p[data-reactid=198]').text()
    item.image = $('img[data-reactid=163]').attr('src')
  }
  if (item.price == "") {
    item.price = $('#product-detail-label-product-price-discount').text()
  }
  console.log(item)
  return item
}

async function getItem2(url) {
  html = await rp(url)
  var $ = cheerio.load(html);
  item = {
    url:url,
    name:$('h4[data-reactid=252]').text(),
    sku:$('h5[data-reactid=257]').text(),
    price:$('span[data-reactid=261]').text(),
    description:$('div[data-reactid=253]').text(),
    image:$('img[data-reactid=247]').attr('src'),
  }

  if (item.name == "") {
    item.name = $('h2[data-reactid=329]').text()
    item.sku = $('span[data-reactid=335]').text()
    item.price = $('span[data-reactid=339]').text()
    item.description = $('span[data-reactid=330]').text()
    item.image = $('img[data-reactid=318]').attr('src')
  }

  //clinique
  if (item.name == "") {
    item.name = $('h2[data-reactid=310]').text()
    item.sku = $('small[data-reactid=313]').text()
    item.price = $('span[data-reactid=321]').text()
    item.description = $('p[data-reactid=314]').text()
    item.image = $('img[data-reactid=301]').attr('src')
  }

  //lamare3
  if (item.name == "") {
    item.name = $('h1[data-reactid=169]').text()
    item.sku = $('div[data-reactid=186]').text()
    item.price = $('span[data-reactid=189]').text()
    item.description = $('p[data-reactid=175]').text()
    item.image = $('img[data-reactid=163]').attr('src')
  }

  //lamare
  if (item.name == "") {
    item.name = $('h1[data-reactid=197]').text()
    item.sku = $('div[data-reactid=218]').text()
    item.price = $('span[data-reactid=194]').text()
    item.description = $('p[data-reactid=203]').text()
    item.image = $('img[data-reactid=165]').attr('src')
  }

  //lamare2
  if (item.name == "") {
    item.name = $('h1[data-reactid=171]').text()
    item.sku = $('div[data-reactid=188]').text()
    item.price = $('span[data-reactid=191]').text()
    item.description = $('p[data-reactid=177]').text()
    item.image = $('img[data-reactid=165]').attr('src')
  }

  //lamare4
  if (item.name == "") {
    item.name = $('h1[data-reactid=192]').text()
    item.sku = $('div[data-reactid=213]').text()
    item.price = $('span[data-reactid=216]').text()
    item.description = $('p[data-reactid=198]').text()
    item.image = $('img[data-reactid=163]').attr('src')
  }

  item.category = "beauty"

  return item
}

async function getItems(url, category) {
  html = await rp(url)
  var $ = cheerio.load(html);
  var products = $('.s1xmjep2-7.fCMcWq')

  if (!products.length) {
    return false
  }
  //var items = []
  for(var i=0;i<products.length;i++) {
    var url = 'https://www.kingpower.com' + $('.s1xmjep2-7.fCMcWq')[i].attribs.href;
    console.log(url)
    getItem(url).then(function(item) {
      item.category = category
      item.price = parseInt(item.price.replace(",",""))
      item.image = item.image.replace(",","%2C")
      if (item.sku == "") {
        item.sku = Date.now()
      }
      Product.find({ sku: item.sku }, function(err, foundItem) {
        if (foundItem.length == 0) {
          console.log("create new")
          var result = Product.create(item, function (err, post) {});
          //console.log(result)
        } else {
          console.log("-----------> found duplication")
          console.log(item.name, item.sku, foundItem[0].name, foundItem[0].sku)
          foundItem.category = item.category
          var result = Product.updateOne(foundItem.Id, foundItem, function (err, post) {});
          //console.log(result)
        }
      })
    })
  }
  return true
}

router.get('/total', async function(req, res, next) {
  var total = await Product.find().count()
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ total: total, crawling: global.crawling }, null, 4));
})
/* GET users listing. */
router.get('/item', async function(req, res, next) {
  var items = await Product.find({ name: ""})
  for (var i=0; i<items.length; i++) {
    var item = await getItem2(items[i].url,"")
    console.log(item)
    if (item.name != "") {
      var foundItem = await Product.find({ sku: item.sku })
      //console.log(foundItem)
      if (foundItem.length == 0) {
        console.log("create new")
        var result = await Product.create(item, function (err, post) {});
        //console.log(result)
      } else {
        console.log("-----------> found duplication")
        console.log(item.name, item.sku, foundItem[0].name, foundItem[0].sku)
        //foundItem.category = item.category
        //var result = await Product.updateOne(foundItem.Id, foundItem, function (err, post) {});
        //console.log(result)
      }

      await Product.deleteOne({ _id: items[i]._id })
    }
  }
});

router.get('/delete', async function(req, res, next) {
  await Product.deleteMany({})
  return res.redirect('/');
})

router.get('/stop', async function(req, res, next) {
  global.stopCrawling = true
  return res.redirect('/');
})

router.post('/crawl_url', async function(req, res, next) {
  if (global.crawling) {
    return res.send(200)
  } else {
    global.crawling = true
  }
  targetUrl = req.body.url
  var urlObject = url.parse(targetUrl, true);
  var category = urlObject.query.categories

  try {
    for (var j=1; j<100; j++) {
      if (global.stopCrawling) {
        global.crawling = false
        global.stopCrawling = false
        return;
      }
      delete urlObject.search
      targetUrl = url.format(urlObject)
      var result = await getItems(targetUrl, category)
      console.log("THIS")

      urlObject = url.parse(targetUrl, true);
      urlObject.query.page = j
      category = urlObject.query.categories
      if (!result) break;
    }
  }catch(err) {
    console.log(err)
  }
  global.crawling = false 
})

router.get('/crawl', async function(req, res, next) {
  if (global.crawling) {
    return res.send(200)
  } else {
    global.crawling = true
  }
  const urls = ["https://www.kingpower.com/category/beauty/skincare?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/skincare/facial?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/skincare/body?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/makeup?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/makeup/face?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/makeup/eyes?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/makeup/lips?availability=dutyfree",
                "https://www.kingpower.com/category/beauty/perfumes?availability=dutyfree",
                "https://www.kingpower.com/collection/travel-exclusive?availability=dutyfree"]
  const categories = ["Skincare", "Facial", "Body", 
      "Makeup", "Face", "Eyes", "Lips", "Perfumes", "Travel Exclusive"]
  for (var i=0; i<urls.length; i++) {
    for (var j=0; j<100; j++) {
      if (global.stopCrawling) {
        global.crawling = false
        global.stopCrawling = false
        return;
      }
      var url = urls[i] + '&page=' + j
      var result = await getItems(url, categories[i])
      if (!result) break;
    }
  }
  global.crawling = false
});

router.get('/export', async function(req, res, next) {
  //url = 'https://www.kingpower.com/category/home-and-living?lang=en&page=1'
  const Json2csvParser = require('json2csv').Parser;
  const fields = ['sku', 'name', 'description', 'category','price', 'image', 'url'];

  const products = await Product.find()
  console.log(products)
 
  const json2csvParser = new Json2csvParser({ fields, encoding: 'utf-8' });
  const csv = json2csvParser.parse(products);
  res.setHeader('Content-Type', 'text/csv;charset=utf-8');
  res.setHeader("Content-Disposition", 'attachment; filename=kingpower.csv');
  res.send(csv);  
});

module.exports = router;
