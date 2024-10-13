import React from 'react';
import './Card.css';

function Card({ state, dispatch }) {
  const questionNya = state.data[state.index];
  const questionIndex = state.index;

  if (!questionNya) {
    return <div className="card">Tidak ada pertanyaan yang ditemukan.</div>;
  }

  return (
    <div className="w-full p-4 h-full bg-gray-100 flex gap-4 items-center justify-center">
      <div className='w-full max-w-[400px] h-auto p-6 gap-4 flex flex-col bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col gap-4'>
          <h3 className="card-title text-red-600 text-lg font-bold">Pertanyaan {questionIndex + 1}</h3>
          <p className="card-description text-gray-800 text-base">{questionNya.question}</p>
        </div>

        <div className="flex flex-col gap-4">
          {questionNya.options.map((option, optionIndex) => {
            let optionClass = 'option-label';
            if (state.answer === option.label) {
              optionClass += state.answer === questionNya.correctAnswer ? ' correct' : ' incorrect';
            }

            return (
              <div key={optionIndex} className="bg-transparent w-full rounded-md">
                <label className="flex w-full gap-2 p-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option.label}
                    checked={state.answer === option.label}
                    onChange={() => dispatch({ type: "newAnswer", payload: option.label })}
                    disabled={state.feedback !== null}
                    required
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-blue-500 border-gray-300 rounded-full"
                  />

                  {option.value}
                </label>
              </div>
            );
          })}
        </div>

        <div className="button-group pt-4 border-t mt-4 flex gap-2">
          {questionIndex > 0 && (
            <button
              className="w-full text-red-600 border border-red-600 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
              onClick={() => dispatch({ type: "previousQuestion" })}
            >
              Kembali
            </button>
          )}
          {questionIndex < state.data.length - 1 && (
            <button
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
              onClick={() => dispatch({ type: "nextQuestion" })}
              disabled={!state.answer}
            >
              Selanjutnya
            </button>
          )}
          {questionIndex === state.data.length - 1 && (
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              onClick={() => dispatch({ type: "finish" })}
              disabled={!state.answer}
            >
              Selesai
            </button>
          )}
        </div>

        {state.feedback && (
          <div className={`mt-4 p-3 rounded-md text-center ${state.feedback.includes('benar') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {state.feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
