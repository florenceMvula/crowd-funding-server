import { Router } from "express";
import { UserCollection } from "./collection";

const userRouter = Router();
const userCollection = new UserCollection();

userRouter.post("/signup",userCollection.Register);
userRouter.post("/login",userCollection.Login)


export default userRouter;