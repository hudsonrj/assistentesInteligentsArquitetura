export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  models: string[];
  features: string[];
  website?: string;
}

export interface Sector {
  id: string;
  name: string;
  applications: string[];
  benefits: string[];
  example: {
    company: string;
    results: string[];
  };
}

export interface CodeExample {
  id: string;
  title: string;
  category: string;
  language: string;
  code: string;
}

