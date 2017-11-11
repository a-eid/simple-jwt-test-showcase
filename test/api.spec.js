import supertest from "supertest"
import jwt from "jwt-simple"
import { expect } from "chai"
import server, { secret } from "../server"
const app = supertest(server)

describe("api", () => {
  describe("post /api/auth", () => {
    describe("with valid cred", () => {
      it("returns a valid token", () => {
        const cred = { username: "ahmed", password: "eid" }
        const token = jwt.encode({ id: 1 }, secret)
        return app
          .post("/api/auth")
          .send(cred)
          .expect(200)
          .then(({ body }) => {
            expect(token).to.equal(body.token)
          })
      })
    })
    describe("with false cred", () => {
      it("returns a 401 unauthorized", done => {
        app
          .post("/api/auth")
          .send({ username: "ahmed", password: "eid1" })
          .expect(401, done)
      })
    })
  })

  describe("post /api/profile", () => {
    describe("with valid token", () => {
      it("returns a valid token", () => {
        const token = jwt.encode({ id: 1 }, secret)
        return app
          .get("/api/profile")
          .set("token", token)
          .expect(200)
      })
    })
    describe("with invalid token", () => {
      it("returns 401", () => {
        const token = jwt.encode({ id: 1 }, "different secret")
        return app
          .get("/api/profile")
          .set("token", token)
          .expect(401)
      })
    })
  })
})
