import { register } from "../controllers/auth.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.js";
import {
  checkDuplicateEmailOrUsername,
  checkValidId,
  isAdmin,
  isAdminOrCurrentUser,
  verifyToken,
} from "../middlewares/index.js";

const user = (app) => {
  app.get("/users", verifyToken, isAdmin, getAllUsers);
  app.get("/users/:id", verifyToken, isAdminOrCurrentUser, checkValidId, getUserById);
  app.post(
    "/users",
    verifyToken,
    isAdmin,
    checkDuplicateEmailOrUsername,
    register
  );
  app.patch("/users/:id", verifyToken, isAdmin, checkValidId, updateUser);
  app.delete("/users/:id", verifyToken, isAdmin, checkValidId, deleteUser);
};

export default user;
