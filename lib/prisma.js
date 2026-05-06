import "dotenv/config"
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client.ts'

const adapter = new PrismaMariaDb({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_penjualan_motor'
})

const prisma = new PrismaClient({ adapter })
export { prisma }