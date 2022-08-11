import {graphql} from 'react-apollo';
import React,{ Component } from 'react';
import { compose } from "recompose";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:'',
            genre:'',
            authorId:''

        }
    }
  renderAuthorNames() {
    let data = this.props.getAuthorsQuery;
    if(data.loading) {
      return(null);
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this)
    this.props.addBookMutation({
        variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
    });
  }
  render() {
    return (
      <div>
       <form name="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className='col-md-4'>
            <div className="mt-4 form-group">
                <label>Book Name: </label>
                <input type="text" className='input form-control' placeholder='Enter Book Name'
                onChange={(e) => this.setState({name: e.target.value})}></input>
            </div>

            <div className="mt-4 form-group">
                <label>Genre:  </label>
                <input type="text" className='input form-control' placeholder='Enter Genre'
                onChange={(e) => this.setState({genre: e.target.value})}></input>
            </div>
        
            <div className="mt-4 ">
                <label>Author Name:</label>
                <select className='form-select form-group' onChange={(e) => this.setState({authorId: e.target.value})}>
                  <option>Select Author Name</option>
                  {this.renderAuthorNames()}
                </select>
            </div>
  
            <button  type="submit" className="btn btn-primary mt-4"> + Add Book</button>

          
        </div>
       </form>
      </div> 
    );
  }
}

export default compose(
   graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
   graphql(addBookMutation, {name: "addBookMutation"})
   
)(AddBook);
  