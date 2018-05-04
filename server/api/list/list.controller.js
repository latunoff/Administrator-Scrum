import Promise from 'bluebird' ;
import List from './list.model';
import isEmpty from 'lodash/isEmpty'; 
import Board from './../board/board.model'; 

let controller = {} ; 

controller.create = (req, res) => {
    
    if(!isEmpty(req.body.listName) && !isEmpty(req.body.boardId)){
        let list = new List(req.body);
        list.user = req.user.id ;

        return list.saveAsync()
            .then(list=>{
                Board.findByIdAndUpdate(req.body.boardId, {'$inc': {noOfLists:1}}, (err, result)=>{
                    if(err){
                        console.log(err); 
                        return res.status(500).json({errors: {listName: 'Some Problem Occured'}}) ;    
                    }
                    return res.status(200).json({success: true, list: list[0]}); 
                })
                
            })
            .catch(err=>{
                console.log(err); 
                return res.status(500).json({errors: {listName: 'Some Problem Occured'}}) ;    
            })
    }else{
        return res.status(400).json({errors: {listName: 'List Name cannot be null'}}) ; 
    }
}

controller.getAll = (req, res) => {

    return List.findAsync({user: req.user.id, boardId: req.query.board })
        .then(lists=>{
            return res.status(200).json({success: true, lists: lists});
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {form: 'Some Problem Occured'}}) ;    
        })
}


controller.getOne = (req, res) => {

    return List.findByIdAsync(req.params.id)
        .then(list=>{
            return res.status(200).json({success: true, list: list});
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {form: 'Some Problem Occured'}}) ;    
        })
}


export default controller