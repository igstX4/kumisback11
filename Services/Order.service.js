import OrderSchema from "../Models/Order.schema.js";

export const createOrder = async (req, res) => {
    try {
        const {name, email, phoneNumber, address, note, product, count} = req.body

        const doc = new OrderSchema({
            name,
            email,
            phoneNumber,
            address,
            note,
            image: req.file.filename,
            product,
            count,
            status: "NEW",
        })

        const order = await doc.save()

        return res.status(200).json(order)
    } catch (e) {
        console.log(e)
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
        const orders = await OrderSchema.find().populate('product')

        return res.json(orders)
    } catch (e) {
        console.log(e)
    }
}