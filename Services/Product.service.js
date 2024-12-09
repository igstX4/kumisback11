import ProductModal from "../Models/Product.schema.js";

export const createProduct = async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            price: req.body.price,
            oldPrice: req.body.oldPrice || null,
            inStock: req.body.inStock !== undefined ? req.body.inStock : true,
            category: req.body.category,
            article: req.body.article,
            image: req.file.filename,
            video: req.body.video || ''
        };

        // Добавляем поля в зависимости от категории
        if (['Супер салюты', 'Средние салюты', 'Малые салюты', 'Рим свечи'].includes(req.body.category)) {
            productData.caliber = req.body.caliber;
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(req.body.category)) {
            productData.packQuantity = req.body.packQuantity;
        }

        if (req.body.category === 'Фонтаны') {
            productData.height = req.body.height;
        }

        if (req.body.category === 'Бенгальские огни') {
            productData.length = req.body.length;
            productData.duration = req.body.duration;
        }

        const doc = new ProductModal(productData);
        const product = await doc.save();
        res.json(product);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось создать продукт',
        });
    }
}

export const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name, price, oldPrice, category, article, shots, 
            caliber, duration, packQuantity, height, 
            length, video, inStock
        } = req.body;

        const updateData = {
            name,
            price,
            category,
            article,
            oldPrice: oldPrice || null,
            inStock: inStock !== undefined ? inStock : true,
            video: video || ''
        };

        // Если загружено новое изображение
        if (req.file) {
            updateData.image = req.file.filename;
        }

        // Добавляем поля в зависимости от категории
        if (['Супер салюты', 'Средние салюты', 'Малые салюты', 'Рим свечи'].includes(category)) {
            updateData.caliber = caliber;
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(category)) {
            updateData.packQuantity = packQuantity;
        }

        if (category === 'Фонтаны') {
            updateData.height = height;
        }

        if (category === 'Бенгальские огни') {
            updateData.length = length;
            updateData.duration = duration;
        }

        const updatedProduct = await ProductModal.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Не удалось обновить продукт' });
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
