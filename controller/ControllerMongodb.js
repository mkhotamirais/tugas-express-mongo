const { ObjectId } = require("mongodb");
const db = require("../config/ConfigMongodb");
const fs = require("fs");
const path = require("path");

const home = (req, res) => {
  res.send("hello mongodb");
};

const getProducts = (req, res) => {
  db.collection("products")
    .find()
    .toArray()
    .then((response) => res.send(response))
    .catch((error) => res.send(error.message));
};

const getProductById = (req, res) => {
  db.collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((response) => res.send(response))
    .catch((error) => res.send(error.message));
};

const insertProduct = (req, res) => {
  if (req.file) {
    const imgName = req.file.originalname;
    req.body.image = imgName;
    const target = path.join(__dirname, "../uploadsMongodb", imgName);
    fs.renameSync(req.file.path, target);
  }
  db.collection("products")
    .insertOne(req.body)
    .then((response) => res.send(response))
    .catch((error) => res.send(error.message));
};

const deleteProduct = (req, res) => {
  db.collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((product) => {
      fs.unlinkSync(`./uploadsMongodb/${product.image}`);
    });

  db.collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((response) => res.send(response))
    .catch((error) => res.send(error.message));
};
const updateProduct = (req, res) => {
  db.collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((product) => {
      const imgName = req.file.originalname;
      req.body.image = imgName;
      const target = path.join(__dirname, "../uploadsMongodb", imgName);
      fs.renameSync(`./uploadsMongodb/${product.image}`, target);
      fs.unlinkSync(req.file.path);
    });
  db.collection("products")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then((response) => res.send(response))
    .catch((error) => res.send(error.message));
};

module.exports = {
  home,
  getProducts,
  getProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
};
