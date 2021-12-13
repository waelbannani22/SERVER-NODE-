const multer = require('multer')
 
 
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname);
    }
  })
   
  var upload = multer({ storage: storage })
  module.exports = upload;