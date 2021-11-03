import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { createList } from './../../actions/list.actions'; 
import FormField from './../common/form.field'; 

class AddListComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            listName: '', 
            boardId: '', 
            errors: {}, 
            isLoading: false
        };
        this.onChange = this.onChange.bind(this) ;
        this.onSubmit = this.onSubmit.bind(this) ;
    }
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const listInfo = this.state; 

        const { boardInfo, createList } = this.props; 
        listInfo.boardId = boardInfo._id;
        listInfo.cardsOrder = 1;
        // console.log(listInfo);
        createList(listInfo).then(
            res => {
                this.context.router.history.push('/board/'+boardInfo._id)
            },            
            err => {
                this.setState({ errors: err.response.data.errors });
            }
        ); 
        
    }

    render(){
       

        return (
            <div className="panel panel-default list-main">
                <div className="panel-heading">
                     <form onSubmit={this.onSubmit}>
                        <FormField 
                            type='text' 
                            name='listName' 
                            value={this.state.listName} 
                            onChange={this.onChange}
                            errors={this.state.errors.listName}
                            required='required'
                            placeholder='New List...'/>
                        <FormField 
                            label='Add' 
                            type='button'
                            btnClass='btn-primary'
                            loading={this.state.isLoading}
                            disabledItems={this.state.isLoading} 
                            />
                    </form> 
                </div>
                <div className="panel-body">
                    <div className="list-group cards-list">
                        
                    </div>
                </div>
            </div>
        )
    }
}
AddListComponent.propTypes = {
    createList: React.PropTypes.func.isRequired, 
    boardInfo: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        boardInfo : state.board.currentBoard
    }
}


AddListComponent.contextTypes = {
        router: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, { createList })(AddListComponent)