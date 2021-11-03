import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCard } from './../../actions/card.actions';
import FormField from './../common/form.field';

class AddCardComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardName: '', 
            cardDesc: '',
            priority: 0,
            listId: props.listId, 
            boardId: props.boardId,
            errors: {}, 
            isLoading: false
        };
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
        // console.log('onSubmit');
        this.props.createCard(this.state).then(
            
            res => { this.props.reloadCards(); },
            err => this.setState({ errors: err.response.data.errors })
        );
    }

    render(){
        return (
            
                <div className='card-details'>
                    <form onSubmit={this.onSubmit}>
                        <FormField 
                            type='text' 
                            name='cardName' 
                            value={this.state.cardName} 
                            onChange={this.onChange}
                            errors={this.state.errors.cardName}
                            required='required'
                            placeholder='New card name...'
                            autofocus={true}
                            />
                        <textarea 
                            className='form-control' 
                            name='cardDesc' 
                            value={this.state.cardDesc}
                            onChange={this.onChange}
                            placeholder='Card description...'></textarea>
                        <FormField 
                            type='radio'
                            label='Priority'
                            name='priority'
                            onChange={this.onChange}
                            value={this.state.priority}
                            values={['Low', 'Mid', 'High']}
                            class='left'
                        />
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

AddCardComponent.propTypes = {
    createCard: React.PropTypes.func.isRequired
}

export default connect(null, { createCard })(AddCardComponent)