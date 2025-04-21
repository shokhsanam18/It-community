import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions, explanations } from "../data/questions";

export const useQuestionStore = create(
  persist(
    (set, get) => ({
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

      handleSubmit: (navigate) => {
        const {
          answers,
          currentQuestionIndex,
          setShowModal,
          setShowFireworks,
          goNext,
        } = get();

        const question = questions[currentQuestionIndex];
        const userAnswer = answers[question.id];

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
    }),
    {
      name: "quiz-store", // key in localStorage
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
      }),
    }
  )
);
