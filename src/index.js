import express from "express"
import bcrypt from 'bcrypt'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/hash-password", (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("myPlaintextPassword", salt, function(err, hash) {
            res.send(hash)
        });
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})