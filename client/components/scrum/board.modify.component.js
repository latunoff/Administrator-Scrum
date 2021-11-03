import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Datetime from 'react-datetime' ;
import { boardBoards } from './../../data/api.service'; 
import FormField from './../common/form.field'; 
import { connect } from 'react-redux'; 
import { updateBoard } from './../../actions/board.actions'; 
import moment from 'moment';

class BoardModifyComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: props.showModal, 
            boardInfo: props.boardInfo, 
            errors: {}, 
            isLoading: false, 
            clickedName: false, 
            boards: []
        };
        this.close = this.close.bind(this) ;
        this.onChange = this.onChange.bind(this) ;
        this.onSubmit = this.onSubmit.bind(this) ;
    }
    
    componentDidMount() {
        // boardBoards(this.state.boardInfo.boardId).then(
        //     res=>{
        //         //this.setState({boardInfo: res.data.board}); 
        //         //this.props.setCurrentBoard(res.data.board);
        //         this.setState({
        //             boards: res.data.boards
        //         })
        //     },
        //     err=>{
        //         this.props.history.push('/scrum'); 
        //     }
        // ); 
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    onChange(e){
        let newBoardInfo = Object.assign({}, this.state.boardInfo); 
        newBoardInfo[e.target.name] = e.target.value;
        this.setState({boardInfo: newBoardInfo});
    }

    onSubmit(e){
        e.preventDefault();
        this.saveBoard(true);
    }

    onSubmitName(e){
        e.preventDefault();
        this.setState({clickedName:false});
    }

    saveBoard(redirect=false){
        const { boardInfo } = this.state;
        updateBoard(boardInfo._id, boardInfo)
        .then(
            res => {
                if (redirect) {
                    this.context.router.history.push('/board/'+boardInfo._id)
                }
            }, 
            err => {}
        )
    }

    editName(e){
        this.setState({clickedName:true}); 
    }

    dateChange(newDate){
       // e.preventDefault(); 
       //console.log(newDate._d);
        let newBoardInfo = Object.assign({}, this.state.boardInfo); 
        newBoardInfo['dateCreated'] = new Date(newDate._d);
        this.setState({boardInfo: newBoardInfo});
    }

    render(){        
        // console.log('render', this.state.boards);
        const optionBoards = [1,-1].map((board, i)=>{
            return(<option value={board._id} key={i} > {board.boardName} </option>);
        });

        return (
            <Modal show={this.state.showModal} onHide={this.close} className="show">
            <Modal.Header>
                    {!this.state.clickedName && <h4 onClick={this.editName.bind(this)}>Project: {this.state.boardInfo.boardName}</h4> }
                    {this.state.clickedName && <form onSubmit={this.onSubmitName.bind(this)}>
                        <div className='form-group head-group'>
                            <input className='form-control heading-card' 
                                type='text' 
                                name='boardName' 
                                value={this.state.boardInfo.boardName} 
                                onChange={this.onChange}
                                required='required'
                                autoFocus={true}
                                />
                            </div>
                    </form>}
                
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Name</label>
                        <input 
                            className='form-control' 
                            name='boardName' 
                            value={this.state.boardInfo.boardName}
                            onChange={this.onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Date created</label>
                        <Datetime 
                            // value={this.state.boardInfo.dateCreated}
                            // value={moment(this.state.boardInfo.dateCreated).format('M/D/YYYY H:m')}
                            value={moment(this.state.boardInfo.dateCreated).format('L LT')}
                            onChange={this.dateChange.bind(this)}
                        />
                    </div>
                    {/* <FormField 
                        type='select'
                        name='boardId'
                        onChange={this.onChange}
                        value={this.state.cardInfo.boardId}
                        options={optionBoards}
                        /> */}
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

BoardModifyComponent.contextTypes = {
        router: React.PropTypes.object.isRequired
}



export default connect(null,{ updateBoard })(BoardModifyComponent)

