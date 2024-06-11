import CategorySchema from "../Models/Category.schema.js";
import ProductModal from "../Models/Product.schema.js";

export const createCategory = async (req, res) => {
    const {category} = req.body
    try {
        const doc = new CategorySchema({
            category
        })
        const product = await doc.save()
        res.json(product)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать категорию',
        });
    }
}

export const editCategory = async (req, res) => {
    const { id } = req.params;
    const {category} = req.body
    try {
        const categoryDoc = await CategorySchema.findById(id)

        await ProductModal.updateMany({category: categoryDoc.category}, {$set: {category: req.body.category}});
        categoryDoc.category = category
        categoryDoc.save()

        if (!categoryDoc) {
            return res.status(404).json({ message: "Категория не найден" });
        }
      

        res.json(categoryDoc);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Не удалось обновить категорию" });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const categoryDoc = await CategorySchema.findById(id)
        
        
        if (!categoryDoc) {
            return res.status(404).json({
                message: 'Категорию не найдено',
            });
        }
        await CategorySchema.findByIdAndDelete(id);
        await ProductModal.deleteMany({category: categoryDoc.category})
        res.json({ success: true });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось удалить категорию"
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const categories = await CategorySchema.find({})
        res.json(categories)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить категории',
        });
    }
}