import {graphql} from 'react-apollo';
import React,{ Component } from 'react';
import { compose } from "recompose";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  renderBook() {
    let data = this.props.data;
    if(data.loading) {
      return(<p>Loding Books</p>);
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }
  render() {
    console.log(this.props.data);
    return (
      <div>
        <ul id="book-list">
            {this.renderBook()}
        </ul>
      </div>
    );
  }
}

export default compose(
   graphql(getBooksQuery)
)(BookList);
  