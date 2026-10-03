/**
 * Knweave wiki — domain types.
 *
 * A wiki is a flat map of pages plus a list of sections. Pages reference
 * their parent page and section by id, so the tree is derived, not stored.
 */

export type Visibility = "public" | "tim" | "privat";

export interface WikiPage {
  id: string;
  title: string;
  /** parent page id, or null if this page sits directly under a section */
  parentId: string | null;
  sectionId: string;
  /** markdown body */
  content: string;
  visibility: Visibility;
  starred: boolean;
  tags: string[];
  updatedAt: string; // ISO
  updatedBy: string;
  /** optional leading emoji icon */
  icon?: string;
}

export interface WikiSection {
  id: string;
  title: string;
  expanded: boolean;
}

export interface HistoryEntry {
  pageId: string;
  at: string; // ISO
  by: string;
  summary: string;
}

export interface WikiState {
  sections: WikiSection[];
  pages: Record<string, WikiPage>;
  activePageId: string;
  history: HistoryEntry[];
}

export const VISIBILITY_LABELS: Record<Visibility, string> = {
  public: "Tautan Publik",
  tim: "Tim",
  privat: "Privat",
};
