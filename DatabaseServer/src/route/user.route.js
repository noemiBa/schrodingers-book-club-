import express from "express";
import { getUserById, createUser, deleteUser, updateUser, getUsers } from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route("/")
	.get(getUsers)
	.post(createUser);

userRoutes.route("/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

export default userRoutes;