
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  image?: string; // URL for a representative photo
}

export interface LoveReason {
  id: number;
  text: string;
  image?: string;
}
