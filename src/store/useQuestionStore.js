import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions as originalQuestions, explanations } from "../data/questions";

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const useQuestionStore = create(
  persist(
    (set, get) => ({
      currentQuestionIndex: 0,
      answers: {},
      showFireworks: false,
      showModal: false,
      currentExplanation: "",
      questions: [],
      totalQuestions: 0,

      initializeQuiz: () => {
        const shuffledQuestions = shuffleArray(originalQuestions).map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));

        set({
          questions: shuffledQuestions,
          totalQuestions: shuffledQuestions.length,
          currentQuestionIndex: 0,
          answers: {},
        });
      },

      handleChange: (answer) => {
        const questionId = get().questions[get().currentQuestionIndex].id;
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        }));
      },

      handleSubmit: (navigate) => {
        const {
          answers,
          currentQuestionIndex,
          questions,
          setShowModal,
          setShowFireworks,
          goNext,
        } = get();
      
        const question = questions[currentQuestionIndex];
        const userAnswer = answers[question.id];
      
        if (!userAnswer) return false;
      
        if (userAnswer === question.correctAnswer) {
          const audio = new Audio("./clapping.wav");
          audio.volume = 0.8;
          audio.play();
      
          setShowFireworks(true);
      
          const CELEBRATION_DURATION = 4000;
          const FADE_DURATION = 1000;
          const fadeStep = 50;
      
          // Start fading out 1s before the end
          setTimeout(() => {
            const fadeInterval = setInterval(() => {
              if (audio.volume > 0.05) {
                audio.volume -= 0.05;
              } else {
                clearInterval(fadeInterval);
                audio.pause();
                audio.currentTime = 0;
              }
            }, fadeStep);
          }, CELEBRATION_DURATION - FADE_DURATION);
      
          // Go to next question after confetti and fade-out
          setTimeout(() => {
            setShowFireworks(false);
            goNext(navigate);
          }, CELEBRATION_DURATION);
        } else {
          set({
            currentExplanation: explanations[question.id] || "Check the rules in the FAQ.",
            showModal: true,
          });
        }
      
        return true;
      },

      goNext: (navigate) => {
        const { currentQuestionIndex, questions, answers } = get();
        const isLast = currentQuestionIndex >= questions.length - 1;

        if (!isLast) {
          set((state) => ({
            currentQuestionIndex: state.currentQuestionIndex + 1,
          }));
          return;
        }

        const allCorrect = questions.every(
          (q) => answers[q.id] === q.correctAnswer
        );

        if (allCorrect) {
          navigate("/final");
        } else {
          navigate("/tryagain");
        }
      },

      setShowModal: (value) => set({ showModal: value }),
      setShowFireworks: (value) => set({ showFireworks: value }),
      resetQuiz: () =>
        set({
          currentQuestionIndex: 0,
          answers: {},
          questions: [],
        }),
    }),
    {
      name: "quiz-store",
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        questions: state.questions,
        totalQuestions: state.totalQuestions,
      }),
    }
  )
);
