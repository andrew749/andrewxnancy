import { Form } from "react-bootstrap";
import React from 'react';

type QuestionBoxProps = { index, encryptedFrames, ref, enabled: boolean }

export const QuestionBox = React.forwardRef<HTMLInputElement, QuestionBoxProps>((props, ref) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicAnswer">
            <Form.Label>{props.encryptedFrames[props.index].question}</Form.Label>
            <Form.Control name={props.index} disabled={!props.enabled} ref={ref} type="answer" placeholder="Answer" />
        </Form.Group>
    );
})