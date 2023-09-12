const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploadsMongodb" });
const {
  home,
  insertProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controller/ControllerMongodb.js");

router.get("/", home);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", upload.single("image"), insertProduct);
router.delete("/products/:id", deleteProduct);
router.patch("/products/:id", upload.single("image"), updateProduct);

module.exports = router;
