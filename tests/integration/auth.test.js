const request = require("supertest");
const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");

let server;

describe("auth middleware", () => {
	beforeEach(() => {
		server = require("../../index");
	});
	afterEach(async () => {
    server.close();
    await Genre.remove({})
	});

	let token;

	beforeEach(() => {
		token = new User().generateAuthToken();
	});

	const exec = () => {
		return request(server)
			.post("/api/genres")
			.set("x-auth-token", token)
			.send({ name: "genre1" });
	};

	it("Should return a 401 if no token is provided ", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
  });
  
  it("Should return a 200 if token is valid" , async () => {
    const res = await exec()
    expect(res.status).toBe(200)
  })


});
