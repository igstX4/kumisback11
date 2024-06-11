import AdminSchema from "../Models/Admin.schema.js";
import SettingsSchema from "../Models/Settings.schema.js"
import { compare, genSalt, hash } from 'bcrypt';

export const ChangeSecretPassword = async (req, res) => {
    const {oldSecret, newSecret} = req.body
    const user = await AdminSchema.findById(req.userId)
    if (user.role !== 'admin') {
        return res.status(500).json({message: "Нет доступа"})
    }
    const Settings = await SettingsSchema.find()
    if (!Settings[0]) {
        const salt = await genSalt(10)
        const hashedPassword = await hash(newSecret, salt)
        const doc = new SettingsSchema({
            secret: hashedPassword,
            isSecret: true
        })
        const setting = await doc.save()

        return res.json(setting)
    }
    const isEqual = await compare(oldSecret, Settings[0].secret)

    if(isEqual) {
        const salt = await genSalt(10)
        const hashedPassword = await hash(newSecret, salt)

        Settings[0].secret = hashedPassword

        const newDoc = await Settings[0].save()

        return res.json(newDoc)
    } else {
        return res.status(500).json({message: "Неверный пароль"})
    }
}
export const changeSecretAuth = async (req, res) => {
    const user = await AdminSchema.findById(req.userId)
    if (user.role !== 'admin') {
        return res.status(500).json({message: "Нет доступа"})
    }
    const Settings = await SettingsSchema.find()
    if (!Settings[0]) {
        const doc = new SettingsSchema({
            secret: "",
            isSecret: false
        })
    }
    // console.log(!Settings[0].isSecret)
    Settings[0].isSecret = !Settings[0].isSecret
    await Settings[0].save()
    return res.status(200).json({message: "success"})
}
export const getSecretSetting = async(req, res) => {
    const isSecret = await SettingsSchema.find()
    const setting = isSecret[0]?.isSecret

    res.json(setting)
}
