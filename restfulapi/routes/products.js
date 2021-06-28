const express = require("express");
const mongoose = require("mongoose");
const validateProduct = require("../middlewares/validateProduct");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const router = express.Router();
var {Product} = require("../models/product");



//get all products
router.get("/", auth ,admin ,async(req,res) =>{
    
    
    console.log(req.user);

    
        let page = Number(req.query.page ? req.query.page : 1);
        let perPage = Number(req.query.perPage ? req.query.perPage : 10);
        let skipRecords = perPage * (page - 1);
        let products = await Product.find().skip(skipRecords).limit(perPage);
        return res.send(products); 
    
});

//get Single products
router.get("/:id", async(req,res) =>{
   try {
    let product = await Product.findById(req.params.id);
    if(!product) return res.status(400).send("Product with given ID is not present");
    return res.send(product);

    } catch(err) {
        return res.status(400).send("Invalid ID");
    }    
});

//Update the Record
 router.put("/:id", validateProduct , async (req,res) => {
     try{
         
        let product = await Product.findByIdAndUpdate(req.params.id);
        product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.picture = req.body.picture;
     
        await product.save();
        return res.send(product);
     }catch(e)
     {
         res.send(e);
     }
 
});

//Delete the Record
router.delete("/:id",  auth, admin , async (req,res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

//Insert Record
router.post("/",auth , validateProduct, async (req,res) => {
    try{
      
     let product = new Product();
     product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.picture = req.body.picture;

        await product.save();
        res.send(product);
    }catch(e){
        res.send(e);
    }

});

module.exports = router;
