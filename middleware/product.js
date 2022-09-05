const { Categories } = require('../models')

async function validateProductData(req, res, next){
    const productData = req.body;

    if(!productData.name){
        res.status(400).send({msg: 'Name is missing in product data'})
        return;
    }
    if(productData.CategoryId){

        const result = await Categories.findByPk(productData.CategoryId)

        if(result){
            next()
        } else{
            res.status(400).send({msg: 'Category Id does not exist in category data'})
        }
    } else{
        res.status(400).send({msg: 'Category Id is missing in product data'})
    }
}

module.exports = { validateProductData }