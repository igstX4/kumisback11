import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: false,
        default: null
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Супер салюты', 'Средние салюты', 'Малые салюты', 'Петарды', 
               'Фонтаны', 'Рим свечи', 'Ракеты', 'Бенгальские огни', 'Хлопушки']
    },
    article: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: false,
        default: ''
    },
    // Поля для фейерверков
    shots: {
        type: Number,
        required: function() {
            return ['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(this.category);
        }
    },
    caliber: {
        type: String,
        required: function() {
            return ['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(this.category);
        }
    },
    duration: {
        type: String,
        required: function() {
            return ['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(this.category);
        }
    },
    // Поля для петард и римских свечей
    packQuantity: {
        type: Number,
        required: function() {
            return ['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(this.category);
        }
    },
    effect: {
        type: String,
        required: function() {
            return ['Петарды', 'Рим свечи'].includes(this.category);
        }
    },
    // Поля для фонтанов
    height: {
        type: String,
        required: function() {
            return this.category === 'Фонтаны';
        }
    },
    // Поля для бенгальских огней
    length: {
        type: String,
        required: function() {
            return this.category === 'Бенгальские огни';
        }
    }
});

export default mongoose.model('Product', ProductSchema);