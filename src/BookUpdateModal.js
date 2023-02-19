import React from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

class BookUpdateModal extends React.Component {

handleUpdate = (e) => {
    e.preventDefault()
    const updatedBook = {
        title: e.target.updateTitle.value || this.props.bookToUpdate.title,
        desc: e.target.updateDesc.value || this.props.bookToUpdate.desc,
        haveRead: e.target.updateHaveRead.checked,
        _id: this.props.bookToUpdate._id
    }
    console.log(updatedBook)
    this.props.putBook(updatedBook)
}

render() {
    return (
        <>
            <Modal className="updateModal" 
                show={this.props.handleShow}
                onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update your Book!</Modal.Title>
                    </Modal.Header>
                <Form onSubmit={this.handleUpdate}>
                    <Form.Group controlId="updateTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder={this.props.bookToUpdate.title}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="updateDesc">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder={this.props.bookToUpdate.desc}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="updateHaveRead">
                        <Form.Check type="checkbox" label='Have read' />
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={this.props.handleClose}>Update book</Button>
                </Form>
            </Modal>
        </>
    )
}
}

export default BookUpdateModal;
