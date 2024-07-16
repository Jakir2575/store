const Product = require("../models/Product")
const path = require("path")
const multer = require("multer")
const { response } = require("express")


///// multer configuration

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")   //// save upload file to the upload folder
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+ path.extname(file.originalname))   ///// append timestamp to the file name to make it unique
    },
}) 

const upload = multer({storage: storage})

//////////

///// getAllProducts

const getAllProducts = async(req, res) => {
    try {
     const products = await Product.find()
     res.json(products)   
    } catch (error) {
        console.log(error);
    }
}

///// getProductsById

const getProductsById = async(req, res) => {
    try {
       const product = await Product.findById(req.params.id)
       if(!product){
        return res.status(404).json({message: "product not found"})
       } 
       res.json(product)
    } catch (error) {
       console.log(error); 
    }
}

///// addProduct

// const addProduct = async(req, res) => {
//     const {name, price, category, description} = req.body;
//     const image = req.file.path;
//     try {
//        const newProduct = new Product({name, price, category, description, image})
//        await newProduct.save()
//        res.json(newProduct);
//     } catch (error) {
//         console.log(error);
//     }

// }

const addProduct = async (req, res) => {
    const { name, price, category, description } = req.body;
    const image = req.file.path;

    // Validation
    if (!name || !price || !category || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProduct = new Product({ name, price, category, description, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


///// get method categorywise 

const getProductByCategory = async(req, res) => {
    const {category} = req.params
    try {
      const products = await Product.find({category})
      res.json(products) 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllProducts, upload, getProductsById, addProduct, getProductByCategory} 