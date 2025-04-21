import { create } from "zustand";
import { questions, explanations } from "../data/questions";

export const useQuestionStore = create((set, get) => ({
  currentQuestionIndex: 0,
  answers: {},
  showFireworks: false,
  showModal: false,
  currentExplanation: "",

  totalQuestions: questions.length,

  handleChange: (answer) => {
    const questionId = questions[get().currentQuestionIndex].id;
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },
  handleChange: (questionId, option) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: option,
      },
    }));
  },
  handleSubmit: (navigate) => {
    const {
      answers,
      currentQuestionIndex,
      setShowModal,
      setShowFireworks,
      goNext,
      selectedOption,
    } = get();

    const question = questions[currentQuestionIndex];
    const userAnswer = answers[question.id];
    answers[question.id] = selectedOption;

    if (!userAnswer) return false;

    if (userAnswer === question.correctAnswer) {
      setShowFireworks(true);
      setTimeout(() => {
        setShowFireworks(false);
        get().goNext(navigate);
      }, 2000);
    } else {
      set({
        currentExplanation:
          explanations[question.id] || "Check the rules in the FAQ.",
        showModal: true,
      });
    }

    return true;
  },

  goNext: (navigate) => {
    if (get().currentQuestionIndex < questions.length - 1) {
      set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }));
    } else {
      navigate("/Final", { state: { answers: get().answers } });
    }
  },

  setShowModal: (value) => set({ showModal: value }),
  setShowFireworks: (value) => set({ showFireworks: value }),
}));
