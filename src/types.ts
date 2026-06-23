export interface ServiceItem {
  id: string;
  title: string;
  problem: string;
  result: string;
  format: string;
  effect: string;
  metrics: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  industry: string;
  situation: string;
  solution: string;
  result: string;
  quote: string;
  stats?: { label: string; value: string }[];
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  challenges: string[];
  systemApproach: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  phone: string;
  company: string;
  industry: string;
  problem: string;
  contactType: "telegram" | "phone" | "email";
  contactDetail: string;
  timestamp: string;
}
