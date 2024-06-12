import dotenv from 'dotenv'
import mongoose from "mongoose"
import express from 'express'
import productRouter from "./Routes/Product.route.js"
import cors from 'cors'
import adminRouter from "./Routes/Admin.route.js"
import categoryRoute from "./Routes/Category.route.js";
import settingsRoute from './Routes/Secret.route.js'
import ordersRoute from "./Routes/Orders.route.js";
import sliderRoute from "./Routes/Slider.route.js";

dotenv.config()
mongoose.connect
('mongodb+srv://asdfqqqwsf12311:A5LUowYIK01Bz5Hi@cluster0.4euabaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB ok'))
    .catch((e) => console.log('DB err', e))

const router = express()
router.use(cors())
router.use(express.json())

router.listen(4000, () => {
    console.log('Server OK')
})
router.use('/internal', productRouter)
router.use('/internal', adminRouter)
router.use('/internal', categoryRoute)
router.use('/internal', settingsRoute)
router.use('/internal', ordersRoute)
router.use('/internal', sliderRoute)
router.get('/internal/uploads', (req, res) => {
    res.json('zopa')
})
// router.use('/internal/uploads', express.static('internal/uploads'));
