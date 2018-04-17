//set storage engine
const multer =  require('multer');
const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename: function(req,file,callback){
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

//init upload

const upload = multer({
    storage:storage
}).single('myphoto');

module.exports = upload();
// array['myphoto','myphoto1','myphoto2'];