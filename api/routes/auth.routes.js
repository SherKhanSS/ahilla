const { Router } = require('express')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router()
const auth = require('../middleware/auth.middleware')
const { secretKey } = require('../config')

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    const candidate = await Admin.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new Admin({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })
  } catch (e) {
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Admin.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '8h' })

    res.json({ token })
  } catch (e) {
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

router.get('/checkauth', auth, async (req, res) => {
  try {
    const { userId } = req.body
    const user = await Admin.findOne({ userId })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    res.status(200).json({ message: 'Авторизация прошла успешно' })
  } catch (e) {
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

module.exports = router
