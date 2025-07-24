import express from 'express';
import { 
  getAllHotels, createHotel, getHotelById,
  updateHotel, deleteHotel 
} from '../controllers/hotelController.js';


const hotelrouter = express.Router();


  hotelrouter.get( '/allHotels' , getAllHotels)
  hotelrouter.post( '/newHotel' ,createHotel);
  hotelrouter.get('/hotel/:id', getHotelById)
  hotelrouter.patch('/edit/:id', updateHotel)
  hotelrouter .delete('/delete/:id', deleteHotel);

export default hotelrouter;

