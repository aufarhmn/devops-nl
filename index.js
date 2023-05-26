const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// ? Using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ? CORS Handling
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
	res.header("Access-Controll-Allow-Origin", "*");
	res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
});
// ? End CORS Handling

// ? Use routing
const itemRouter = require("./src/routes");
app.get("/", (req, res) => {
	res.send("BACKEND DEVOPS NL! 2023");
});
app.use("/api/", itemRouter);
// ? End routes

// ? Error handling\
// ? will be called automatically when the url doesn't exist or it's wrong
app.use((req, res, next) => {
	const error = new Error("Not found!");
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
// ? End error handling

// ? Server Run
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});