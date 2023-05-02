import express from "express";
import { addUsers, forgetpassword, getAlluser, login } from "../controlers/user-controller.js";

const router=express.Router();

router.get('/',getAlluser);
router.post('/signup',addUsers);
router.post('/login',login);
router.post('/forgetpassword',forgetpassword);

export default router;