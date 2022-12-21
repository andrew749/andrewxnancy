import React from "react";
import { Form, Button } from "react-bootstrap";
import QuestionBox from "./question-box";

export default function QuestionForm({encryptedFrames, passwordInputHandler}) {
    return (<div>
        <Form onSubmit={passwordInputHandler}>
            {encryptedFrames.map((_element, index) =>
                <QuestionBox key={index} index={index} encryptedFrames={encryptedFrames} />
            )} 
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>);
}