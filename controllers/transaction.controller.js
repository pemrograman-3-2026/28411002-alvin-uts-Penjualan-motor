import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.transaction.findMany({
    include: { user: true, items: { include: { motor: true } } }
  })
  res.json({ message: 'OK', data })
}

export const getByUser = async (req, res) => {
  const data = await prisma.transaction.findMany({
    where: { id_user: parseInt(req.params.id_user) },
    include: { items: { include: { motor: true } } }
  })
  res.json({ message: 'OK', data })
}

export const getById = async (req, res) => {
  const data = await prisma.transaction.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { user: true, items: { include: { motor: true } } }
  })
  if (!data) return res.status(404).json({ message: 'Transaksi tidak ditemukan!' })
  res.json({ message: 'OK', data })
}

export const create = async (req, res) => {
  const { id_user, items } = req.body

  const itemsWithPrice = await Promise.all(items.map(async (item) => {
    const motor = await prisma.motor.findUnique({ where: { id: item.id_motor } })
    if (!motor) throw new Error(`Motor id ${item.id_motor} tidak ditemukan`)
    if (motor.stock < item.quantity) throw new Error(`Stok ${motor.name} tidak cukup`)
    return {
      id_motor: item.id_motor,
      quantity: item.quantity,
      price: motor.price,
      subtotal: motor.price * item.quantity
    }
  }))

  const totalPrice = itemsWithPrice.reduce((sum, i) => sum + i.subtotal, 0)

  const transaction = await prisma.transaction.create({
    data: {
      id_user,
      totalPrice,
      items: { create: itemsWithPrice }
    },
    include: { items: { include: { motor: true } } }
  })

  await Promise.all(itemsWithPrice.map(item =>
    prisma.motor.update({
      where: { id: item.id_motor },
      data: { stock: { decrement: item.quantity } }
    })
  ))

  res.status(201).json({ message: 'Transaksi berhasil!', data: transaction })
}

export const updateStatus = async (req, res) => {
  const { status } = req.body
  const data = await prisma.transaction.update({
    where: { id: parseInt(req.params.id) },
    data: { status }
  })
  res.json({ message: 'Status diupdate!', data })
}