export interface FaqSection {
  question: string;
  answer: string;
  questionNumber: number;
}

export interface FaqResponse {
  results: FaqSection[];
}
