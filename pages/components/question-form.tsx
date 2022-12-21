import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {QuestionBox} from "./question-box";
import { Datum } from "./model";

type InputType = {encryptedFrames: Array<Datum>, passwordInputHandler: any};

export default function QuestionForm({encryptedFrames, passwordInputHandler}: InputType)  {
    const refs = encryptedFrames.map(() => React.createRef<HTMLInputElement>());
    useEffect(() => {
        refs.at(encryptedFrames.length - 1)?.current?.focus();
    }, [encryptedFrames]);
    return (<div>
        <Form onSubmit={passwordInputHandler}>
            {encryptedFrames.map((_element, index, _array) =>
                <QuestionBox key={index} enabled={encryptedFrames.length > index} ref={refs.at(index)} index={index} encryptedFrames={encryptedFrames} />
            )} 
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>);
}