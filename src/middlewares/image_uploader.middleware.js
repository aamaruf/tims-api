import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

function imgStore() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../../uploads`));
      },
      filename: (req, file, cb) => {
        cb(
          null,
          Date.now() + '-' + file.originalname
        );
      },
    });
};
  

export function imgUpload() {
    return multer({
      storage: imgStore(),
      fileFilter: (req, file, cb) => {
        const type = /jpg|png|jpeg/i;
        const mimetype = type.test(file.mimetype);
  
        if (mimetype) {
          cb(null, true);
        } else {
          cb(new Error("only png, jpg, jpeg will work"));
        }
      },
    });
  };
  