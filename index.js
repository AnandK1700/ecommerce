const {serverPort} = require('./config/server.config')
const express = require('express')
const { Categories, sequelize, Products, Role } = require('./models')
const { categoryRoutes, productRoutes, authRoutes, cartRoutes} = require('./routes')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))

//app.use(routes)
app.use(express.json())
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)


app.listen(serverPort, async () => {
    console.log('server is running on this port', serverPort)
    await init()
})

async function init(){
    try {
        await sequelize.sync({force:true})
        //await sequelize.authenticate()

         const defaultCategories = [
            {
                name: "Beauty",
                description: "All Beauty Products"
            },
            {
                name: "Fragnance",
                description: "All Fragnance Products"
            },
            {
                name: "Clothes",
                description: "All types of Clothes"
            }
        ]

        const defaultProducts = [
            {
                "description":"Nyka Best Products",
                "name" :"Makeup Kit",
                "cost": 870,
                "quantity": 20,
                "CategoryId": 1
            },
            {
                "description":"Best Fragnance ever",
                "name" :"Fogg Deodrant",
                "cost": 380,
                "quantity": 20,
                "CategoryId": 2
            },
            {
                "description":"Best for Summer holidays",
                "name" :"Summer Clothes",
                "cost": 1200,
                "quantity": 20,
                "CategoryId": 3
            }
        ]
        
        const defaultRoles = [
            {
                name: "User"
            },
            {
                name: "Admin"
            }
        ] 
        
        await Categories.bulkCreate(defaultCategories)
        await Products.bulkCreate(defaultProducts)
        await Role.bulkCreate(defaultRoles)  
        //console.log(result)
    } catch (err) {
        console.log(err)
    }
}