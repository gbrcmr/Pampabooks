import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const orderItemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { _id: false });

const orderSchema = new Schema({
    email: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, default: 0 },
}, { timestamps: true });

const Order = model('Order', orderSchema);

export default Order;