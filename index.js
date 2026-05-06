import express from 'express'
import userRoute from './routes/user.route.js'
import kategoriRoute from './routes/kategori.route.js'
import motorRoute from './routes/motor.route.js'
import transactionRoute from './routes/transaction.route.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('🏍️ Toko Motor API berjalan!'))

app.use('/api/user', userRoute)
app.use('/api/kategori', kategoriRoute)
app.use('/api/motor', motorRoute)
app.use('/api/transaction', transactionRoute)

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'))