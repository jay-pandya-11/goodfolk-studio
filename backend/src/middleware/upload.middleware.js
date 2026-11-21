const multer = require('multer');
const path = require('path');

// ----- Multer disk storage configuration -----
const storage = multer.diskStorage({
  // Set destination directory for uploads
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // Generate unique filename: fieldname-timestamp.ext
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// ----- File filter: Allow only image files -----
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'), false);
  }
};

// ----- Max file size: Use env variable or default to 5MB -----
const maxFileSize = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024;

// ----- Multer instance -----
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFileSize },
});

// ----- Export single file upload (field: 'image') -----
const uploadSingle = upload.single('image');

// ----- Export multiple file upload (field: 'images', max 10) -----
const uploadMultiple = upload.array('images', 10);

module.exports = { uploadSingle, uploadMultiple };
