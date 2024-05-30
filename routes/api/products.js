const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, removeProduct, getProduct }=require('../../controllers/productsController')
const verifyJWT = require('../../middlewares/verifyJWT')
router.route('/')
    .get(verifyJWT,getAllProducts)
    .post(createProduct)
    .put(updateProduct)
    .delete(removeProduct)

router.route('/:id')
    .get(getProduct)



module.exports = router;
