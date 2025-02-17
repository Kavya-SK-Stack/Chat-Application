import multer from "multer";
// import path from "path";
// import fs from "fs";

// Ensure uploads directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Storage configuration: Saves files to `uploads/` folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // Store files in "uploads" directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
//   },
// });

// // File filter: Allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images (JPEG, PNG, GIF) are allowed"), false);
//   }
// };

// Multer upload configuration
const multerUpload = multer({
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// Middlewares for different upload types
const singleAvatar = multerUpload.single("avatar"); // For single avatar upload
const attachmentsMulter = multerUpload.array("files", 5); // For multiple file uploads

export { singleAvatar, attachmentsMulter };
