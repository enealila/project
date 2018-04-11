const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
 
// default options
 app.use(fileUpload());
 app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/project/images/img1.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.post('/upload', function(req, res) {
    // Uploaded files:
    console.log(req.files.my_profile_pic.name);
    console.log(req.files.my_pet.name);
    console.log(req.files.my_cover_photo.name);
  });

  app.get('/index', function(req,res){
res.render('index.ejs');
  });

app.listen(3000,function(){
    console.log("server is on port 3000");
});