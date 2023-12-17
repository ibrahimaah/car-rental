import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CarType } from '../pages/admin/Cars';
import axios from 'axios';
import MAIN_ENDPOINT from '../constants';


type storeType = {
  carsData : CarType[]
  isLoadingCars:  boolean
}


export const CarContext = createContext<storeType>({
  carsData : [],
  isLoadingCars: true
});


export const CarProvider = ({ children }: { children: ReactNode }) => {

    const [carsData,setCarsData] = useState<CarType[]>([]);
    const [isLoadingCars , setIsLoadingCars] = useState(true);

    useEffect(
      () => {

        setIsLoadingCars(true)
        axios.get(`${MAIN_ENDPOINT}cars`).then((response) => {
            setCarsData(response.data.data)

          setIsLoadingCars(false)
        })

    },[]) 


    const store = {
      isLoadingCars,
      carsData
    }

     return (
    <CarContext.Provider value={store}>
      {children}
    </CarContext.Provider>
  );
    
}

export const useCars = () => useContext(CarContext);