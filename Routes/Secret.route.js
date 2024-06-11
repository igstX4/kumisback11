import * as SecretKey from '../Services/Secret.service.js'
import {Router} from 'express'
import checkAuth from '../Utils/checkAuth.js'

const settingsRoute = Router()

settingsRoute.post('/changeSecret', checkAuth, SecretKey.ChangeSecretPassword)
settingsRoute.post('/changeIsSecret', checkAuth, SecretKey.changeSecretAuth)
settingsRoute.get('/secret', SecretKey.getSecretSetting)


export default settingsRoute