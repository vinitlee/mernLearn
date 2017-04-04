var path = require('path');

var express = require('express');
var app = express();

// app.get('/', (req,res) => {
//   res.send('Hello World!')
// });

app.use(express.static(path.join(__dirname,'static')));

app.listen(3000, () => console.log("Listening on 3000"));
