
export enum AnswerStatus {
  UNCHECKED = 'UNCHECKED',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}

export interface Question {
  id: number;
  correctAnswers: string[];
  userAnswer: string;
  status: AnswerStatus;
}
