import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import BookUpdateModal from './BookUpdateModal';
import { Container } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdateModal: false,
      bookToUpdate: {}
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.getBook();
  }


  getBook = async () => {

    let url = `${process.env.REACT_APP_SERVER}/books`;

    try {
      if (this.props.auth0.isAuthenticated){
        const response = await this.props.auth0.getIdTokenClaims();
        const jwt = response.__raw;
        const config = {
          headers: {"Authorization": `bearer ${jwt}`}, 
          method: 'get', 
          url: url
        }
        const bookData = await axios(config)
        this.setState({
          books: bookData.data
        })
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  postBook = async (newBook) => {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    
    try {
      if (this.props.auth0.isAuthenticated){
        const response = await this.props.auth0.getIdTokenClaims();
        const jwt = response.__raw;
        const config = {
          headers: {"Authorization": `bearer ${jwt}`}, 
        }
        const bookData = await axios.post(url, newBook, config)
        this.setState({
            books: [...this.state.books, bookData.data]
        })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  deleteBook = async (_id) => {
    let url = `${process.env.REACT_APP_SERVER}/books/${_id}`;

  try{
  if (this.props.auth0.isAuthenticated){
    const response = await this.props.auth0.getIdTokenClaims();
    const jwt = response.__raw;
    const config = {
      headers: {"Authorization": `bearer ${jwt}`}, 
    }
    await axios.delete(url, config)
    let updatedBooks = this.state.books.filter(book => book._id !== _id);
    this.setState({
      books: updatedBooks
    })
  }
}
  catch (error) {
    console.error(error)
  }
  }

  putBook = async (updatedBooks) => {
    let url = `${process.env.REACT_APP_SERVER}/books/${updatedBooks._id}`;

    try{
    if (this.props.auth0.isAuthenticated){
      const response = await this.props.auth0.getIdTokenClaims();
      const jwt = response.__raw;
      const config = {
        headers: {"Authorization": `bearer ${jwt}`}, 
      }
      await axios.put(url, updatedBooks, config)
      const updatedBooksArr = this.state.books.map(oldBook => updatedBooks._id === oldBook._id ? updatedBooks : oldBook);
      this.setState({
        books: updatedBooksArr
      })
    }
  }
    catch (error) {
      console.error(error);
    }
  }


  showModal = () => {
    this.setState({
     showModal: true
    });
  };

  showUpdateModal = (book) => {
    this.setState({
     showUpdateModal: true,
     bookToUpdate: book
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleCloseUpdateModal = () => {
    this.setState({
      showUpdateModal: false
    });
  };


  render() {

    /* TODO: render all the books in a Carousel */
    return (
      <>
        {this.state.books.length ? (
          <Container className='carouselContainer'>
            <Carousel className="bookCarousel" fade>
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
                  <img
                    src="https://via.placeholder.com/1500x400.jpeg?text=Book+Image"
                    alt={book.title}
                  />
                  <Carousel.Caption>
                    <h3>Title: {book.title}</h3>
                    <p>Description: {book.desc}</p>
                    <Button
                      className='updateBook'
                      variant="success"
                      onClick={() => this.showUpdateModal(book)}
                      type="button"
                    >
                      Update Book
                    </Button>
                    <Button
                      className='deleteBook'
                      variant="danger"
                      onClick={() => this.deleteBook(book._id)}
                      type="button"
                    >
                      Delete book
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        ) : (
          <h3>Empty book collection</h3>
        )}

        <Button className='addBook' variant="primary" onClick={this.showModal} type="button">
          Add Book
        </Button>
        <BookFormModal
          handleShow={this.state.showModal}
          handleClose={this.handleCloseModal}
          postBook={this.postBook}
        />
        <BookUpdateModal
          handleShow={this.state.showUpdateModal}
          handleClose={this.handleCloseUpdateModal}
          putBook={this.putBook}
          bookToUpdate={this.state.bookToUpdate}
        />
      </>
    );
  }
}

export default withAuth0(BestBooks);
