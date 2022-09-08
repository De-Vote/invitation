import React, { useState } from 'react';
import { Form, Button, Container, Modal } from "react-bootstrap"
function App() {
  const [show, setShow] = useState(false);


  return (
    <>
      <Container style={{ marginTop: '5%',display: 'flex', alignItems:'center', justifyContent:'center'}}>
        <h3>Vote invitation subsystem</h3>
      </Container>
      <Container style={{ marginTop: '3%',display: 'flex', alignItems:'center', justifyContent:'center'}}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>invitation Code</Form.Label>
              <Form.Control type="text"  placeholder="invitation Code"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>new Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Example show={show} setShow={setShow}/>
          </Form>
      </Container>
      </>
  );
}

export default App;

function Example({show, setShow}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vote Account activate successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}