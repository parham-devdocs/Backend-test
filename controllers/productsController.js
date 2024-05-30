const { Products } = require('../model/schemas');

///// create prouduct middleware
const createProduct = (req, res) => {
  const {product_name,description,price }=req.body
     const newProduct = new Products({
       product_name: product_name,
       description: description,
       price: price,
       
    
     });
  newProduct.save(req.body).then(() => {
    res.send('saved')
  }).catch((e)=>{console.log(e);})
  
}
///// update product middleware
const updateProduct = (req, res) => {
  const {product_name}=req.body
Products.findByIdAndUpdate({product_name},{$set:req.body}).then(e=>res.send(e)).catch(e=>res.send('not updated'))
}

///// remove product middleware
const removeProduct = (req, res) => {
  const {product_name}=req.body
  Products.deleteOne({ product_name }).then(() => res.status(201)
    .send('deleted'))
    .catch(e => res.status(501).send(e))
}
///// get all the prosucts
const getAllProducts = (req,res) => {
  Products.find({})
    .then((e) => res.status(201).send(e))
  .catch(e=>res.status(501).send('data not sent'))
}
///// get a single product
const getProduct = (req, res) => {
  const {id}=req.params
    Products.find({_id:id})
    .then((e) => res.status(201).send(e))
  .catch(e=>res.status(501).send('data not sent'))
}


module.exports={createProduct,updateProduct ,removeProduct ,getAllProducts,getProduct}