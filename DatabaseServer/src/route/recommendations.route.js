import express from "express";
import { createRecommendation, getUserRecommendations } from "../controller/recommendation.controller.js";

const recommendationRoutes = express.Router();

recommendationRoutes.route("/")
	.post(createRecommendation);

    recommendationRoutes.route("/:id")
	.get(getUserRecommendations)
	

export default recommendationRoutes;