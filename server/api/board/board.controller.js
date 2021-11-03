import Promise from 'bluebird' ;
import Board from './board.model';
import List from '../list/list.model';
import Card from '../card/card.model';
import isEmpty from 'lodash/isEmpty'; 

let controller = {} ; 

controller.create = (req, res) => {
    
    if(!isEmpty(req.body.boardName)){
        let board = new Board(req.body);
        board.user = req.user.id ;

        return board.saveAsync()
            .then(board => {
                console.log(board); 
                return res.status(200).json({success: true, board}); 
            })
            .catch(err => {
                console.log(err); 
                return res.status(500).json({errors: {boardName: 'Database error'}}) ;    
            })
    }else{
        return res.status(400).json({errors: {boardName: 'Board Name cannot be null'}}) ; 
    }
}

controller.delete = (req, res) => {
    console.log('DB Board delete', req.body);
    return Board.deleteOne(req.body)
        .then(board => {
            List.remove({boardId: req.body._id})
            .then(data => {
                // console.log(data);
                Card.remove({boardId: req.body._id})
                .then(data => {
                    // console.log(data);
                    return res.status(200).json({success: true});
                });
            });
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {boardName: 'Database error'}}) ;    
        })
}

controller.getAll = (req, res) => {

    return Board.findAsync({user: req.user.id})
        .then(boards=>{
            return res.status(200).json({success: true, boards: boards});
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {boardName: 'Database error'}}) ;    
        })
}


controller.getOne = (req, res) => {

    return Board.findByIdAsync(req.params.id)
        .then(board=>{
            return res.status(200).json({success: true, board: board});
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {boardName: 'Database error'}}) ;    
        })
}


export default controller