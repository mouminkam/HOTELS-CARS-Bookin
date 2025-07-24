// backend/controllers/carController.js
import Car from '../models/Car.js';

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching car' });
  }
};

export const createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const saved = await newCar.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Car not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car' });
  }
};
