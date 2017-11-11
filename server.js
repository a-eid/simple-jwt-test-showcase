import express from "express"
import bodyParser from "body-parser"
import jwt from "jwt-simple"
const app = express()
export const secret = process.env.SECRET || "secret"

app.use(bodyParser.json())

const users = [
  { id: 1, username: "ahmed", password: "eid" },
  { id: 2, username: "ahmed2", password: "eid2" },
  { id: 3, username: "ahmed3", password: "eid3" },
  { id: 4, username: "ahmed4", password: "eid4" },
]
export const encode = payload => jwt.encode(payload, secret) // return token
export const decode = token => jwt.decode(token, secret) // return payload

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username && user.password === password)
  if (user) {
    const token = encode({ id: user.id })
    res.json({ token })
  } else {
    res.sendStatus(401)
  }
})

app.get("/api/profile", (req, res) => {
  const token = req.headers.token
  let user
  try {
    const { id } = decode(token)
    user = users.find(user => user.id === id)
  } catch (e) {
    user = null
  }
  if (user) {
    res.json("OK")
  } else {
    res.sendStatus(401)
  }
})

export default app
