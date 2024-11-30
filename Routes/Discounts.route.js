import * as DiscountsService from '../Services/Discounts.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'
import multer from "multer"
import path from "path"

const DiscountsRoute = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'internal/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage, limits: { fileSize: undefined }})

DiscountsRoute.post('/discount/create', checkAuth, upload.single('img'), DiscountsService.createDiscount)
DiscountsRoute.get('/discounts', DiscountsService.getAllDiscounts)
DiscountsRoute.get('/discount/:id', DiscountsService.getDiscount)
DiscountsRoute.put('/discount/:id', checkAuth, upload.single('img'), DiscountsService.updateDiscount)
DiscountsRoute.delete('/discount/:id', checkAuth, DiscountsService.deleteDiscount)

export default DiscountsRoute
