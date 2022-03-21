const express = require("express");
const bodyParser = require("body-parser");
var getRawBody = require('raw-body');
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    if (req.headers['content-type'] === 'application/octet-stream') {
        getRawBody(req, { length: req.headers['content-length'], encoding: req.charset}, function (err, string) {
            if (err) {
                return next(err);
            }
            req.body = string;
            console.log(string);
            res.attachment('testing.txt');
            res.type('txt');
            res.send(string);
         })
    }
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});


// readSrt('/Users/mzorrilla/Downloads/Pro Call 195 (video_morning) - Getting to 100K __ 2022-02-02 [English].srt', (text) => {
//     const initial = text.replace(/(^[0-9]+)\n([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3} --> [0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}\n)/gm, '');
//     const firstName = initial.match(/([a-zA-Z]+\s?([a-zA-Z])+)?:\s?/g);
//     const lines = initial.split('\n\n');
    
//     var cache = firstName[0];
    
//     for (var i = 0; i < lines.length; i++) {
//         const name = lines[i].match(/([a-zA-Z]+\s?([a-zA-Z])+)?:\s?/gm);
//         var newCache = '';
//         if (name != null && name.length > 0) {
//             newCache = name[0];
//         }
    
//         if (cache != newCache) {
//             cache = newCache;
//         } else {
//             if (i > 0) {
//                 lines[i] = lines[i].replace(cache, '');
//             }
//         }
//     }
    
//     const result = lines.join('\n\n');
//     console.log(result);
// });

function readSrt(fileName, callback) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
          return callback(err);
        }
        return callback(data);
      });
}