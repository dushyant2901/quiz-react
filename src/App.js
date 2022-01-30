import "./App.css";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import Questions from "./Questions";
import SetupForm from "./SetupForm";
import Modal from "./Modal";
function App() {
  const { questions, checkAns, nextQuestion, index, correct } = useGlobalContext();
  const { isLoading, isWaiting } = useGlobalContext();
  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }
  let abc = questions[7]?.question;
  console.log(abc);
console.log(questions);
//return< Questions/>
 /*  let abc = questions[7].question;
  console.log(abc); */
 const { question, correct_answer, incorrect_answers } = questions[index];
 // const answers = [...incorrect_answers, correct_answer];
 let answers=[...incorrect_answers]
  const tempIndex=Math.floor((Math.random())*4)
  if (tempIndex===3) {
     answers.push(correct_answer)
  }else{
    let tempValue=answers[tempIndex]
    answers.push(tempValue)
    answers[tempIndex]=correct_answer
  }
  return (
    <main>
       <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAns(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  ); 
}

export default App;
