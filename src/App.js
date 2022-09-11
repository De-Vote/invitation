import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Modal } from "react-bootstrap"
function App() {
  const params = new URLSearchParams(window.location.search);
  const [show, setShow] = useState(false);
  const [vote_id,] = useState(params.get("vote_id"));
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if(!vote_id){
      alert("please assure you enter a right url abd try again!")
    }
  })

  async function invitation_query() {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,password
        }),
      };
      let result = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/invitation/${vote_id}`, requestOptions)
      let response = await result.json();
      if (result.status === 201){
        setResult(response)
        setShow(true)
      }
      console.log(response)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <Container style={{ marginTop: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3>Vote invitation subsystem</h3>
      </Container>
      <Container style={{ marginTop: '3%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>invitation Code</Form.Label>
            <Form.Control type="text" placeholder="invitation Code" value={code} onChange={(e)=>{setCode(e.target.value)}} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>new Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </Form.Group>
          <Example show={show} setShow={setShow} send={invitation_query} result={result}/>
        </Form>
      </Container>
    </>
  );
}

export default App;

function Example({ show, setShow, send, result }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={send}>
        Submit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vote Account activate successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{result?.message}</p>
          <p>your vote account username is :{result?.data?.data.attributes?.username}</p>
          <p>please store your vote account and password carefully</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}