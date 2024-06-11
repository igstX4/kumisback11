import * as AdminService from '../Services/Admin.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'

const adminRouter = Router()

adminRouter.post('/addModerator', checkAuth, AdminService.register)
adminRouter.post('/login', AdminService.login)
adminRouter.post('/secret', AdminService.SecretKey)
adminRouter.post('/delete', checkAuth, AdminService.DeleteAdmin)
adminRouter.post('/changePassword', checkAuth, AdminService.ChangeUserPassword)
adminRouter.get('/me', checkAuth, AdminService.getMe)
adminRouter.get('/getModerators', checkAuth, AdminService.getModerators)



export default adminRouter