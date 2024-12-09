import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order', // Referência para o modelo de pedidos
        },
    ],
});

export default model('User', userSchema);