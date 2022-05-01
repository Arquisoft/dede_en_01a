import { Request, Response, Router } from "express"
import { renameSync } from "fs"
import multer from 'multer'
import path from "path"
import { checkJWT } from "../middleware/checkJWT"
import { checkRole } from "../middleware/checkRole"

const FileRouter = Router()
const dir = 'public/images/'

const upload = multer({
	dest: dir, 
	fileFilter: (req, file, cb) => {
		console.log(file)
	if (['image/jpg', 'image/jpeg'].includes(file.mimetype)) {
		cb (null, true)
	} else {
		cb (null, false)
	}},
	limits: {
		fileSize: 8000000 // Sensitive: 10MB is more than the recommended limit of 8MB
	}
})


FileRouter.post('/upload', [checkJWT, checkRole(["SELLER", "ADMIN"]), upload.single('image')], (req: Request, res: Response) => {
	if (req.file != null) {
		const reqPath = dir + req.body.name; // user-controlled path
  		const resolvedPath = path.resolve(reqPath); // resolve will resolve "../"
		if (resolvedPath.startsWith('public/')) {
			const fileName = dir + req.body.name + '.jpg'
			renameSync(req.file.path, fileName)
		}
	}
})


export default FileRouter