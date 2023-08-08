import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items',
            required: true,
        },
        quantity: { 
            type: Number,
            required: true,
        }
    }],
    netPrice: {
        type: Number,
        required: true,
    },
    grossPrice: {
        type: Number,
        required: true,
    },
    vatValue: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "shipped"],
        required: true,
    },
    order_date: {
        type: String,
        format: Date,
        required: true,
        default: Date.now,
    }
});
const Order = mongoose.model('order', orderSchema);
export default Order;