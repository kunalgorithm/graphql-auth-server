const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app.js");

describe("Person", () => {
  describe("Create Person", () => {
    it("Returns a 200 response", () => {
      return chai
        .request(app)
        .post("/person")
        .send({
          name: "John Doe",
          phone: "1-800 999",
          email: "johndoe@example.com",
          dogs: 2
        })
        .then(response => {
          // Now let's check our response
          expect(response).to.have.status(200);
          done();
        });
    });
  });
});
