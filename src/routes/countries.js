import { Router } from 'express';
const CountryRoutes = Router();

import { createCountry, getCountry, getCountrys, deleteCountry, updateCountrys } from '../controllers/countries.controller';


CountryRoutes.get('/', getCountrys);
CountryRoutes.get('/:id', getCountry);
CountryRoutes.post('/', createCountry);
CountryRoutes.delete('/:id', deleteCountry);
CountryRoutes.put('/:id', updateCountrys);


export default CountryRoutes;