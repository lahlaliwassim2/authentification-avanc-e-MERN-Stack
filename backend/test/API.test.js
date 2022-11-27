const app = require('../server')
const supertest = require('supertest')

describe("POST /api/auth/login" , () => {

        // should this test : "failed" --> status(400) should be status(200) bcs ipassed wrong data (not found in db)
    describe("email et mot de passe ",  () => {
        // should save the email and password to the database
            test("entrer des données non correct" , async () => {
                const response = await supertest(app).post("/api/auth/login")
                .send({
                    email:"fauxEmail",
                    password:"fauxPwd"
                    })
                    expect(response.status).toBe(401)
            })        
    })
    // should this test : "passed" --> status(400) should be status(200) bcs i passed true data (founded in db )
    describe("given a email and password",  () => {
        // should save the email and password to the database
            test("should respond with a 200 status code" , async () => {
                const response = await supertest(app).post("/api/auth/login")
                .send({
                    email:"wlahlali343@gmail.com",
                    password:"123456"
                    })
                    expect(response.status).toBe(200)
            })        
    })
})