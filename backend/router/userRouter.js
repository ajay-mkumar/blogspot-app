import  express  from "express";
import { authUser, deleteUser, getUserProfile, 
        getUserById, getUsers, logoutUser,
        resigterUser, updateUser, updateUserProfile } from "../controller/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";


const router=express.Router();

router.route('/').post(resigterUser).get(protect,admin,getUsers);
router.post('/login',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);

export default router;