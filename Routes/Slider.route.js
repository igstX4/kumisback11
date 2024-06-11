import * as Slider from '../Services/Slider.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'
import multer from "multer";
import path from "path";

const sliderRoute = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'internal/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage, limits: { fileSize: undefined }})

sliderRoute.post('/addItemSlider', checkAuth, upload.single('image'), Slider.AddItemToSlider)
sliderRoute.put('/editItemSlider', checkAuth, upload.single('image'), Slider.EditItemSlider)
sliderRoute.get('/getItemSlider', upload.single('image'), Slider.getItem)


export default sliderRoute