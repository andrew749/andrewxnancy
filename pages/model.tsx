export interface EncryptedFrame {
    index: number,
    encoded: string,
    question: string,
}

export interface AnswerFrame {
    index: number,
    answer: string,
}

export type Datum = EncryptedFrame | AnswerFrame;