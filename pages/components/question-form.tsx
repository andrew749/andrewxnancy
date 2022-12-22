import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import QuestionBox from "./question-box";
import { AnswerFrame, Datum, EncryptedFrame } from "../../util/model";

type InputType = {encryptedFrames: Array<Datum>, passwordInputHandler: any};

function isEncryptedFrame(x: Datum): x is EncryptedFrame {
    return x["encoded"];
}

export default function QuestionForm({encryptedFrames = [], passwordInputHandler = () => {}}: InputType)  {
    const refs = encryptedFrames.map(() => React.createRef<HTMLInputElement>());
    useEffect(() => {
        refs.at(encryptedFrames.length - 1)?.current?.focus();
    }, [encryptedFrames]);
    return (<div>
        <Form onSubmit={passwordInputHandler}>
            {encryptedFrames.filter(isEncryptedFrame).map((_element, index, _array) =>{
                return <QuestionBox key={index} enabled={_element.index == _array.at(-1).index} ref={refs.at(index)} index={index} encryptedFrames={_array} />
            }
            )} 
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>);
}