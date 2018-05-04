import Promise from 'bluebird' ;
import User from './user.model';
import bcrypt from 'bcrypt' ; 
import commonValidations from './../../shared/validations/signup'; 
import isEmpty from 'lodash/isEmpty'; 

let controller = {} ; 

function validateInput(data , otherValidations){
    let { errors } = otherValidations(data) ;
    return User.findOneAsync({email: data.email})
        .then(user=>{
            console.log('User: ', user);
            if (user) {
                errors.email = 'User exists with this email'
            }   
            
            return {
                errors, 
                isValid: isEmpty(errors)
            };
        })
}

controller.create = (req, res) => {
    
    validateInput(req.body, commonValidations).then(
        ({ errors, isValid })=>{
            if(isValid){
                const user = new User(req.body);
                user.hashedPassword = bcrypt.hashSync(req.body.password, 10);
                console.log('Going to save ', user);

                user.saveAsync()
                    .then(result=>{                    
                        res.status(200).json({success: true}) ; 
                    })
                    .catch(err=> {
                        console.log(err) ; 
                        res.status(500).json({error: err});
                    });                
            }else{
                res.status(400).json(errors);
            }
        }
    )


    
}



controller.me = function(req, res, next) {
    const userId = req.user.id;

    return User.findByIdAsync(userId)
        .then(user=>{
            if(!user)   return res.status(401).json({error: {message: 'User Not Found'}});
            return res.status(200).json(user.info);
        })
        .catch(err=>{
            console.log(err) ; 
            return res.status(500).json({error: err});
        }) 
},


controller.checkExisting = function(req, res, next) {
    console.log('Entered checkExisting');
    var email = req.query.email;
    return User.findOneAsync({
            email: email
        })
        .then(user=>{
            console.log('User: ', user);
            if (user) {
                return res.status(200).json({
                    email: email,
                    exists: true
                });
            } else {
                return res.status(200).json({
                    email: email,
                    exists: false
                });
            }    
        })
        .catch(err=>{
            console.log(err) ; 
            return res.status(500).json({error: err});
        })
}



export default controller ; 