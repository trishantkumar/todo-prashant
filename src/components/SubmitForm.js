import React from 'react';
import './SubmitForm.css';
class SubmitForm extends React.Component{
    componentDidMount() {
      this.fetchUserData();  
    }
    constructor(props){
        super(props);
        this.state = { 
            tasksCount: 0,
            data: [],
            pageNo: 1,
            page: '',
            totalPages: ''
            };

        this.addItem = this.addItem.bind(this);
    }

    fetchUserData() {
        console.log("this.state.pageNo", this.state.pageNo)
        this.setState ({data: []})
        this.url = "https://reqres.in/api/users?page="+this.state.pageNo
        fetch(this.url)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    data: result.data,
                    page: result.page,
                    totalPages: result.total_pages
                })
                console.log("this.state.data", this.state.data)
            },
            (error) => {
                console.log(error)
            }
          )
    }

    nextPage() {
        console.log("next.." )
        if(this.state.pageNo <= this.state.totalPages){
            console.log("if.." )
            this.setState ({pageNo : this.state.pageNo + 1})
            console.log("this.state.pageNo", this.state.pageNo, this.state.totalPages)
            this.fetchUserData();
        }
    }

    prevPage() {
        console.log("prev.." )
        if(this.state.pageNo > 1){
            this.setState ({pageNo : this.state.pageNo - 1})
            this.fetchUserData();
        }
    }

    addItem(e) {
        // var keyPressed = e.keyCode || e.which;
       
            

        if (this._inputElement.value !== "") {
          
            var newItem = {
              text: this._inputElement.value,
              id: this.state.tasksCount,
              key: Date.now()
            };

            this.props.addTask(newItem);

            this.setState({ tasksCount:  this.tasksCount + 1});
            this._inputElement.value = "";
        }
    
        
             
        e.preventDefault();
    }

    render(){
        return (
            <>
            <div className='form'>
                <form onSubmit={this.addItem}>
                <input className='input' ref={(a) => this._inputElement = a} placeholder='Add Task' />
                    <button className='add-button' type='submit'>Add</button>
                </form>
            </div>
            <div > 
                {
                    this.state.data !== null && this.state.data.map((user, index) => {
                        return(
                            <div className="row">
                                < div className="column">
                                    <div className="card">
                                      
                                     <div key={index}>
                                    <img className = "avtar" src={(user.avatar)} alt=""/>
                                    <div><span>{user.id}</span> 
                                   <div className="title"> <span >{ user.first_name} { user.last_name}</span></div>
                                    <span >{ user.email}</span>
                                    </div>
                                    </div></div>
                                </div>
                            </div>
                            
                        )
                    })
                }
            </div>
            <button class="previous"  onClick={() => this.prevPage()}>&#8249;</button>
            <button  class="next" onClick={() => this.nextPage()}>&#8250;</button>
            </>
        );
    }
}
export default SubmitForm;