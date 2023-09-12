const { Products, MySchema } = require("../schema/SchemaMongoose.js");
const fs = require("fs");
const { Schema } = require("mongoose");
const path = require("path");

const home = (req, res) => {
  res.send("hello mongoose");
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const insertProduct = async (req, res) => {
  if (req.file) {
    MySchema.add({ image: "string" });
    const imgName = req.file.originalname;
    req.body.image = imgName;
    const target = path.join(__dirname, "../uploadsMongoose", imgName);
    fs.renameSync(req.file.path, target);
  }
  try {
    const products = await Products.create(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const products = await Products.findById(req.params.id);
  if (products.get("image")) {
    fs.unlinkSync(`./uploadsMongoose/${products.get("image")}`);
  }
  try {
    const deletedProduct = await Products.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  const products = await Products.findById(req.params.id);
  if (products.get("image")) {
    const imgName = req.file.originalname;
    req.body.image = imgName;
    const target = path.join(__dirname, "../uploadsMongoose", imgName);
    fs.renameSync(`./uploadsMongoose/${products.get("image")}`, target);
    fs.unlinkSync(req.file.path);
  }

  try {
    const updatedProduct = await Products.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  home,
  getProducts,
  getProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
};
