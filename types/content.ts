export type ContentType = "article" | "video" | "tweet";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  url: string;
  thumbnail?: string;
  isPinned: boolean;
  createdAt: Date;
  tags?: string[];
}

export interface AddContentForm {
  url: string;
  type: ContentType;
  title?: string;
  description?: string;
}
