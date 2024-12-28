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

app.get('/compare-password', (req, res) => {
    bcrypt.compare("myPlaintextPassword", "$2b$10$qw4QCMYv9fmzr/MPxYXJC.dqVGW5Z6fjY84saH37IC8Ss5GrWl4PO", function(err, result) {
        res.send(result)
        console.log("result====>", result)
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})