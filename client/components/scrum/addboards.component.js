import React, { Component } from 'react' ;
import { Link } from 'react-router-dom'; 
import FormField from './../common/form.field' ;
import { connect } from 'react-redux' ;
import { createBoard } from './../../actions/board.actions';


class AddBoardComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            boardType: 'scrum',
            boardName: '', 
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this) ;
        this.onSubmit = this.onSubmit.bind(this) ;
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.createBoard(this.state)
        .then(
            res => {
                // console.log('result', res);
                // console.log('this.state', this.state);
                this.props.onAddBoard(res.data.board);
                this.setState({ boardName: '' });
                //this.context.router.history.push('/board/'+res.data.board._id),
            },
            err => {
                this.setState({ errors: err.response.data.errors });
            }
        ); 
    }

    render(){
        return(
            <div className='col-md-6 col-xs-12 m-t-20 form_add_board'>
                <form onSubmit={this.onSubmit}>
                    { this.state.errors.form && <div className='alert alert-danger'>{this.state.errors.form}</div>}
                    &nbsp;
                    <FormField 
                        type='text' 
                        name='boardName' 
                        value={this.state.boardName} 
                        onChange={this.onChange}
                        errors={this.state.errors.boardName}
                        required='required'
                        placeholder='New project...' />
                    
                    <FormField 
                        label='Add' 
                        type='button'
                        btnClass='btn-primary'
                        loading={this.state.isLoading}
                        disabledItems={this.state.isLoading} 
                        />

                </form>                
                
            </div>
        )
    }
}

AddBoardComponent.propTypes = {
    createBoard: React.PropTypes.func.isRequired
}

AddBoardComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}



export default connect(null , { createBoard })(AddBoardComponent)