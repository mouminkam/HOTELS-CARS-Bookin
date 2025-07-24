// backend/routes/carRoutes.js
import express from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js';


const CarRouter = express.Router();

CarRouter.get('/allCar', getAllCars);
CarRouter.get('/:id', getCarById);
CarRouter.post('/newCar', createCar);
CarRouter.patch('/update/:id', updateCar);
CarRouter.delete('/delete/:id', deleteCar);

export default CarRouter;
