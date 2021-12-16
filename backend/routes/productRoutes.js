import express from 'express'
const router = express.Router()
import {
    getProducts,
    testProducts
} from '../controllers/productController.js'

router.route('/:query').get(getProducts)
router.route('/').get(testProducts)

export default router
