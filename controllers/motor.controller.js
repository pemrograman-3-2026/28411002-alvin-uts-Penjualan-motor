import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.motor.findMany({
    include: { category: true }
  })
  res.json({ message: 'OK', data })
}

export const getById = async (req, res) => {
  const data = await prisma.motor.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { category: true }
  })
  if (!data) return res.status(404).json({ message: 'Motor tidak ditemukan!' })
  res.json({ message: 'OK', data })
}

export const getStokMenipis = async (req, res) => {
  const data = await prisma.motor.findMany({
    where: { stock: { lte: 3 } },
    include: { category: true }
  })
  res.json({ message: 'Stok menipis', data })
}

export const create = async (req, res) => {
  const { name, brand, type, cc, year, color, price, stock, imageUrl, id_kategori, id_supplier } = req.body
  const data = await prisma.motor.create({
    data: {
      name, brand, type,
      cc: cc ? parseInt(cc) : null,
      year: year ? parseInt(year) : null,
      color,
      price: parseInt(price),
      stock: parseInt(stock),
      imageUrl,
      id_kategori: parseInt(id_kategori),
    },
    include: { category: true }
  })
  res.status(201).json({ message: 'Motor ditambahkan!', data })
}

export const update = async (req, res) => {
  const { name, brand, type, cc, year, color, price, stock, imageUrl, id_kategori } = req.body
  const data = await prisma.motor.update({
    where: { id: parseInt(req.params.id) },
    data: { name, brand, type, cc, year, color, price, stock, imageUrl, id_kategori, id_supplier }
  })
  res.json({ message: 'Motor diupdate!', data })
}

export const remove = async (req, res) => {
  await prisma.motor.delete({ where: { id: parseInt(req.params.id) } })
  res.json({ message: 'Motor dihapus!' })
}
