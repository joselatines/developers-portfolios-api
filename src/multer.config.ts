import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },

  filename: (req, file, cb) => {
    const fileName =
			file.fieldname + '_' + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
	
});
