import { Form } from "react-bootstrap";
import React from 'react';
import { Datum, EncryptedFrame } from "../../util/model";

type QuestionBoxProps = { index: number, encryptedFrames: Array<EncryptedFrame>, enabled: boolean }

const QuestionBox = React.forwardRef<HTMLInputElement, QuestionBoxProps>((props = {index: 0, encryptedFrames: [], enabled: true}, ref = null) => {
    return props.encryptedFrames && props.encryptedFrames.length && (
        <Form.Group className="mb-3" controlId="formBasicAnswer">
            <Form.Label>{props.encryptedFrames[props.index].question}</Form.Label>
            <Form.Control name={`${props.index}`} disabled={!props.enabled} ref={ref} type="answer" placeholder="Answer" />
        </Form.Group>
    );
})

export default QuestionBox;