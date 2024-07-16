const express = require("express")
const {getAllProducts, getProductsById, addProduct, upload, getProductByCategory} = require("../controllers/Product")
const router = express.Router()

router.get("/", getAllProducts)
router.get("/:id", getProductsById)
router.post("/", upload.single("image"), addProduct)
router.get("/category/:category", getProductByCategory)


module.exports = router