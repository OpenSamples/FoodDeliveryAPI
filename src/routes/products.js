const router = require("express").Router();
//Products controller
const Products = require("../controllers/ProductsController");
const {isAuth} = require("../services/authMiddleware");
const {isAdmin} = require("../services/authMiddleware");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/products')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
})

// multer options
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3145728
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload product image.'))
        }
        cb (undefined, true)
    }
})

/*
Products routes

- CreateProduct - POST: api/Products
- GetAllProducts - GET: api/Products
- GetProductById - GET: api/Products/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1(Category ID)
- GetPopularProduct - GET: api/Products/Show/PopularProducts
- AddReview - POST : api/Products/Review
- GetAllReviewsByProduct - GET : api/Products/Reviews/5(Product ID)
- GetAverageRatingByProduct - GET : api/Products/AverageRating/5 (Product ID)
- GetAllProductsComments - GET : api/Products/Comments/5 (Product ID);
- RemoveReview - POST : api/Products/remove-review/:5 (Product ID);
*/

// Product image upload route
router.post('/upload', upload.single('upload'), async (req, res) => {
    try {
        const upload = req.file;

        res.send({
            status: true,
            message: 'Product image uploaded.',
            data: {
                name: upload.originalname,
                mimetype: upload.mimetype,
                size: upload.size
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
})

//Adding new product getting data from form in req.body and passing it as parameter to createProduct function
//tested:working
router.post("/", isAuth, isAdmin, upload.single('imageUrl'), async (req, res) => {
    // const productData = req.body;
    try {
        if(req.file) {
            let productData = {
                imageUrl: '.' + req.file.path.slice(6),
                name: req.body.name,
                detail: req.body.detail,
                price: +req.body.price,
                categoryId: req.body.categoryId
            }
            const newProduct = await Products.createProduct(productData);
            return res.status(201).json(newProduct);
        }

        return res.status(406).json({
            error: true,
            message: 'Please upload thumbnail'
        })

    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

//Getting all products
//tested:working 
router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.getAllProducts();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting certain product by id 
//id is being passed through url and we are fetching it with req.params.productId 
//then we are passing it to getProductById function as parameter
//tested:working
router.get("/:productId", async (req, res) => {
    try {
        const productById = await Products.getProductById(req.params.productId);
        res.status(200).json(productById);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting all products that belong to cerain category which we passed to url as an id :categoryId
//that id is being passed to getProductsByCategory fucntion as parameter
//tested:working
router.get("/products-by-category/:categoryId", async (req, res) => {
    try {
        const productsByCategory = await Products.getProductsByCategory(req.params.categoryId);
        res.status(200).json(productsByCategory);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting all those products that are popular 
//tested:working
router.get("/show/popular-products", async (req, res) => {
    try {
        const popularProducts = await Products.getPopularProducts();
        res.status(200).json(popularProducts);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Idea:Logged user can add review to some product in this case we are getting product with id passed in url
//and review data with form (req.body) which will contain userId,rating(number),comment(String)
//We are passing two parameters to addReview function first one is review(req.body from form) second one is
//productId from url(req.params.productId) this can be changed later
//tested:working
router.post("/add-review/:productId", isAuth, async(req,res)=>{
    const review = {
        rating: req.body.rating,
        comment: {
            imageUrl: req.user.imageUrl,
            name: req.user.firstName,
            comment: req.body.comment
        }
    };
    const userId = req.user.id;
    try {
        await Products.addReview(review,req.params.productId,userId);
        res.status(201).json({message:"Review added successfully!"});
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

//Getting all reviews from certain product. We are getting that product by passing its id in url
//and fetching it with req.params which we'll pass as parameter to the getAllReviewsOfProduct function
//tested:working
router.get("/reviews/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAllReviewsOfProduct(req.params.productId);
        res.status(200).json(productReviews);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting average rating for some product that we are getting through url as we pass its id (:productId)
//then we are calling getAverageRatingOfProduct function with productId as parameter
//tested:working
router.get("/average-rating/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAverageRatingOfProduct(req.params.productId);
        res.status(200).json(productReviews);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting all comments from certain product 
//tested:working
router.get("/comments/:productId",async(req,res)=>{
    try {
        const productComments = await Products.getAllCommentsOfProduct(req.params.productId);
        res.status(200).json(productComments);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Idea:Logged user can remove his review from some cerain product where he previously left his review
//we are getting product by fetching its id form ulr(req.params.productId) and getting user from req.body.userId
//this can be changed later because probably we will have global variable req.user which will contain all data from logged user
//we are passing those two variables as parametes in removeReview function
//tested:working
router.post("/remove-review/:productId", isAuth, async(req,res)=>{
    const userId = req.user.id;
    try {
        await Products.removeReview(userId,req.params.productId);
        res.status(200).json({msg:`${req.user.firstName} removed his review from product.`});
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

router.post('/product_popular/:productId', isAdmin, async (req, res) => {
    try {
        let popular = !!req.body.isPopular
        let productId = req.params.productId

        let updatedProduct = await Products.changePopular(productId, popular)

        if(updatedProduct) {
            // Generate token for review
        }

        res.status(200).json(updatedProduct)
    } catch(e) {
        res.status(e.status || 404).json(e)
    }
})


router.delete('/:id', isAdmin, async (req, res) => {
    try {
        let deletedProduct = await Products.deleteById(req.params.id)

        res.status(200).json(deletedProduct)
    } catch(e) {
        res.status(401).json(e)
    }
})

module.exports = router;