import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      return res.status(400).json({
        message: 'Email sudah digunakan!'
      })
    }

    const hashPassword = bcrypt.hashSync(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: role || 'customer'
      }
    })

    return res.status(201).json({
      message: 'Registrasi berhasil!',
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(401).json({
      message: 'User tidak ditemukan!'
    })
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: 'Password salah!'
    })
  }

  const dataSession = JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })

  res.cookie('user', dataSession, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
  })

  return res.json({
    message: 'Login berhasil!',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
}