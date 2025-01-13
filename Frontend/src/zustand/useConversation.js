import { create } from "zustand";

const useConversation = create((set) => ({
  selectConversation: null,
  setSelectConversation: (selectConversation) => set({ selectConversation }),
  messages: [],
  setMessage: (messages) => set({ messages }),
}));

export default useConversation;
