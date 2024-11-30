import DiscountsSchema from "../Models/Discounts.schema.js"

export const createDiscount = async (req, res) => {
    try {
        const {title, description} = req.body
        
        console.log('Полученные данные:', {
            body: req.body,
            file: req.file,
            headers: req.headers
        })
        
        const doc = new DiscountsSchema({
            title,
            description,
            img: req.file ? req.file.filename : ''
        })

        console.log('Создаваемый документ:', doc)

        const discount = await doc.save()

        console.log('Сохраненный документ:', discount)

        return res.status(200).json(discount)
    } catch (e) {
        console.log('Ошибка:', e)
        res.status(500).json({ message: "Не удалось создать скидку" })
    }
}

export const getDiscount = async (req, res) => {
    try {
        const {id} = req.params
        const discount = await DiscountsSchema.findById(id)
        
        if (!discount) {
            return res.status(404).json({ message: "Скидка не найдена" })
        }
        
        res.json(discount)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Не удалось получить скидку" })
    }
}

export const updateDiscount = async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body

        const updateData = {
            title,
            description
        }

        if (req.file) {
            updateData.img = req.file.filename
        }

        const updatedDiscount = await DiscountsSchema.findByIdAndUpdate(
            id,
            updateData,
            {new: true}
        )

        if (!updatedDiscount) {
            return res.status(404).json({ message: "Скидка не найдена" })
        }

        return res.json(updatedDiscount)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Не удалось обновить скидку" })
    }
}

export const deleteDiscount = async (req, res) => {
    try {
        const {id} = req.params

        const deletedDiscount = await DiscountsSchema.findByIdAndDelete(id)
        
        if (!deletedDiscount) {
            return res.status(404).json({ message: "Скидка не найдена" })
        }

        return res.json({ message: "Скидка успешно удалена" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Не удалось удалить скидку" })
    }
}

export const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await DiscountsSchema.find()
        return res.json(discounts)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Не удалось получить список скидок" })
    }
}
