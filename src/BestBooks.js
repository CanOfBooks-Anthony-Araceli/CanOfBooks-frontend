import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBook();
  }


  getBook = async () => {

    let url = `${process.env.REACT_APP_SERVER}/books`;

    try {
      let response = await axios.get(url);
      this.setState({
        books: response.data
      })
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {

    /* TODO: render all the books in a Carousel */


    return (
      <>

        {this.state.books.length ? (
          <Carousel fade>
            {this.state.books.map(book => 
             <Carousel.Item key={book._id}>
              <img 
              src='https://via.placeholder.com/1500x400.jpeg?text=Book+Image'
              alt={book.title}
              />
              <Carousel.Caption>
                <h3>Title: {book.title}</h3>
                <p>Description: {book.desc}</p>
              </Carousel.Caption>
             </Carousel.Item>
             )}
          </Carousel>
        ) : (
          <h3>Empty book collection</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
