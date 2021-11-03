import express from 'express' ; 
import controller from './board.controller';
import { isAuthenticated } from './../services/auth.service'; 

let router = express.Router();

router.get('/:id', isAuthenticated, controller.getOne);
router.post('/del/', isAuthenticated, controller.delete);
router.post('/', isAuthenticated, controller.create);
router.get('/', isAuthenticated, controller.getAll);

export default router ; 