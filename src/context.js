import React from "react";
import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    difficulty: "hard",
    category: "history",
  });
  const [isWaiting, setIsWaiting] = useState(true);
  const [error, setError] = useState(false);
  const table = {
    sports: 21,
    history: 23,
    politics: 24,
  };
  /*   const tempUrl =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"; */
  const API_ENDPOINT = "https://opentdb.com/api.php?";
  const fetchQuestions = async (url) => {
    setIsWaiting(false);
    setIsLoading(true);
    try {
      const response = await fetch(url);

      const data = await response.json();
      if (data.results.length > 0) {
        setQuestions(data.results);
        setIsLoading(false);
        setError(false);
        setIsWaiting(false);
      } else {
        setIsLoading(false);
        setError(true);
        setIsWaiting(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsWaiting(true);
      setError(true);
      console.log(error);
    }
  };
  /* 
  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []); */

  const checkAns = (value) => {
    if (value) {
      setCorrect((oldValue) => {
        return oldValue + 1;
      });
    }
   nextQuestion();
  };
  const nextQuestion = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      if (newIndex > questions.length - 1) {
         
       openModal();
       return 0
      } else {
        return newIndex;
      }
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsWaiting(true);
    setIsModalOpen(false);
    setCorrect(0);
    setIndex(0);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
/*     const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}category=${table[category]}&difficulty=${difficulty}&type=multiple`; */
    fetchQuestions("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple");
  };
  return (
    <AppContext.Provider
      value={{
        isLoading,
        questions,
        index,
        correct,
        nextQuestion,
        checkAns,
        isModalOpen,
        quiz,
        handleChange,
        error,
        isWaiting,
        handleSubmit,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
export const useGlobalContext = () => {
  return useContext(AppContext);
};
