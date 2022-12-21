import { Form } from "react-bootstrap";
import React from 'react';

export default function QuestionBox({ index, encryptedFrames }) {
    return (
        <Form.Group className="mb-3" controlId="formBasicAnswer">
            <Form.Label>{encryptedFrames[index].question}</Form.Label>
            <Form.Control name={index} type="answer" placeholder="Answer" />
        </Form.Group>
    );
}