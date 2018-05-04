import express from 'express' ; 
import controller from './list.controller';
import { isAuthenticated } from './../services/auth.service'; 

let router = express.Router();

router.get('/:id', isAuthenticated, controller.getOne);
router.post('/', isAuthenticated, controller.create);
router.get('/', isAuthenticated, controller.getAll);

export default router ; 