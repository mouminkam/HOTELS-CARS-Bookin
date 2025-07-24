import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/car/allCar");
        setCars(res.data);
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, loadingCars }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);
