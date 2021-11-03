import React, { Component } from 'react' ;
import ListsComponent from './lists.component';
import { listOneBoard } from './../../data/api.service'; 
import { connect } from 'react-redux'; 
import { setCurrentBoard } from './../../actions/board.actions'; 
import Confirm from '../common/confirm/confirm.component';
import BoardModifyComponent from './board.modify.component';

class BoardComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            boardInfo: {},
            boardId: props.match.params.id,
            editing: false
        }
    }

    componentDidMount(){
		listOneBoard(this.props.match.params.id).then(
            res=>{
                this.setState({boardInfo: res.data.board});
                this.props.setCurrentBoard(res.data.board);
                document.querySelectorAll('.appear').forEach(item => { item.classList.add('show'); });
            },
            err=>{
                this.props.history.push('/scrum'); 
            }
        ); 
    }
    
    deleteBoard(){
        console.log('deleteBoard', this);
    }

    onEdit(e){
        e.preventDefault();
        this.setState({ editing: !this.state.editing });
    }
    
    render(){
        return (
            <div className='board-content'>
                <div className='board-content-wrap'>
                    <div className='board-content-full'>
                        <div className='b-header'>
                            <h2 className="appear left">{this.state.boardInfo.boardName}</h2>
                            <div className='right'>
                                <i className="fa fa-edit fa-2x pointer blue" aria-hidden="true" onClick={this.onEdit.bind(this)} title="Edit Project"></i>
                                &nbsp;&nbsp;&nbsp;
                                <Confirm
                                    onConfirm={this.deleteBoard.bind(this)}
                                    body="Are you sure you want to delete Task?"
                                    confirmText="Delete"
                                    className="show"
                                    dialogClassName=""
                                    backdrop={true}
                                    title="Delete Board">
                                    <i className="fa fa-trash fa-2x pointer" aria-hidden="true" title="Delete Task"></i>
                                </Confirm>
                            </div>
                        </div>
                        {this.state.editing && 
                        <BoardModifyComponent 
                            boardInfo={this.state.boardInfo} 
                            showModal={this.state.editing}
                        />}
                        <div className='b-container'>
                            <ListsComponent boardId={this.state.boardId}/>                            
                        </div>
                    </div>
                    <div className='board-content-menu hide'></div>
                </div>
            </div>
        )
    }
}
BoardComponent.propTypes = {
    setCurrentBoard: React.PropTypes.func.isRequired
}

export default connect(null, { setCurrentBoard })(BoardComponent)