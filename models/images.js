var mongoose= require('mongoose');


var ImageSchema =  new mongoose.Schema({
fieldname:{
   type:String,
   
},
originalname:{
    type:String,
    
 },
 encoding:{
    type:String,
    
 },
 mimetype:{
    type:String,
    
 },
 destination:{
    type:String,
    
 },
 filename:{
    type:String,
    
 },
 path:{
    type:String,
    
 },
 size:{
    type:String,
    
 }
});
var Image = module.exports= mongoose.model('Image',ImageSchema);

module.exports.saveImage = function(newImage,callback) {
        newImage.save(callback);
}

module.exports.findImage = function(filename,callback){
    var query = {filename:filename}
    Image.findOne(query,callback);
}






