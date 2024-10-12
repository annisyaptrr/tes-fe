import React, { useEffect, useReducer } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import './App.css';
import axios from 'axios';

const initialState = {
  data: [],
  status: "loading",
  index: 0,
  answer: undefined,
  points: 0,
  highscore: 0,
};

const TimePerQuestions = 5;

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
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.data[state.index];
      const isCorrect = action.payload === question.correctAnswer;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + 1 : state.points,
      };
    case "nextQuestions":
      return {
        ...state,
        index: Math.min(state.index + 1, state.data.length - 1),
        answer: null,
      };
    case "previousQuestion":
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
        answer: null,
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
      dispatch({ type: "failedFetching" });
    }
  };

  const percentage = (state.points / Math.max(state.data.length, 1)) * 100;
  const emoji = percentage === 100 ? "🥇" :
                 percentage >= 80 ? "🎉" :
                 percentage >= 50 ? "🙃" :
                 percentage > 0 ? "🤨" : "🤦‍♂️";

  return (
    <div className="App">
  <Navbar />
  <section className="card-container">
    {state.status === 'ready' && (
      <div className="card start-container">
        <h1>Start Here</h1>
        <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
          Let's Start
        </button>
      </div>
    )}
    {state.status === 'active' && (
      <Card
        state={state}
        dispatch={dispatch}
      />
    )}
    {state.status === 'finished' && (
      <div className="card">
        <p>Finished</p>
        <div className="result_container">
          <p className="result">
            <span>{emoji}</span> You scored <strong>{state.points}</strong> out of {state.data.length} ({Math.ceil(percentage)}%)
          </p>
          <p className="highscore">(Highscore: {state.highscore} points)</p>
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "restart" })}
          >
            Restart quiz
          </button>
        </div>
      </div>
    )}
  </section>
</div>

  );
}

export default App;
