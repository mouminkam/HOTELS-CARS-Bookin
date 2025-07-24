// backend/routes/userRoutes.js
import express from 'express';
import {
  getAllUsers,
  getUserById,createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';


const UserRouter = express.Router();
UserRouter.post('/register', createUser);
UserRouter.get('/allUsers', getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.patch('/update/:id',  updateUser);
UserRouter.delete('/delete/:id', deleteUser);

export default UserRouter;
