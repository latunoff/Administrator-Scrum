import React, { Component, PropTypes } from 'react';
import CardModifyComponent from './card.modify.component'; 
import Confirm from '../common/confirm/confirm.component';
import { deleteCard } from './../../actions/card.actions';
import { DragSource } from 'react-dnd';
import { Link } from 'react-router-dom';
import moment from 'moment'; 

class CardComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardInfo: props.cardInfo, 
            editCard: false
        }
    }

    onDeleteCard(e){
        e.preventDefault();
        console.log(this);
    }

    onEditCard(e){
        e.preventDefault();
        this.setState({
            editCard: !this.state.editCard
        })
    }

    onClick(e){
        e.preventDefault();
    }

    reloadCard(){
        console.log('reload called'); 
        this.setState({
            editCard: false
        })
    }

    render(){
        const { isDropped, isDragging, connectDragSource } = this.props;
        //console.log(this.state);
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 }} className="list-group-item card-href">
                <div className='card-details'>
                    <i className="fa fa-edit fa-2x pointer right blue" aria-hidden="true" onClick={this.onEditCard.bind(this)}></i>
                    <h4 className="list-group-item-heading">{this.state.cardInfo.cardName}</h4>
                    <p className="card-desc">{this.state.cardInfo.cardDesc}</p>
                    <div className='card-foot'>
                        <Confirm
                            //onConfirm={this.props.onDeleteCard.bind(this, this.state.cardInfo._id)}
                            onConfirm={this.onDeleteCard.bind(this)}
                            body="Are you sure you want to delete the task?"
                            confirmText="Delete"
                            dialogClassName=""
                            backdrop={true}
                            title="Delete task">
                            <i className="fa fa-trash fa-2x pointer red right" aria-hidden="true" title="Delete task"></i>
                        </Confirm>
                        <span className='text-primary'> 
                            {moment(this.state.cardInfo.dueDate).format('LLL')}
                        </span>
                    </div>
                </div>
                {this.state.editCard && 
                    <CardModifyComponent cardInfo={this.state.cardInfo} reloadCard={this.reloadCard.bind(this)} showModal={this.state.editCard}/>}
            </div>
        );
    }
}
//<i className="fa fa-trash fa-2x pointer right" aria-hidden="true" onClick={this.deleteCard.bind(this)}></i>

const cardSource = {
  beginDrag(props) {
        console.log('hithere', props.cardInfo.cardName)
        return {
            name: props.cardInfo.cardName,
        };
    },
    endDrag(props, monitor, component){
        console.log(monitor.getDropResult()); 
    }
};

function collect(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }  
}

CardComponent.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isDropped: PropTypes.bool.isRequired,
};

export default DragSource('', cardSource, collect)(CardComponent);