var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs'); 
//var csv = require('csv');
var scrape2csv = require('scrape2csv');
var path = require('path');

// file permision = code tag THATS IT!
// url = 
// file type = 

var scrape_url = "http://substack.net/images/";
var jquery_selector = "tr";

var header = ["Permission", "Absolute URL", "File Type"];

var handler = function($, elem, index) {
  var perm = $(elem).find('td').first().find('code').text();

  var abs_url = $(elem).find('a').attr('href');
  var extname = path.extname(abs_url);
  return [perm, abs_url, extname];
};

scrape2csv.scrape("./scraper_results.csv", scrape_url, jquery_selector, handler, header);



////////////////////////////
request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    $('tr').each(function(i, element){
      var a = $(this).find('td').first().find('code').text();
      var b = $(this).find('a').attr('href');
      var d = path.extname(b)
      if (d != '') {
        var c = d
      } else { var c = 'Folder'}
      //var c = path.extname(b);
      var row = [a, b, c] + '\n';
      fs.writeFile('./scraper_results_fs.csv', row, {encoding: 'utf8', flag: "a"}, function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } else{
          console.log('It\'s saved!');
        }
      });
    });

  }
})








