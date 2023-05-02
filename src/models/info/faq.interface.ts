export interface FaqSection {
  question: string;
  answer: string;
}

export interface FaqResponse {
  results: [FaqSection];
}
