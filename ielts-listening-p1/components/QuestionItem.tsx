
import React from 'react';
import { Question, AnswerStatus } from '../types';

interface QuestionItemProps {
  question: Question;
  onChange: (id: number, value: string) => void;
  showAnswers: boolean;
  label: string;
  number: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inline?: boolean;
}

const getBorderColor = (status: AnswerStatus) => {
    switch (status) {
        case AnswerStatus.CORRECT:
            return 'border-green-500 focus:ring-green-500';
        case AnswerStatus.INCORRECT:
            return 'border-red-500 focus:ring-red-500';
        default:
            return 'border-gray-300 focus:ring-blue-500';
    }
};

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const QuestionItem: React.FC<QuestionItemProps> = ({ question, onChange, showAnswers, label, number, prefix, suffix, inline = false }) => {
    const borderColor = getBorderColor(showAnswers ? question.status : AnswerStatus.UNCHECKED);
    const isIncorrect = showAnswers && question.status === AnswerStatus.INCORRECT;

    const inputComponent = (
        <div className="relative flex-grow w-full">
            <div className="flex items-center">
                {prefix && <span className="text-gray-600 mr-2">{prefix}</span>}
                <div className="flex items-center bg-blue-500 text-white rounded-full w-6 h-6 justify-center text-sm font-bold mr-3 flex-shrink-0">{number}</div>
                <input
                    id={`q${question.id}`}
                    type="text"
                    value={question.userAnswer}
                    onChange={(e) => onChange(question.id, e.target.value)}
                    className={`block w-full px-3 py-2 text-gray-800 bg-white rounded-md border-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ${borderColor}`}
                />
                {suffix && <span className="text-gray-600 ml-2">{suffix}</span>}
                 {showAnswers && question.status === AnswerStatus.CORRECT && (
                    <CheckIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {showAnswers && question.status === AnswerStatus.INCORRECT && (
                    <CrossIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
            </div>
            {isIncorrect && (
                <div className="mt-1 text-sm text-green-600 font-semibold pl-11">
                    Correct answer: {question.correctAnswers[0]}
                </div>
            )}
        </div>
    );

    if (inline) {
        return inputComponent;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 items-center">
            <div className="md:col-span-1 font-medium text-gray-600">{label}</div>
            <div className="md:col-span-2">
                {inputComponent}
            </div>
        </div>
    );
};

export default QuestionItem;
