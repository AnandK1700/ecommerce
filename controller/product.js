const { Products, Sequelize } = require('../models')

async function createProduct(req, res){
    const productData = req.body;

    if(!(productData.name && productData.cost && productData.quantity && productData.CategoryId)){
        res.status(400).send({msg : 'Name, cost & quantity is missing'})
    }

    try {
        const name = productData.name;
        const cost = productData.cost;
        const description = productData.description;
        const quantity = productData.quantity;
        const CategoryId = productData.CategoryId;

        const result = await Products.create({name, cost, description, quantity, CategoryId});
        res.send({msg: 'Product got created', result})
    } catch (err) {
        res.status(500).send({msg: 'Internal server error', err})
    }
}


async function getAllProduct(req, res){
    try {
        const result = await Products.findAll()
        res.send(result)
    } catch (err) {
        res.status(500).send({msg: 'Internal server error', err})
    }
}


async function getProductOnId(req,res){

	const productId = req.params.id;
	try{
		const result = await Products.findOne({
			where : {
				id: productId
			}
		});
		res.send(result)
	}catch(err){
		res.status(500).send({msg: 'Internal server error',err})
	}
}


async function updateProduct(req, res){
    const productId = req.params.id;

    

    try {
        const result = await Products.findOne({
            where : {
                id : productId
            }
        })

        if(result){
            result.name = req.body.name;
            result.cost = req.body.cost;
            result.description = req.body.description;
            result.quantity = req.body.quantity;
            result.CategoryId = req.body.CategoryId;

            result.save()

            res.send({msg: 'Product got updated', updateProduct : result})
        } else{
            res.status(400).send({msg: 'product Id does not exist', err})
        }
    } catch (err) {
        res.status(500).send({msg: 'Internal server error', err})
    }
}


async function deleteProduct(req, res){
    productId = req.params.id;

    try {
        const result = await Products.destroy({
            where : {
                id : productId
            }
        })

        res.send({msg: 'product got deleted', result})
    } catch (err) {
        res.status(500).send({msg: 'Internal server error', err})
    }
}


async function filterBasedOnProduct(req, res){
    const CategoryId = req.query.CategoryId; // ?CategoryId=3
    const name = req.query.name; // ?name=
    const minCost = req.query.minCost; // ?minCost=350
    const maxCost = req.query.maxCost; //?maxCost=450

    if(CategoryId){
        const result = await Products.findAll({
            where: {
                CategoryId : CategoryId
            }
        })
        res.send(result)
    }

    if(name){
        const result = await Products.findAll({
            where: {
                name : name
            }
        })
        res.send(result)
    }

    if(minCost && maxCost){
        const result = await Products.findAll({
            where : {
				cost : {
					[Sequelize.Op.gte] : minCost,
					[Sequelize.Op.lte] : maxCost
				}
			}
        })
        res.send(result)
    } else if(minCost){
        const result = await Products.findAll({
            where : {
				cost : {
					[Sequelize.Op.gte] : minCost
				}
			}
        })
        res.send(result)
    } else if(maxCost){
        const result = await Products.findAll({
            where : {
				cost : {
					[Sequelize.Op.lte] : maxCost
				}
			}
        })
        res.send(result)

    } else{
        const result = await Products.findAll()
        res.send(result)
    }

}


module.exports = {
    createProduct,
    getAllProduct,
    getProductOnId,
    updateProduct,
    deleteProduct,
    filterBasedOnProduct
}