import multer from 'multer';

export const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/src/my-images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});
