import mongoose from "mongoose";
//import User from "./User";


const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true
    }

});
const Items = mongoose.model('items', itemsSchema);
export default Items;