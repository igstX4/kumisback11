import * as ProductService from '../Services/Product.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'
import multer from 'multer'
import path from 'path'

const productRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'internal/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage, limits: { fileSize: undefined }})

productRouter.post('/createProduct', checkAuth, upload.single('image'), ProductService.createProduct)
productRouter.put('/editProduct/:id', checkAuth, upload.single('image'), ProductService.editProduct)
productRouter.delete('/productDelete/:id', checkAuth, ProductService.deleteProduct)
productRouter.get('/getAllProducts', ProductService.getAllProducts)
productRouter.get('/productById/:id', ProductService.getProductById)
productRouter.get('/productByName/:productName', ProductService.getProductByName)
productRouter.get('/getAllProducts/:category', ProductService.getProductsByCategory)


export default productRouter