import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateDropdown }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

function handleDelete() {
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "DELETE",
  })
  .then((r) => r.json())
  .then(() => onDeleteQuestion(question))
}

function handleDropdown() {
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "correctIndex": 0
    }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => onUpdateDropdown(updatedQuestion))
  
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onClick={handleDropdown} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
