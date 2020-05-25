import React, { Component } from "react";
import axios from 'axios';
// import { Route } from "react-router";


class App extends Component {

  state = {
    searchTerm: '',
    books: []
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchTerm)
      .then((result) => {
        console.log(result);

        this.setState({ books: result.data.items })
        
      })
  }

  saveBook = (book) => {
    axios({
      method: "post",
      url: "/save",
      data: book
      //^ or can be body if doesnt work
    })
      .then(
        console.log
      )
      .catch(
        console.log
      )
  }

  handleSaved = () => {
    axios("/saved")
    .then(console.log)
    .catch(console.log)
    this.pageSwitch()
  }

  pageSwitch = () => {
    if (this.handleSaved){
      console.log("SAVED");
      
    } else {
      console.log("BOOKS");
      
    }
  }

  render() {
    return (

      <div className="containter">
        <div className="jumbotron jumbotron-fluid shadow text-center" onSubmit={this.handleSubmit}>
          <button
            className="btn btn-lg btn-outline-secondary mx-5"
            type="button"
            data-toggle="collapse"
            data-target="#searchCollapse"
            aria-expanded="false"
            aria-controls="searchCollapse"
          >
            Search
          </button>
          <button className="btn btn-lg btn-outline-secondary m-5" onClick={this.handleSaved}>
            Saved
          </button>
          <div className="container collapse" id="searchCollapse">
            <form id="search-form" name="searchForm">
              <section>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="searchTerm"
                    className="form-control"
                    placeholder="Search For Book Here"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Search</button>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
        <div className="card-columns m-4">
          
          {this.state.books.map((book) => (

            <div className="card shadow">
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
              <img className="card-img-top " src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              </a>
              <div className="card-body">
                <h5 className="card-title font-weight-bolder">{book.volumeInfo.title}</h5>
                <p className="card-text"><small>{book.volumeInfo.description}</small></p>
                <p className="card-text font-weight-bolder">{book.volumeInfo.authors.join(', ')}</p>
              </div>
              <div class="card-footer">
                <button type="submit" className="btn btn-success" onClick={() => this.saveBook(book)}>Save Book</button>
              </div>
            </div>

          ))}
        </div>
      </div>

    );
  }
}

export default App;
