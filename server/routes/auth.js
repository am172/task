import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/middleware.js';
const router = express.Router();

// register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // تأكد من أن الحقول ليست فارغة
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // التحقق من وجود المستخدم في قاعدة البيانات
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        // تشفير كلمة المرور
        const hashPassword = await bcrypt.hash(password, 10);

        // إنشاء مستخدم جديد
        const newUser = new User({ name, email, password: hashPassword });

        // حفظ المستخدم في قاعدة البيانات
        await newUser.save();

        return res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500)
        .json({ success: false, message: `Error in adding user: ${error.message}` });
    }
});


// login
router.post('/login', async (req, res) => {
    try {
        const {  email, password } = req.body;
        
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not exists" });
        }

        const token = jwt.sign({id: user._id}, "secretkeyofnoteapp123@#", {expiresIn: "5h"})
        const checkpassword = await bcrypt.compare(password, user.password)
        
        if(!checkpassword) {
            return res.status(401).json({ success: false, message: "wrong password" });
        }
    

        return res.status(200).json({ success: true, token, user: {name:user.name },  message: "User logined successfully" });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({ success: false, message: `Error in login server: ${error.message}` });
    }
});

router.get('/verify', middleware, async (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
})

export default router;
