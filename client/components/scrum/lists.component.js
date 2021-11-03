import React, { Component } from 'react' ;
import ListComponent from './list.component';
import AddListComponent from './add.list.component';
import { listBoardCards } from './../../data/api.service';
import { listLists } from './../../data/api.service';
import { updateCard } from '../../actions/card.actions';
import { deleteList } from '../../actions/list.actions';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class ListsComponent extends Component{
    constructor(props){
        super(props);
        //console.log('in cons ', props);
        this.state = {
            boardId: props.boardId,
            addNewList: false,
            lists: [],
            cards: [],
            cardsAll: [],
            searchText: ''
        };
    }

    componentDidMount() {
        this.reloadLists();
    }

    addNewList(e){
        e.preventDefault(); 
        this.setState({
            addNewList: !this.state.addNewList
        })
    }

    reloadLists() {
        listLists(this.state.boardId).then(
            res => {
                this.setState({ lists: res.data.lists });
                this.reloadCards();
            },
            err => {
                this.props.history.push('/scrum'); 
            }
        ); 
    }

    reloadCards(){
        listBoardCards(this.state.boardId)
        .then(
            res => {
                console.log('reloadCards', res.data.cards);
                this.setState({
                    cards: res.data.cards,
                    lists: this.state.lists
                });
                this.cardsAll = res.data.cards.splice(0);
                this.search(null, this.state.searchText);
                console.log(this.state.searchText);
            },
            err1 => this.setState({ errors: err1.response.data.errors })
        );
    }

    handleDeleteList(list) {
        deleteList(list)
        .then(
            res => {
                // console.log('List deleted', res);
                const lists = this.state.lists.filter((i) => i._id != list._id);
                this.setState({ lists });
            },
            err => {
                console.log('onDelete list Error', err);
            }
        );
    }

    handleDrop(card, list) {
        // console.log(card, 'dropped in', list);

        let cards = this.state.cards;
        let cardd = cards.find(i => i._id == card._id);
        // cardd.listId = list.listInfo._id;
        // console.log('changed Card', cardd);
        
        let cardToChange = Object.assign({}, cardd);  // создал новую карту, тк в state нужно отправить карту с _id, а в сейв без
        cardToChange.listId = list.listInfo._id;

        delete cardToChange._id;                        // иначе exception: Mod on _id not allowed
        updateCard(card._id, cardToChange)
        .then(
            res => {
                this.reloadCards();
                // console.log('updateCard', res);
            },
            err => this.setState({ errors: err.response.data.errors })
        );
    }

    search(e, text){
        let searchText = '';
        if (e) searchText = e.target.value.toLowerCase();
        if (text) searchText = text;
        let cardsFound = [];
        if (searchText > '') {
            cardsFound = this.cardsAll.filter(i => i.cardName.toLowerCase().indexOf(searchText) > -1);
        } else {
            cardsFound = this.cardsAll;
        }
        // console.log(cardsFound, searchText);
        this.setState({ cards: cardsFound, searchText });
    }

    render(){
        const listsInBoard = this.state.lists.map((list, i)=>{
            return(
                <div key={i} className='list-container'>
                    <ListComponent 
                        cards={this.state.cards.filter(i => i.listId == list._id)}
                        listInfo={list}
                        canDrop={true}
                        onDrop={this.handleDrop.bind(this)}
                        // onDrop={item => this.handleDrop(card, list)} 
                        onDeleteList={this.handleDeleteList.bind(this)}
                        onReloadAllCards={this.reloadLists.bind(this)}
                    />                    
                </div>
            );
        });
        return (
            <div className='b-main'>
                <div className="panel-search">
                    <input name="search" value={this.state.searchText} placeholder="Search..." onChange={this.search.bind(this)} />
                    ({this.state.cards.length})
                </div>
                {listsInBoard}
                <div className='list-container'>
                    <a href="#" className='pull-left' onClick={this.addNewList.bind(this)} title="Add new List">
                        <i className={!this.state.addNewList ? "fa fa-plus fa-2x" : "fa fa-minus fa-2x"} aria-hidden="true"></i>
                    </a>
                    {this.state.addNewList && <AddListComponent />}
                </div>
            </div>            
        )
    }
}

// устанавливает листы для приема дропов
export default DragDropContext(HTML5Backend)(ListsComponent);
