export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  name: string;
  startDate: string;
  duration: number;
  owner: string;
}

export interface Stakeholder {
  role: string;
  responsibility: string;
}

export interface Risk {
  risk: string;
  impact: string;
  mitigation: string;
}

export interface BudgetString {
  item: string;
  cost: number;
  source: string;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}