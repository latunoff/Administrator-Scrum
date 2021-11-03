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
        // console.log('reload called');
        this.props.onCardChanged();
        this.setState({
            editCard: false
        });
    }

    // componentWillReceiveProps(nextProps){ this.setState(nextProps); }

    render(){
        const { isDropped, isDragging, connectDragSource } = this.props;
        // console.log(connectDragSource);
        // console.log(this.props.cardInfo);
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 }} className={"list-group-item card-href " + "priority_" + this.props.cardInfo.priority}>
                <div className='card-details'>
                    <i className="fa fa-edit fa-2x pointer right blue" aria-hidden="true" onClick={this.onEditCard.bind(this)}></i>
                    <h4 className="list-group-item-heading">{this.props.cardInfo.cardName}</h4>
                    <p className="card-desc">{this.props.cardInfo.cardDesc.split('\n').map((i, k) => <span key={k}>{i}<br /></span>)}</p>
                    <div className='card-foot'>
                        <Confirm
                            //onConfirm={this.props.onDeleteCard.bind(this, this.state.cardInfo._id)}
                            onConfirm={this.props.onDeleteCard.bind(this)}
                            body={"Are you sure you want to delete the task '" + this.props.cardInfo.cardName + "'?"}
                            confirmText="Delete"
                            dialogClassName=""
                            backdrop={true}
                            title={"Delete task " + this.props.cardInfo.cardName}>
                            <i className="fa fa-trash fa-2x pointer red right" aria-hidden="true" title="Delete task"></i>
                        </Confirm>
                        <div className='text-primary'>{moment(this.props.cardInfo.dateCreated).format('LLL')}</div>
                        {this.props.cardInfo.dueDate && 
                            <div className={moment(this.props.cardInfo.dueDate).format('x') > Date.now() ? 'text-warning' : 'text-danger'}>{moment(this.props.cardInfo.dueDate).format('LLL')}</div>}
                    </div>
                </div>
                {this.state.editCard && 
                    <CardModifyComponent 
                        cardInfo={this.props.cardInfo} 
                        reloadCard={this.reloadCard.bind(this)} 
                        showModal={this.state.editCard}
                    />}
            </div>
        );
    }
}
//<i className="fa fa-trash fa-2x pointer right" aria-hidden="true" onClick={this.deleteCard.bind(this)}></i>

const cardSource = {
    beginDrag(props) {
        // console.log('beginDrag', props.cardInfo);
        return {
            _id: props.cardInfo._id,   
        };
    },
    endDrag(props, monitor, component){
        // console.log('endDrag', props, monitor.getItem());
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

export default DragSource('Cards', cardSource, collect)(CardComponent);