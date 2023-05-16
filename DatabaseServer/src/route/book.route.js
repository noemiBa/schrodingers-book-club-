import express from "express";
import { getBooks, getBookByISBN } from "../controller/book.controller.js";

const bookRoutes = express.Router();

bookRoutes.route("/")
	.get(getBooks)
	

bookRoutes.route("/:isbn")
	.get(getBookByISBN)

export default bookRoutes;