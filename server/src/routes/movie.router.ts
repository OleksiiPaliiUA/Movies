import { Router } from "express";

import MovieController from "../controllers/movie.controller";

const router: Router = Router();

router.post("/movie", MovieController.createMovie);
router.put("/movie/:id", MovieController.updateMovie);
router.delete("/movie/:id", MovieController.deleteMovie);
router.get("/movie/:id", MovieController.getMovieById);
router.get("/movies", MovieController.getMovies);

export default router;
