import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
const app = express();
require('dotenv').config()
const PORT  = process.env.PORT || 8080
require('./mongodb/db')

app.use(bodyParser.json())
app.use('/api/v1',routes)

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
export default app