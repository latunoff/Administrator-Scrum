import express from 'express' ; 
import controller from './list.controller';
import { isAuthenticated } from './../services/auth.service'; 

let router = express.Router();

router.get('/:id', isAuthenticated, controller.getOne);
router.delete('/:id', isAuthenticated, controller.delete);
router.post('/', isAuthenticated, controller.create);
router.get('/', isAuthenticated, controller.getAll);
router.patch('/:id', isAuthenticated, controller.updateOne);

export default router ; 