import Promise from 'bluebird' ;
import List from './list.model';
import Card from '../card/card.model';
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

controller.delete = (req, res) => {
    // console.log('delete', req.params);
    return List.deleteOne({_id: req.params.id})
        .then(data => {
            Card.remove({listId: req.params.id})
            .then(data => {
                // console.log(data);
                return res.status(200).json({success: true});
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({errors: {form: 'Some Problem Occured'}});
        })
}

controller.getAll = (req, res) => {
    return List.findAsync({user: req.user.id, boardId: req.query.board }, null, {sort: {dateCreated: 1}})
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

controller.updateOne = (req, res) => {
    console.log('updateOne List', req.body);
    delete req.body._id;    // overwise 'exception: Mod on _id not allowed'
    List.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, list){
			if (err){
				console.log(err); 
                return res.status(500).json({errors: {form: 'Some Problem Occured'}}) ;    
			}

			return res.status(200).json({success: true, list: list});
		})
}


export default controller