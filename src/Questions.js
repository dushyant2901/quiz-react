import React from "react";
import { useGlobalContext } from "./context";

const Questions = () => {
  const { questions, checkAns, nextQues, index } = useGlobalContext();
  let abc = questions[7]?.question;
  console.log(abc);
  const {question,correct_answer,incorrect_answers} =questions[index];
  const answers=[...incorrect_answers,correct_answer] 
  return (
    <section>
      <article>
          <h2>{question}</h2>
        {answers.map((answer, index) => {
          return (
            <button
              key={index}
              className="answer-btn"
              onClick={() => {
                checkAns(answer === "correct");
              }}
            >
              {answer}
            </button>
          );
        })}
        <button className="next-btn" onClick={nextQues}>
          Next Question
        </button> 
      </article>
    </section>
  );
};

export default Questions;
