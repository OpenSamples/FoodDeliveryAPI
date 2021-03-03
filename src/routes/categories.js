const router = require("express").Router();
//Categories controller
const Categories = require("../controllers/CategoriesController");
const {isAuth, isAdmin} = require("../services/authMiddleware");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/categories')
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
Routes for categories

Categories
- GetCategories - GET: api/Categories
- CreateCategories - POST: api/Categories
*/

// Category image upload route
router.post('/upload', upload.single('upload'), async (req, res) => {
    try {
        const upload = req.file;

        res.send({
            status: true,
            message: 'Category image uploaded.',
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
 
//Create new category fetching req.body and passing it as parameter to createCategories function
//tested:working
router.post("/", isAuth, upload.single('imageUrl'), async (req,res)=>{
    // const categoriesData = req.body;

    try {
        if(req.file) {

            const categoriesData = {
                name: req.body.name,
                imageUrl: '.' + req.file.path.slice(6)
            }

            const newCategory = await Categories.createCategories(categoriesData);
    
            return res.status(201).json(newCategory);
        }

        res.status(406).json({
            error: true,
            message: 'Please select image',
            status: 406
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
        res.status(error.status || 403).json(error);
    }
});


//Get all categories
//tested:working
router.get("/", async (req,res)=>{

    try {
        const allCategories = await Categories.getAllCategories();
        res.status(201).json(allCategories);
    } catch (error) {
        res.status(error.status || 403).json(error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        let deletedCategory = await Categories.deleteById(req.params.id)

        res.status(200).json(deletedCategory)
    } catch(e) {
        res.status(401).json(e)
    }
})

module.exports = router;