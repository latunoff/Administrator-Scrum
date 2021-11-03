import React, { Component } from 'react' ;
import { listBoards } from './../../data/api.service';
import { deleteBoard } from './../../actions/board.actions';
import { Link } from 'react-router-dom';
import Confirm from '../common/confirm/confirm.component';
import moment from 'moment';
import Preloader from '../common/preloader/preloader.component';

class BoardListComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            loading: true,
            editing: false
        }
        
    }

    componentDidMount() {
		listBoards().then(
            res => {
                this.setState({boards: res.data.boards, loading: false});
            },
            err => {
                this.props.history.push('/login');
            }
        ); 
    }
    
    onDeleteBoard(id) {
        //console.log('onDeleteBoard', id , this);
        deleteBoard({_id: id}).then(
            res => {
                console.log(res.data);
                const boards = this.state.boards.filter((i) => i._id != id);
                this.setState({ boards });
                //this.setState({boards: res.data.boards});
            },
            err => {
                console.log('onDelete Error', err);
                this.props.history.push('/home');
            }
        );
    }

    onEdit(e){
        e.preventDefault();
        this.setState({ editing: !this.state.editing });
    }

    render(){
        const boards = [...this.state.boards, ...this.props.newBoards].reverse().map((board, i)=>{

            return (
                <tr key={i}>
                    <td><Link to={'/board/'+board._id} >{board.boardName}</Link></td>
                    <td>{moment(board.dateCreated).format('LLL')}</td>
                    {/* <td>{board.noOfLists}</td> */}
                    <td>
                        {/* <i className="fa fa-edit pointer left blue" aria-hidden="true" onClick={this.onEdit.bind(this)}></i> */}
                    </td>
                    <td>
                        <Confirm
                            onConfirm={this.onDeleteBoard.bind(this, board._id)}
                            body="Are you sure you want to delete Board?"
                            confirmText="Delete"
                            className="show"
                            dialogClassName=""
                            backdrop={true}
                            title="Delete Board">
                            <i className="fa fa-trash fa-2x pointer" aria-hidden="true" title="Delete Board"></i>
                        </Confirm>
                    </td>
                </tr>
            );
        });
/*
<i className="fa fa-trash fa-2x pointer" aria-hidden="true" onClick={() => this.onDelete(board._id)}></i>
*/
        return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created</th>
                    {/* <th>Lists</th> */}
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.loading ? <Preloader /> : boards}
            </tbody>
        </table>

        )
    }
}

export default BoardListComponent