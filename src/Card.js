import React from 'react';
import './Card.css';

function Card({ state, dispatch }) {
  const questionNya = state?.data?.[state.index];
  const questionIndex = state?.index;

  if (!questionNya) {
    return <div className="card">No question found.</div>;
  }

  return (
    <div className="card">
      <h3 className="card-title">Question {questionIndex + 1}</h3>
      <p className="card-description">{questionNya.question}</p>
      <div className="card-form">
        {questionNya.options?.map((option, optionIndex) => (
          <div key={optionIndex} className="question">
            <label className="option-label">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option.label}
                onClick={() => dispatch({ type: "newAnswer", payload: option.label })}
                required
              />
              {option.value}
            </label>
          </div>
        ))}
        <div className="button-group">
          {questionIndex > 0 && (
            <button className="btn btn-ui" onClick={() => dispatch({ type: "previousQuestion" })}>
              Back
            </button>
          )}
          {questionIndex < state.data.length - 1 && (
            <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestions" })}>
              Next
            </button>
          )}
          {questionIndex === state.data.length - 1 && (
            <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
