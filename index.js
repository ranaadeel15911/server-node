const express = require('express')
// console.log('helo')
const mongoose = require('mongoose')
const server = express()
const cors = require('cors')
const bodyParser = require('body-parser')

server.use(cors())
server.use(bodyParser.json())
/* here we can say use is middleware because it does not read by default to body so we used bodyParser library */
/* here we used cors because it does not allow directly request from ui to server so we need to  */
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://adeel:adeel193725@cluster0.uwmda7z.mongodb.net/?retryWrites=true&w=majority')
    /* Here we used exclamatry because typescript confirm this typpe will give data or not so we confirmed it will give data */
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('Mongoose Connected Successfully')
    })
    connection.on('error',(err)=>{
        console.log('Mongoose Connection Error')
    })
  } catch (error) {
    console.log('Something goes wrong')
    console.log(error)
  }
}
connect()
  const mailSchema = new mongoose.Schema({
    username:String,
    password:String,
  })
  const Mail = mongoose.model('mails',mailSchema)
server.post('/demo',async(req,resp)=>{
    console.log(req.body)
    let mail = new Mail();
    mail.username = req.body.username,
    mail.password = req.body.password
    const doc = await mail.save()
resp.json(doc)
})

server.listen(8080,()=>{
console.log('server started')
})