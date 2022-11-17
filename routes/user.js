import { register } from "../controllers/auth.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.js";
import { checkValidId } from "../middlewares/index.js";

const user = (app) => {
  app.get("/users", getAllUsers);
  app.get("/users/:id", checkValidId, getUserById);
  app.post("/users", register);
  app.patch("/users/:id", checkValidId, updateUser);
  app.delete("/users/:id",checkValidId, deleteUser);
};

export default user;
