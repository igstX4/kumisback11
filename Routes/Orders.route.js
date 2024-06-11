import * as OrdersService from '../Services/Order.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'
import multer from "multer";
import path from "path";

const OrdersRoute = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'internal/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage, limits: { fileSize: undefined }})

OrdersRoute.post('/order/create', upload.single('image'), OrdersService.createOrder)
OrdersRoute.get('/orders', checkAuth, OrdersService.getAllOrders)
OrdersRoute.put('/order/:id', checkAuth, OrdersService.changeStatus)
OrdersRoute.delete('/order/:id', checkAuth, OrdersService.deleteOrder)


export default OrdersRoute