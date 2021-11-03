import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Datetime from 'react-datetime' ;
import { listLists } from './../../data/api.service'; 
import FormField from './../common/form.field'; 
import { connect } from 'react-redux'; 
import { updateList } from './../../actions/list.actions'; 
import moment from 'moment';

class ListModifyComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal: props.showModal, 
            listInfo: props.listInfo, 
            errors: {}, 
            isLoading: false, 
            clickedName: false, 
            lists: []
        };
        this.close = this.close.bind(this) ;
        this.onChange = this.onChange.bind(this) ;
        this.onSubmit = this.onSubmit.bind(this) ;
    }
    
    componentDidMount() {
        // listLists(this.state.listInfo.boardId).then(
        //     res=>{
        //         //this.setState({boardInfo: res.data.board}); 
        //         //this.props.setCurrentBoard(res.data.board);
        //         this.setState({
        //             lists: res.data.lists
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
        let newListInfo = Object.assign({}, this.state.listInfo); 
        newListInfo[e.target.name] = e.target.value;
        this.setState({listInfo: newListInfo});
    }

    onSubmit(e){
        e.preventDefault();
        this.saveList(true);
        this.close();
    }

    onSubmitName(e){
        e.preventDefault();
        this.setState({clickedName:false});
    }

    saveList(redirect=false){
        const { listInfo } = this.state;
        updateList(listInfo._id, listInfo)
        .then(
            res => {
                this.props.onListSaved();
                if (redirect) {
                    // this.context.router.history.push('/board/'+listInfo.boardId)
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
        let newListInfo = Object.assign({}, this.state.listInfo); 
        newListInfo['dateCreated'] = new Date(newDate._d);
        this.setState({listInfo: newListInfo});
    }

    render(){        
        // console.log('render', this.state.lists);
        const optionLists = [{ 'value': 1, 'name': 'Ascending date' },
                             { value: -1, 'name': 'Descending date' },
                            ].map((e, i)=>{
            return(<option value={e.value} key={i} > {e.name} </option>);
        });

        return (
            <Modal show={this.state.showModal} onHide={this.close} className="show">
            <Modal.Header>
                    {!this.state.clickedName && <h4 onClick={this.editName.bind(this)}>List editing: {this.state.listInfo.listName}</h4> }
                    {this.state.clickedName && <form onSubmit={this.onSubmitName.bind(this)}>
                        <div className='form-group head-group'>
                            <input className='form-control heading-card' 
                                type='text' 
                                name='listName' 
                                value={this.state.listInfo.listName} 
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
                            name='listName' 
                            value={this.state.listInfo.listName}
                            onChange={this.onChange} />
                    </div>
                    <div className='form-group'>
                        <label>Date created</label>
                        <Datetime 
                            // value={this.state.listInfo.dateCreated}
                            // value={moment(this.state.listInfo.dateCreated).format('M/D/YYYY H:m')}
                            value={moment(this.state.listInfo.dateCreated).format('L LT')}
                            onChange={this.dateChange.bind(this)}
                        />
                    </div>
                    <FormField 
                        type='select'
                        name='cardsOrder'
                        onChange={this.onChange}
                        value={this.state.listInfo.cardsOrder}
                        options={optionLists}
                        />
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

ListModifyComponent.contextTypes = {
        router: React.PropTypes.object.isRequired
}



export default connect(null,{ updateList })(ListModifyComponent)

