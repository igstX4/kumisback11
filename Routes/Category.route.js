import * as CategoryService from '../Services/Category.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'

const categoryRoute = Router()

categoryRoute.post('/createCategory' , checkAuth ,CategoryService.createCategory)
categoryRoute.put('/editCategory/:id', checkAuth, CategoryService.editCategory)
categoryRoute.delete('/categoryDelete/:id', checkAuth, CategoryService.deleteCategory)
categoryRoute.get('/getAllCategories', CategoryService.getAllCategory)

export default categoryRoute