import React, { useEffect, useReducer } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import './App.css';
import axios from 'axios';

const initialState = {
  data: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  feedback: null,
  showNextButton: false,
  error: null,
  timRemaining: 60
};

function reducer(state, action) {
  switch (action.type) {
    case "successFetching":
      return {
        ...state,
        data: action.payload,
        status: "ready",
      };
    case "failedFetching":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: 60
      };
    case "tick":
      return {
        ...state,
        // status: "active"
        timeRemaining: state.timeRemaining > 0 ? state.timeRemaining - 1 : 0,
      }
    case "timer":
      const finish = "finished"
      return {
        ...state,
        status: finish,
        highscore: Math.max(state.points, state.highscore),
      }
    case "newAnswer":
      const question = state.data[state.index];
      const isCorrect = action.payload === question.correctAnswer;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + 1 : state.points,
        feedback: isCorrect ? 'Jawaban Anda benar!' : `Jawaban yang seharusnya adalah: ${question.correctAnswer}`,
        showNextButton: true,
      };
    case "nextQuestion":
      return {
        ...state,
        index: Math.min(state.index + 1, state.data.length - 1),
        answer: null,
        feedback: null,
        showNextButton: false,
        timeRemaining: 60
      };
    case "previousQuestion":
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
        feedback: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    case "restart":
      return initialState;
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const res = await axios.get('https://frontend-test.rahmannauliaaa.workers.dev/questions');
      dispatch({ type: "successFetching", payload: res.data.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "failedFetching", payload: 'Gagal memuat data. Silakan coba lagi.' });
    }
  };

  useEffect(() => {
    let timerInterval;

    if (state.status === 'active' && state.timeRemaining > 0) {
      timerInterval = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
    }

    if (state.timeRemaining === 0) {
      dispatch({ type: "timer" });
    }

    return () => clearInterval(timerInterval); // Clean up timer on unmount
  }, [state.status, state.timeRemaining]);

  console.log(state)

  return (
    <div className="w-full h-[100vh]">
      <Navbar state={state} />
      <div className="w-full h-full">
        {state.status === 'loading' && (
          <div className="loading-container flex flex-col items-center justify-center h-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-gray-700 text-lg mt-4">Memuat data, harap tunggu...</p>
          </div>
        )}
        {state.status === 'error' && <p style={{ color: 'red' }}>{state.error}</p>}
        {state.status === 'ready' && (
          <div className="start-container h-full flex items-center justify-center flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Siap Memulai Kuis?</h1>
            <p className="text-lg text-gray-600">Tekan tombol di bawah untuk memulai!</p>
            <button
              className="btn-ui bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => dispatch({ type: "start" })}
            >
              Mari Mulai
            </button>
          </div>
        )}

        {state.status === 'active' && (
          <Card state={state} dispatch={dispatch} />
        )}
        {state.status === 'finished' && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="result-card w-full max-w-[400px] p-6 bg-white rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Kuis Selesai!</h2>

              <div className="result-container">
                <p className="result text-lg text-gray-800 mb-2">
                  Anda mendapatkan <strong className="text-xl text-green-600">{state.points}</strong> dari <strong className="text-xl">{state.data.length}</strong> poin.
                </p>

                <p className="highscore text-gray-600 text-md mb-4">
                  (Skor tertinggi: <strong className="text-lg text-blue-500">{state.highscore}</strong> poin)
                </p>
              </div>

              <button
                className="restart-btn w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
                onClick={() => dispatch({ type: "restart" })}
              >
                Restart Kuis
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
