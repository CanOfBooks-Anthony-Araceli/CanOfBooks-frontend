import React from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";


class BookFormModal extends React.Component {

    handleSubmit= (e) => {
        e.preventDefault();
        const newBook = {
            title: e.target.title.value,
            desc: e.target.desc.value,
            haveRead: e.target.haveRead.checked
        } 
        this.props.postBook(newBook);
    }

    render() {
        return (
            <>
                <Modal className="formModal" 
                    show={this.props.handleShow}
                    onHide={this.props.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Book!</Modal.Title>
                        </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" placeholder="Book title"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="desc">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Book description"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="haveRead">
                            <Form.Check type="checkbox" label='Have read' />
                        </Form.Group>
                        <Button type="submit" variant="primary" onClick={this.props.handleClose}>Submit book</Button>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default BookFormModal;