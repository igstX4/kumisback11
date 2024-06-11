import AdminSchema from "../Models/Admin.schema.js";
import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import SettingsSchema from "../Models/Settings.schema.js";


export const register = async (req, res) => {
    const {email, password,} = req.body
    const emailedUser = await AdminSchema.findOne({email,})

    const user = await AdminSchema.findById(req.userId)

    if (user.role !== 'admin') {
        return res.status(500).json({message: "Нет доступа"})
    }

    if (emailedUser?._id) {
        return res.status(500).json({message: "Такая почта уже зарегистрирована"})
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const doc = new AdminSchema({
        email, passwordHash: hashedPassword, role: 'moderator'
    })

    const newUser = await doc.save()

    res.status(200).json({email, password, id: newUser._id})
    
} 

export const ChangeUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const {userId} = req

    try {
        const user = await AdminSchema.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        console.log(oldPassword, user.passwordHash,1 )
        const isValidPass = await bcrypt.compare(oldPassword, user.passwordHash)

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный пароль'
            })
        }

        
        const salt = await genSalt(10);
        const hashedPassword = await hash(newPassword, salt);
        user.passwordHash = hashedPassword

        await user.save()
 
        res.json({success : true})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать продукт',
        });
    }
}
export const DeleteAdmin = async (req, res) => {
    const {email} = req.body
    console.log(req.body)
    const user = await AdminSchema.findById(req.userId)
    if (user?.role !== "admin") {
        return res.status(500).json({message: "Нет доступа"})
    }

    const deletedUser = await AdminSchema.deleteOne({email})

    res.status(200).json({message: `${email} удалён!`})

}
export const getMe = async (req, res) => {
    const user = await AdminSchema.findById(req.userId)
    if (!user) {
        return res.status(404).json({
            message: 'Пользователь не найден',
        })
    }

    const {passwordHash, ...userData} = user._doc

    res.json(userData)
}

export const SecretKey = async (req, res) => {
    const settings = await SettingsSchema.find()
    if (!settings[0].isSecret) {
        return res.status(500).json({message: "Ключ не поддерживается"})
    }
    const {email, password, secret} = req.body
    const hashedSecret = await SettingsSchema.find()
    const isEqual = await compare(secret, hashedSecret[0].secret)
    if (!isEqual) {
        return res.status(500).json({message: "Нет доступа"})
    }
    const emailedUser = await AdminSchema.findOne({email,})

    if (emailedUser?._id) {
        return res.status(500).json({message: "Такая почта уже зарегистрирована"})
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const doc = new AdminSchema({
        email, passwordHash: hashedPassword, role: 'admin'
    })
    const user = await doc.save()

    const token = jwt.sign(
        {
            _id: user._id
        },
        `secret123`,
        {
            expiresIn: '15d'
        }
    )

    res.status(200).json({
        token,
        user,
    })
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await AdminSchema.findOne({email,})

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        console.log(user.passwordHash, password)
        const isValidPass = await bcrypt.compare(password, user.passwordHash)

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }
        
        const token = jwt.sign(
            {
                _id: user._id
            },
            `secret123`,
            {
                expiresIn: '15d'
            }
        )

        res.status(200).json({token, user})


    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать продукт',
        });
    }
}
export const getModerators = async (req, res) => {
   try {
       const moderators = await AdminSchema.find({role: "moderator"})
       console.log(moderators)
       res.json(moderators)
   } catch (e) {
       console.log(e)
   }
}