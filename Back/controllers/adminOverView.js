// backend/controllers/adminController.js

import User from '../models/User.js';
import Reservation from '../models/Reservation.js';
import Hotel from '../models/Hotel.js'; 

export const getStats = async (req, res) => {
  try {
    const totalProperties = await Hotel.countDocuments();
    const totalBookings = await Reservation.countDocuments();
    const totalUsers = await User.countDocuments();
    const revenueResult = await Reservation.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      totalProperties,
      totalBookings,
      totalUsers,
      totalRevenue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const recentBookings = await Reservation.find()
      .populate('user')
      .populate('hotel')
      .populate('car')
      .sort({ createdAt: -1 })
      .limit(5); 


    const topHotels = await Hotel.aggregate([
      {
        $lookup: {
          from: 'reservations',
          localField: '_id',
          foreignField: 'hotel',
          as: 'bookings'
        }
      },
      {
        $project: {
          name: 1,
          image: 1,
          bookings: { $size: '$bookings' }, 
          rating: 1
        }
      },
      { $sort: { bookings: -1 } }, 
      { $limit: 5 }
    ]);

 
    const topCars = await Reservation.aggregate([
      {
        $group: {
          _id: '$car',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'cars', 
          localField: '_id',
          foreignField: '_id',
          as: 'carDetails'
        }
      },
      {
        $unwind: '$carDetails'
      },
      {
        $project: {
          name: '$carDetails.name',
          image: '$carDetails.image',
          bookings: '$count'
        }
      },
      { $sort: { bookings: -1 } }, 
      { $limit: 5 }
    ]);

    res.json({
      recentBookings,
      topHotels,
      topCars
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};
