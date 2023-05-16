import express from "express";
import { getUserById, createUser, deleteUser, updateUser, getUsers, loginUser } from "../controller/user.controller.js";

const userRoutes = express.Router();

userRoutes.route("/")
	.get(getUsers)
	.post(createUser);

userRoutes.route("/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

userRoutes.route("/login")
	.post(loginUser);

export default userRoutes;