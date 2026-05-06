import { prisma } from '../lib/prisma.js'

export const getAll = async (req, res) => {
  const data = await prisma.kategori.findMany()
  res.json({ message: 'OK', data })
}

export const create = async (req, res) => {
  const { name } = req.body
  const data = await prisma.kategori.create({ data: { name } })
  res.status(201).json({ message: 'Kategori ditambahkan!', data })
}

export const update = async (req, res) => {
  const { name } = req.body
  const data = await prisma.kategori.update({
    where: { id: parseInt(req.params.id) },
    data: { name }
  })
  res.json({ message: 'Kategori diupdate!', data })
}

export const remove = async (req, res) => {
  const { id } = req.params
  await prisma.kategori.delete({ where: { id: parseInt(id) } })
  res.json({ message: 'Kategori dihapus!' })
}