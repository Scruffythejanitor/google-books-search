import React, { Component } from "react";
import axios from 'axios'


class App extends Component {

  state = {
    searchTerm: '',
    books: []
  }

  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState({ [name]: value});

  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchTerm)
      .then((result)=>{
        console.log(result);
        
        this.setState({books: result.data.items})
      })
  }

  render() {
    return (
      
        <div className="containter" onSubmit={this.handleSubmit}>
          <div className="jumbotron shadow"></div>
          <form id="search-form" name="searchForm">
            <section>
              <input 
                type="text" 
                name="searchTerm" 
                placeholder="some texty text" 
                value={this.state.searchTerm}
                onChange={this.handleChange}
                />
            </section>
            <section>
              <button>Search</button>
            </section>
            </form>
            <div>
              {this.state.books.map((book)=>(
                <div className="card">
                  <div className="card-body">Title: {book.volumeInfo.title}</div>
                  <div className="card-body">Author(s): {book.volumeInfo.authors.join(', ')}</div>
                </div>
              ))}
            </div>
        </div>
      
    );
  }
}

export default App;
