import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { upload } from "../../multer.config";

export const multerMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.info("multer middleware...");
	// TODO: add more images
	upload.single("images")(req, res, function (err) {

		if (err instanceof multer.MulterError) {
			return res.status(400).json({ message: "Multer Error", success: false });
		} else if (err) {
			console.error("error multer middleware");

			return res
				.status(500)
				.json({ message: "Internal Server Error", success: false, err });
		}
		next();
	});
};
