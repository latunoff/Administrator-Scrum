import React, { Component } from 'react' ;
import ListComponent from './list.component';
import AddListComponent from './add.list.component';
import { listLists } from './../../data/api.service'; 
import { connect } from 'react-redux'; 
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class ListsComponent extends Component{
    constructor(props){
        super(props);
        //console.log('in cons ', props); 
        this.state = {
            boardId: props.boardId,
            lists:[                 
            ]
        };
        //exit(); 
    }

    componentDidMount() {
        listLists(this.state.boardId).then(
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

    handleDrop(list) {
        //const { name } =;
        console.log('dropped in', list); 

        
    }

    render(){
        const listsInBoard = this.state.lists.map((list, i)=>{
            return(
                <div key={i} className='list-container'>
                    <ListComponent listInfo={list} canDrop={true} onDrop={item => this.handleDrop(list)} />                    
                </div>
            );
        });
        return (
            <div className='b-main'>
                {listsInBoard}
                <div className='list-container'>
                    <AddListComponent />
                </div>
            </div>            
        )
    }
}

export default DragDropContext(HTML5Backend)(ListsComponent);
