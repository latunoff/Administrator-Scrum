import React, { Component, PropTypes } from 'react' ;
import AddCardComponent from './add.card.component'; 
import CardComponent from './card.component';
import { deleteCard } from './../../actions/card.actions';
import { listCards } from './../../data/api.service'; 
import classnames from 'classnames';
import { DropTarget } from 'react-dnd';

class ListComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            listData: props.listInfo, 
            addNewCard: false, 
            cards: [], 
            clickedName: false
        }
    }
    componentDidMount(){
		listCards(this.props.listInfo._id).then(
            res=>this.setState({cards: res.data.cards}),
            err=>this.setState({ errors: err.response.data.errors})
        ); 
    }
    
    reloadCards(e){
        
        this.setState({
            addNewCard: false
        })
        listCards(this.props.listInfo._id).then(
            res=>this.setState({cards: res.data.cards}),
            err=>this.setState({ errors: err.response.data.errors})
        );
    }

    addNewCard(e){
        e.preventDefault(); 
        this.setState({
            addNewCard: !this.state.addNewCard
        })
    }

    isDropped(card) {
        return true; 
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        //console.log('dropped this ', card); 
    }

    editName(e){
        this.setState({clickedName:true}); 
    }

    onDeleteCard(card){
        //console.log('onDeleteCard list comp', id, this);
        deleteCard({_id: card._id}).then(
            res => {
                console.log('deleted', res.data);
                this.reloadCards();
            },
            err => {
                console.log('onDelete card Error', err);
                this.props.history.push('/home');
            }
        );
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
                />
            );
        })
        const { isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
        
        return connectDropTarget(
            <div className="panel list-main panel-default">
                <div className="panel-heading">
                    
                    {!this.state.clickedName &&  <h4>{this.state.listData.listName}</h4> }
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
                        {cardsInLIst}
                        <a href="#" className='pull-right' onClick={this.addNewCard.bind(this)} title="Add Card">
                            <i className={!this.state.addNewCard ? "fa fa-plus fa-2x" : "fa fa-minus fa-2x"} aria-hidden="true"></i>
                        </a>
                        {this.state.addNewCard && 
                            <AddCardComponent 
                                reloadCards={this.reloadCards.bind(this)} 
                                boardId={this.state.listData.boardId} 
                                listId={this.state.listData._id}
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
    console.log(props)
    console.log(monitor); 
    props.onDrop(monitor.getItem());
  },
    hover(props, monitor, component){
        console.log(props); 
    }
};

function collect(connect, monitor){
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

export default DropTarget(types, listTarget, collect)(ListComponent);
