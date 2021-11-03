import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Datetime from 'react-datetime' ;
import { listLists } from './../../data/api.service'; 
import FormField from './../common/form.field'; 
import { connect } from 'react-redux'; 
import { updateCard } from './../../actions/card.actions';
import moment from 'moment';

class CardModifyComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: props.showModal, 
            cardInfo: props.cardInfo, 
            errors: {}, 
            isLoading: false, 
            clickedName: false, 
            lists: []
        };
        this.close = this.close.bind(this) ;
        this.onChange = this.onChange.bind(this) ;
        this.onSubmit = this.onSubmit.bind(this) ;
    }
    
    componentDidMount() {
        listLists(this.state.cardInfo.boardId).then(
            res=>{
                //this.setState({boardInfo: res.data.board}); 
                //this.props.setCurrentBoard(res.data.board);
                this.setState({
                    lists: res.data.lists
                })
            },
            err=>{
                this.props.history.push('/scrum'); 
            }
        ); 
    }

    close() {
        this.setState({ showModal: false });
        this.props.reloadCard();
    }

    open() {
        this.setState({ showModal: true });
    }

    onChange(e){
        let newCardInfo = Object.assign({}, this.state.cardInfo); 
        newCardInfo[e.target.name] = e.target.value;
        this.setState({cardInfo: newCardInfo});
    }

    onSubmit(e){
        e.preventDefault();
        this.saveCard(true);
        this.close();
    }

    onSubmitName(e){
        e.preventDefault();
        //console.log(this.state.cardInfo);
        this.setState({clickedName:false});
        this.saveCard();
    }

    saveCard(redirect=false){
        const { cardInfo } = this.state;
        updateCard(cardInfo._id, cardInfo)
        .then(
            res => {
                this.props.reloadCard();
            }, 
            err => {}
        )
    }

    editName(e){
        this.setState({clickedName:true}); 
    }

    dueDateChange(newDate){
        // e.preventDefault(); 
        //    console.log(newDate._d);
        let newCardInfo = Object.assign({}, this.state.cardInfo); 
        newCardInfo['dueDate'] = new Date(newDate._d);
        this.setState({cardInfo: newCardInfo});
        // this.saveCard();
    }

    render(){        

        const optionLists = this.state.lists.map((list, i)=>{
            return(<option value={list._id} key={i} > {list.listName} </option>);
        }); 

        return (
            <Modal show={this.state.showModal} onHide={this.close} className="show">
            <Modal.Header>
                
                    {!this.state.clickedName && <h4 onClick={this.editName.bind(this)}>{this.state.cardInfo.cardName}</h4> }
                    {this.state.clickedName && <form onSubmit={this.onSubmitName.bind(this)}>
                        <div className='form-group head-group'>
                            <input className='form-control heading-card' 
                                type='text' 
                                name='cardName' 
                                value={this.state.cardInfo.cardName} 
                                onChange={this.onChange}
                                required='required'
                                autoFocus={true}
                                />
                            </div>
                    </form>}
                
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={this.onSubmit}>
                    <FormField 
                        type='select'
                        name='listId'
                        onChange={this.onChange}
                        value={this.state.cardInfo.listId}
                        options={optionLists}
                    />
                    <div className='form-group'>
                        <label>Name</label>
                        <input 
                            className='form-control' 
                            name='cardName' 
                            value={this.state.cardInfo.cardName}
                            onChange={this.onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea 
                            className='form-control' 
                            name='cardDesc' 
                            value={this.state.cardInfo.cardDesc}
                            onChange={this.onChange}></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Due Date</label>
                        <Datetime 
                            value={moment(this.state.cardInfo.dueDate).format('L LT')}
                            onChange={this.dueDateChange.bind(this)}/>
                    </div>
                    <FormField 
                        type='radio'
                        label='Priority'
                        name='priority'
                        onChange={this.onChange}
                        value={this.state.cardInfo.priority}
                        values={['Low', 'Mid', 'High']}
                        class='left'
                    />
                    <FormField 
                        label='Save' 
                        type='button'
                        btnClass='btn-primary right'
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

CardModifyComponent.contextTypes = {
        router: React.PropTypes.object.isRequired
}



export default connect(null,{ updateCard })(CardModifyComponent)

