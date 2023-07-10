import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Input(props) {
  console.log('Input Component called');

  return (
    <Form.Group className={props.className} controlId={props.controlId}>
      <Form.Label>{props.text}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Form.Group>
  );
}

export default Input;
