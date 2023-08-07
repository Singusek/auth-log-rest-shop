import mongoose from "mongoose";
// import User from "./User";
// import Items from "./Items";


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
            quantity: {
                type: Number,
                required: true,
            }
        }
    }],
    total: {
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
    }
});
const Order = mongoose.model('order', orderSchema);
export default Order;