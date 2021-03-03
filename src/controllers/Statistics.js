const OrderDetails = require('../models/OrderDetails')
const Orders = require('../models/Orders')
const Products = require('../models/Products')
const Categories = require('../models/Categories')

function getStatistics() {
    return new Promise( async (resolve, reject) => {
        try {
            let allOrderDetails = await OrderDetails.find({}).lean().exec()
            let allOrders = await Orders.find({}).lean().exec()
            let allProducts = await Products.find({}).lean().exec()

            let bestSellingId = {}
            let bestSellingProductsId = []
            allOrderDetails.forEach(item => {
                item.products.forEach(product => {
                    if(bestSellingId[product.productId]) {
                        bestSellingId[product.productId] += product.qty
                    } else {
                        bestSellingId[product.productId] = product.qty
                        bestSellingProductsId.push(product.productId)
                    }
                })
            })

            let bestSellingProducts = await Products.find({_id: { $in:  bestSellingProductsId}}).lean().exec()

            let bestSelling = {}

            bestSellingProducts.forEach((product, id) => {
                bestSelling[product.name + ' (' + (id + 1) + ')'] = bestSellingId[product._id]
            })


            let productBestSelling = []

            for(let key in bestSelling) {
                productBestSelling.push({
                    x: key,
                    y: bestSelling[key]
                })
            }


            let categoryIds = {}
            let categoryIdsArr = []

            allProducts.forEach(product => {
                if(product.categoryId in categoryIds) {
                    categoryIds[product.categoryId] += 1
                } else {
                    categoryIds[product.categoryId] = 1
                    categoryIdsArr.push(product.categoryId)
                }
            })


            let productPerCategory = await Categories.find({_id: { $in: categoryIdsArr }}).lean().exec()

            let mostProductsCategory = {}

            productPerCategory.forEach((category, id) => {
                mostProductsCategory[category.name] = categoryIds[category._id]
            })

            let productCategory = []
            
            for(let key in mostProductsCategory) {
                productCategory.push({
                    x: key,
                    y: mostProductsCategory[key]
                })
            }
            
            let mostProfitableWeekday = {}
            allOrders.forEach(order => {
                let day = getDayName(order.orderPlaced)
                
                if(mostProfitableWeekday[day]) {
                    mostProfitableWeekday[day] += order.orderTotal
                } else {
                    mostProfitableWeekday[day] = order.orderTotal
                }
            })
            
            let profitableDays = []
            for(let key in mostProfitableWeekday) {
                profitableDays.push({
                    x: key,
                    y: mostProfitableWeekday[key]
                })
            }

            resolve({
                bestSelling: productBestSelling,
                mostProductsCategory: productCategory,
                mostProfitableWeekday: profitableDays
            })
        } catch(e) {
            reject(e)
        }
    })
}


function getDayName(date) {
    // We expect to receive date in format MM/DD/YYYY
    let fullDate = new Date(date)

    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let dayIndex = fullDate.getDay()

    return typeof dayIndex === 'number' ? dayNames[dayIndex] : ''
}


module.exports = {
    getStatistics
}