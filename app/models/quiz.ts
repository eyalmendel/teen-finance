import { StringKey } from '@config/strings';

export type QuestionAnswerTuple = {
    question: string;
    correctAnswer: string;
};

export type Question = {
    id: number;
    title: string;
    possibleAnswers: string[];
    correctAnswerId: number;
    explanation?: string;
};

export type Quiz = {
    id: number;
    subject: StringKey;
    questions: Question[];
};
