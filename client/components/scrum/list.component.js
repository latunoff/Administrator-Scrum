import React, { Component, PropTypes } from 'react' ;
import AddCardComponent from './add.card.component'; 
import ListModifyComponent from './list.modify.component';
import CardComponent from './card.component';
import { deleteCard } from './../../actions/card.actions';
import { listCards } from './../../data/api.service';
import classnames from 'classnames';
import Confirm from '../common/confirm/confirm.component';
import { DropTarget } from 'react-dnd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ListComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            listInfo: props.listInfo, 
            addNewCard: false, 
            cards: this.props.cards, 
            clickedName: false,
            editing: false
        };
    }

    componentWillReceiveProps(nextProps){
        // console.log('nextProps:', nextProps);
        this.setState(nextProps);
    }
    
    // reloadCards(){   функция не используется, тк нужно глобально обновлять всё с пом reloadAllCards чтобы работал поиск
    //     listCards(this.props.listInfo._id).then(
    //         res => {
    //             // console.log('listCards', res.data.cards);
    //             this.setState({
    //                 cards: res.data.cards,
    //                 addNewCard: false
    //             });
    //         },
    //         err => this.setState({ errors: err.response.data.errors})
    //     );
    // }

    reloadAllCards() {
        this.props.onReloadAllCards();
        this.setState({
            addNewCard: false
        });
    }

    addNewCard(e){
        e.preventDefault(); 
        this.setState({
            addNewCard: !this.state.addNewCard
        })
    }

    isDropped(card) {
        return false;
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        //console.log('dropped this ', card); 
    }

    editName(e){
        this.setState({clickedName:true}); 
    }

    onDeleteCard(card){
        //console.log('onDeleteCard list comp', id, this);
        deleteCard({_id: card._id})
        .then(
            res => {
                // console.log('deleted', res.data);
                this.reloadAllCards();
            },
            err => {
                console.log('onDelete card Error', err);
                this.props.history.push('/home');
            }
        );
    }

    onEditList(e){
        e.preventDefault();
        this.setState({
            editing: !this.state.editing
        })
    }

    onSubmitName(e){
        e.preventDefault()
        this.setState({clickedName:false}); 

    }

    render(){
        const cardsInLIst = this.state.cards.map((card,i)=>{
            return(
                <CardComponent 
                    cardInfo={card} 
                    key={i} 
                    isDropped={this.isDropped(card)}
                    onDeleteCard={this.onDeleteCard.bind(this, card)}
                    onCardChanged={this.reloadAllCards.bind(this)}
                />
            );
        });
        if (this.state.listInfo.cardsOrder === -1) {
            cardsInLIst.reverse();
        }
        const { isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
        
        return connectDropTarget(
            <div className="panel list-main panel-default">
                <div className="panel-heading">
                    <div className="panel-button">
                    <i className="fa fa-edit pointer left blue" aria-hidden="true" onClick={this.onEditList.bind(this)}></i>
                        <Confirm
                            //onConfirm={this.props.onDeleteCard.bind(this, this.state.cardInfo._id)}
                            onConfirm={this.props.onDeleteList.bind(this, this.props.listInfo)}
                            body={"Are you sure you want to delete the List '" + this.props.listInfo.listName + "'?"}
                            confirmText="Delete"
                            dialogClassName=""
                            backdrop={true}
                            title={"Delete List " + this.props.listInfo.listName}>
                            <i className="fa fa-trash fa-1x pointer red right" aria-hidden="true" title="Delete list"></i>
                        </Confirm>
                    </div>
                    {!this.state.clickedName && <h4>{this.props.listInfo.listName}</h4> }
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
                </div>
                <div className="panel-body">
                    <div className="list-group cards-list">
                        {this.state.listInfo.cardsOrder === -1 &&
                        <a href="#" className='pull-right' onClick={this.addNewCard.bind(this)} title="Add Card">
                            <i className={!this.state.addNewCard ? "fa fa-plus fa-2x" : "fa fa-minus fa-2x"} aria-hidden="true"></i>
                        </a>}
                        {this.state.addNewCard && this.state.listInfo.cardsOrder === -1 &&
                            <AddCardComponent 
                                reloadCards={this.reloadAllCards.bind(this)} 
                                boardId={this.state.listInfo.boardId} 
                                listId={this.state.listInfo._id}
                            />
                        }
                        <ReactCSSTransitionGroup transitionName="toggle-"
                                            transitionEnterTimeout={300}
                                            transitionLeaveTimeout={300}
                                            transitionAppear={true}
                                            transitionAppearTimeout={300}>
                        </ReactCSSTransitionGroup>
                            {cardsInLIst}
                        {this.state.listInfo.cardsOrder === 1 &&
                        <a href="#" className='pull-right' onClick={this.addNewCard.bind(this)} title="Add Card">
                            <i className={!this.state.addNewCard ? "fa fa-plus fa-2x" : "fa fa-minus fa-2x"} aria-hidden="true"></i>
                        </a>}
                        {this.state.addNewCard && this.state.listInfo.cardsOrder === 1 &&
                            <AddCardComponent 
                                reloadCards={this.reloadAllCards.bind(this)} 
                                boardId={this.state.listInfo.boardId} 
                                listId={this.state.listInfo._id}
                            />
                        }
                        {this.state.editing && 
                            <ListModifyComponent 
                                listInfo={this.state.listInfo} 
                                onListSaved={this.props.onReloadAllCards.bind(this)} 
                                showModal={this.state.editing}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const types = '';

const listTarget = {
    drop(props, monitor) {
        // console.log('dropped', ' on ', monitor.getItem(), props)
        
        props.onDrop(monitor.getItem(), props);
        // this.setState({cards: []});
    },
    hover(props, monitor, component){
        const draggedId = monitor.getItem()._id;
        // console.log('draggedId=', monitor.getItem()._id, props._id);
    }
};

function collect(connect, monitor){
    // console.log(connect.dropTarget()); 
    return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
    }    
}

ListComponent.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
  };

export default DropTarget('Cards', listTarget, collect)(ListComponent);
