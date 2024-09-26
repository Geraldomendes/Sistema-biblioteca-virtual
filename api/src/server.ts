import express from 'express'
import { router } from './routes';

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000')
});