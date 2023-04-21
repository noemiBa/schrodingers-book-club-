import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import createResponse from "./domain/response.js";
import log from "./util/logger.js";
import httpStatus from "./controller/user.controller.js";
import userRoutes from "./route/user.route.js";


dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/users', userRoutes);

app.get("/", (req, res) => {
  	res.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, "Hello World", null));
});

app.all("*", (req, res) => {
	res.status(httpStatus.NOT_FOUND.statusCode).send(createResponse(httpStatus.NOT_FOUND.statusCode, httpStatus.NOT_FOUND.httpStatus, "Endpoint does not exist", null));
});

app.listen(PORT, () => {
  log.info(`Server running at http://${ip.address()}:${PORT}`);
});