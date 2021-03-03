const router = require("express").Router();
const Statistics = require('../controllers/Statistics')
const { isAdmin } = require('../services/authMiddleware')

router.get('/', isAdmin, async (req, res) => {
    try {
        let dataStatistics = await Statistics.getStatistics()

        res.json({
            message: 'Successfully',
            data: dataStatistics
        })
    } catch(e) {
        res.json({
            message: 'Something went wrong...'
        })
    }
})

module.exports = router;