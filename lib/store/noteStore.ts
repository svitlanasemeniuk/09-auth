// lib/store/noteStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DraftNote {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: DraftNote;
  setDraft: (updates: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updates) =>
        set((state) => ({
          draft: { ...state.draft, ...updates },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
