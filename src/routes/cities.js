import { Router } from 'express';
const CityRoutes = Router();

import { createCity, getCity, getCitys, deleteCity, updateCitys } from '../controllers/cities.controller';


CityRoutes.get('/', getCitys);
CityRoutes.get('/:id', getCity);
CityRoutes.post('/', createCity);
CityRoutes.delete('/:id', deleteCity);
CityRoutes.put('/:id', updateCitys);


export default CityRoutes;