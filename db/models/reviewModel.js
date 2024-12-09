import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: 'A nota deve ser um número inteiro entre 1 e 5.',
        },
    },
    comment: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default model('Review', reviewSchema);