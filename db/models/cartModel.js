import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema({
    email: { type: String, required: true },
    items: [cartItemSchema],
}, { timestamps: true });


cartSchema.virtual('totalValue').get(function () {
    if (!this.items || this.items.length === 0) return 0;

    return this.items.reduce((total, item) => {

        if (item.book && item.book.price) {
            return total + item.quantity * item.book.price;
        }
        return total;
    }, 0);
});

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;