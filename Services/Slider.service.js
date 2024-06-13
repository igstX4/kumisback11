import SliderSchema from "../Models/Slider.schema.js";

function generateId() {
    const date = new Date();
    const timestamp = date.getTime();
    const randomPart = Math.floor(Math.random() * 1000000);
    return `${timestamp}${randomPart}`;
}

export const AddItemToSlider = async (req, res) => {
    const {category} = req.body
    const doc = await SliderSchema.findById("66601db31d57ef59c79a60e2")

    if (!doc) {
        return res.status(400).json("not found")
    }
    const id = generateId()
    doc.items.push({
        id,
        img: req.file.filename,
        category
    })
    const saved = await doc.save()

    res.json(saved)
}

export const EditItemSlider = async (req, res) => {
    const {id, category} = req.body
    const doc = await SliderSchema.findById("66601db31d57ef59c79a60e2")

    if (!doc) {
        return res.status(400).json("not found")
    }

    const item = await doc.items.find(item => item.id === id)

    if (category) {
        item.category = category
    }
    if (req.file.filename) {
        item.img = req.file.filename
    }
    doc.markModified('items');

    const saved = await doc.save()
    res.json(saved)
}

export const getItem = async (req, res) => {
    const doc = await SliderSchema.findOne({_id: "66601db31d57ef59c79a60e2"})
    res.json(doc)
}
export const deleteItem = async (req, res) => {
    const {id} = req.params
    const slides = await SliderSchema.find()
    slides[0].items = slides[0].items.filter((item) => item.id !== id)
    await slides[0].save()
    res.status(200).json('nice')
}