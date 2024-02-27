import React, {useState, useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions))
  }, []);

  function handleDeleteQuestion(deletedQuestion) {
      const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
      setQuestions(updatedQuestions)
  }

  function handleUpdateDropdown(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions)
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  const questionsToDisplay = questions.filter((question) => {
    if (selectedCategory === "All") return true;
    return question.category ===selectedCategory;
  })
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
    {questionsToDisplay.map((question) => (
      <QuestionForm key={question.id}
                    question={question} 
                    onAddQuestion={handleAddQuestion} />
    ))}
    {questionsToDisplay.map((question) => (
      <QuestionItem key={question.id}
                    question={question} 
                    onDeleteQuestion={handleDeleteQuestion}
                    onUpdateDropdown={handleUpdateDropdown} />
    ))}
    </ul>
    
    </section>
  );
}

export default QuestionList;
