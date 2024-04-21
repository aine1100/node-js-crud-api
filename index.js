const express= require("express")
const mongoose=require("mongoose")
const app=express()
const Product=require("./models/product.model")
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/project-of-crud")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });


app.listen(3000,()=>{
    console.log("server is runnning on 3000")
})
app.get("/node",(req,res)=>{
res.send("hello from node api" )
})
app.get("/products",async(req,res)=>{
    try{
       const products= await Product.find({})
       res.status(200).json(products)


    }catch(error){
    res.status(500).json({message:error.message})
    }
    })
    
app.get("/products/:id",async(req,res)=>{
    try{
        const {id} =req.params
       const products= await Product.findById(id)
       res.status(200).json(products)


    }catch(error){
    res.status(500).json({message:error.message})
    }
    })
    


app.post("/products",async(req,res)=>{
try{
 const product= await Product.create(req.body)
 res.status(200).json(product)
}
catch(error){
    res.status(500).json({message:error.message})
}
})
//update
app.put("/update/:id",async(req,res)=>{
    try{
        const {id}= req.params
        const products= await Product.findByIdAndUpdate(id ,req.body)
        if(!products){
            res.status(404).json({message:"product is not found"})
        }
        const productsUpdated= await Product.findById(id)
        res.status(200).json(productsUpdated)
 


    }
    catch{
        res.status(500).json({message:error.message})
    }
})
//delete a product
app.delete("/delete/:id",async(req,res)=>{
    const {id}= req.params
        const products= await Product.findByIdAndDelete(id ,req.body)
        if(!products){
            res.status(404).json({message:"product is not found"})
        }
        const productsUpdated= await Product.findById(id)
        res.status(200).json({message:"product is  found"}) 
 

})