const mongoose = require("mongoose");
const { Schema } = mongoose;

const MySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  stock: Number,
  status: Boolean,
});

const Products = mongoose.model("Products", MySchema);

module.exports = { Products, MySchema };
