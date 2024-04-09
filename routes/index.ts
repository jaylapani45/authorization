import express from 'express';
import { logoutUser, registerUser } from '../userController/index';
import { loginUser } from '../userController';
import { changePassword } from '../userController';
import UserRegisterValidation from '../utils/userRegisterValidation';
import tokenValidation from '../utils/tokenValidation';
const routes = express.Router();

routes.post('/register',UserRegisterValidation, registerUser);  //give {userName:"test", email:"test", password:"test"} as post request to check

routes.post('/login', loginUser); //give {email:"test", password:"test"} as post request to check

routes.post('/logout',tokenValidation,logoutUser); // give Authorization token as header to check 

routes.post('/changePassword',tokenValidation,changePassword); // give Authorization token as header and { newPassword:"test"} as post request to check

export default routes;
