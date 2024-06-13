import ProductModal from "../Models/Product.schema.js";

export const createProduct = async (req, res) => {
    const {name, price, priceKiosk, video, category, options, totalCount} = req.body

    try {
        const doc = new ProductModal({
            name,
            price,
            priceKiosk,
            video,
            image: req.file.filename,
            options: JSON.parse(options),
            category,
            totalCount
        })

        const product = await doc.save()
        res.json('hello')
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать продукт',
        });
    }
}

export const editProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, priceKiosk, video, options, category,totalCount} = req.body
    try {
        const product = await ProductModal.findByIdAndUpdate(id, {
            name, price, priceKiosk, video, totalCount, options: JSON.parse(options), category, image: req.file.filename,
        }, {new: true});

        if (!product) {
            return res.status(404).json({message: "Продукт не найден"});
        }

        res.json(product);

    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Не удалось обновить продукт"});
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const doc = await ProductModal.findByIdAndDelete(id);
        if (!doc) {
            return res.status(404).json({
                message: 'Продукт не найдено',
            });
        }
        res.json({success: true});
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось удалить продукт"
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModal.find({})
        res.json(products)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await ProductModal.findById(id)
        res.json(product)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
}

export const getProductByName = async (req, res) => {
    const name = req.params.productName
    try {
        const product = await ProductModal.findOne({name})
        res.json(product)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
}

export const getProductsByCategory = async (req, res) => {
    const {category} = req.params
    try {
        const product = await ProductModal.find({category})
        res.json(product)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
}
