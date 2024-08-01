import OrderSchema from "../Models/Order.schema.js";

export const createOrder = async (req, res) => {
    try {
        const {name, phoneNumber, address, product, count, products} = req.body

        const doc = new OrderSchema({
            name,
            phoneNumber,
            address,
            product,
            count,
            status: "NEW",
            products
        })

        const order = await doc.save()

        return res.status(200).json(order)
    } catch (e) {
        console.log(e)
    }
}
export const getOrder = async (req, res) => {
    try {
        const {id} = req.params
        const order = await OrderSchema.findById(id)
        res.json(order)
    } catch (e) {
        res.status(404)
    }
}
export const changeStatus = async (req, res) => {
    try {
        const {id} = req.params
        const {newStatus} = req.body

        const order = await OrderSchema.findById(id)

        order.status = newStatus

        const newOrder = await order.save()

        return res.status(200).json(newOrder)
    } catch (e) {
        console.log(e)
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params

        await OrderSchema.findByIdAndDelete(id)

        return res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e)
    }
}
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find()

        return res.json(orders)
    } catch (e) {
        console.log(e)
    }
}