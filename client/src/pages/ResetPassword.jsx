import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await axios.get(`api/password?email=${email}`);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">Reset Password</h1>
      <Form onSubmit={handleSubmit} style={{ width: 300 }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form.Group>
      </Form>
      <Link to="/">Go back</Link>
    </Container>
  );
};

export default ResetPassword;
