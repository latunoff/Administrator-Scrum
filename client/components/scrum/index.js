import React, { Component } from 'react';
import AddBoardComponent from './addboards.component';
import BoardListComponent from './board.list.component';
import moment from 'moment';

export default class ScrumComponent extends Component {
    constructor(){
        super();
        this.state = {
            newBoards: []
        }
    }
    
    onAddBoard(newBoard){
        newBoard.noOfLists = 0;
        newBoard.dateCreated = Date();//moment().format('LLL');
        this.state.newBoards.push(newBoard);
        this.setState({
            newBoards: this.state.newBoards
        });
        //console.log('onAddBoard', newBoard);
    }

    render(){
        return(
            <div className='row'>

                <AddBoardComponent onAddBoard={this.onAddBoard.bind(this)} />
                <div className='col-md-12'>
                    <h3>Projects</h3>
                    <BoardListComponent newBoards={this.state.newBoards} />
                </div>
                
            </div>
        );
    }
}
