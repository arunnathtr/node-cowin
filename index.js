const { spawn } = require('child_process');
const axios = require('axios');

function intervalFunc() {
const timeElapsed = Date.now();
const today = new Date(Date.now());
var currentDate = 'dd-mm-yyyy';

currentDate = currentDate.replace('mm', ('00'+ (today.getMonth() + 1)).slice(-2))
    .replace('yyyy', ('0000'+today.getFullYear()).slice(-4))
    .replace('dd', ('00'+ (today.getDate() + 1)).slice(-2)); 

//var  originalurl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=<district_id>&date=<date>&vaccine=COVISHIELD';
var  originalurl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=<district_id>&date=<date>';
originalurl = originalurl.replace('<date>', currentDate);

 
var urls = [originalurl.replace('<district_id>', 301),
            originalurl.replace('<district_id>', 303),
            originalurl.replace('<district_id>', 307)];
urls.forEach(url => {
    //console.log(url);
});



var datetime = new Date();
console.log("Trying " + datetime.toISOString());

var userAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36";

urls.forEach(url => {
    axios.get(url, { headers: { 'User-Agent': userAgent }}) 
      .then(response => {
        var found = false;
        response.data.centers.forEach(center => {
            center.sessions.forEach(session => {
                if (session.available_capacity > 0) {
                    console.log(center.district_name, "-", center.name, "-", session.available_capacity);
                    
					found = true;
                    }
            });
          
        });

        if (found) {
              console.log("Found");
              spawn('cmdmp3win', ['alarm2.mp3']);
          }
      })
      .catch(error => {
        console.log("Error found");
        console.log(error.response.status, error.response.statusText, error.response.config.url);
      });
    });
}

setImmediate(intervalFunc);
setInterval(intervalFunc, 20000);

