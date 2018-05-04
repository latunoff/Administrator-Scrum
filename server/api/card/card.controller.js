import Promise from 'bluebird' ;
import Card from './card.model';
import isEmpty from 'lodash/isEmpty'; 

let controller = {} ; 

controller.create = (req, res) => {
    
    if(!isEmpty(req.body.cardName) && !isEmpty(req.body.boardId) && !isEmpty(req.body.listId)){
        let card = new Card(req.body);
        card.user = req.user.id ;

        return card.saveAsync()
            .then(card=>{
                return res.status(200).json({success: true, card: card[0]}); 
            })
            .catch(err=>{
                console.log(err); 
                return res.status(500).json({errors: {cardName: 'Some Problem Occured'}}) ;    
            })
    }else{
        return res.status(400).json({errors: {cardName: 'List Name cannot be null'}}) ; 
    }
}

controller.delete = (req, res) => {
    console.log('Card delete', req.params);
    return Card.deleteOne({ _id: req.params.id })
        .then(card => {
            return res.status(200).json({success: true});
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).json({errors: {cardName: 'Database error'}}) ;    
        })
}

controller.getAll = (req, res) => {

    return Card.findAsync({user: req.user.id, listId: req.query.list })
        .then(cards=>{
            return res.status(200).json({success: true, cards: cards});
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).json({errors: {form: 'Some Problem Occured'}});
        })
}


controller.getOne = (req, res) => {

    return Card.findByIdAsync(req.params.id)
        .then(card=>{
            return res.status(200).json({success: true, card: card});
        })
        .catch(err=>{
            console.log(err); 
            return res.status(500).json({errors: {form: 'Some Problem Occured'}}) ;    
        })
}

controller.updateOne = (req, res) => {

    Card.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, card){
			if (err){
				console.log(err); 
                return res.status(500).json({errors: {form: 'Some Problem Occured'}}) ;    
			}

			return res.status(200).json({success: true, card: card});
		})
}


export default controller