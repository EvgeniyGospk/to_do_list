const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const taskController = require("../controllers/task-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware")

//Маршруты для users
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware ,userController.getUsers);

//Маршруты для tasks

router.post("/tasks", authMiddleware, taskController.create)
router.get("/tasks", authMiddleware, taskController.getAll)
router.get("/tasks/:id", authMiddleware, taskController.getOne)
router.put("/tasks/:id", authMiddleware, taskController.update)
router.delete("/tasks/:id", authMiddleware, taskController.delete)

module.exports = router;
