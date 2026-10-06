// Inline text supports `code` (rendered LTR, for English terms/formulas)
// and **bold**.
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "formula"; lines: string[] }
  // `ltr` for matrices / numeric tables that read left-to-right.
  | { type: "table"; head: string[]; rows: string[][]; ltr?: boolean }
  | { type: "note"; text: string }
  | { type: "example"; text: string };

export type Idea = {
  title: string;
  en?: string;
  blocks: Block[];
};

export type Law = {
  name: string;
  formula: string[];
  explain: string;
  example?: string;
};

export type Mcq = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

// Exam-style worked problem: the solution is hidden until revealed.
export type Exercise = {
  title: string;
  problem: Block[];
  solution: Block[];
  answer: string;
};

// Shared data (a table / matrix) that several exam questions refer to.
export type ExamContext = {
  id: string;
  title: string;
  blocks: Block[];
};

export type ExamQuestion = {
  n: number;
  q: string;
  options: string[];
  answer: number;
  lecture: number;
  // Title of the lecture idea this question comes from.
  idea: string;
  context?: string;
  solution: Block[];
  // Common trap / what students got wrong.
  trap?: string;
};

export type Exam = {
  slug: string;
  title: string;
  subtitle: string;
  note: string;
  contexts: ExamContext[];
  questions: ExamQuestion[];
};

export type Lecture = {
  n: number;
  title: string;
  en: string;
  summary: string;
  ideas: Idea[];
  laws: Law[];
  shortcuts: string[];
  mcq: Mcq[];
  exercises?: Exercise[];
};
