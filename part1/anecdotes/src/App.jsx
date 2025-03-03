import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(() =>
    anecdotes.reduce((cur, _, index) => {
      cur[index] = 0;
      return cur;
    }, {})
  );

  const [selected, setSelected] = useState(0);
  let max = 0;
  for (let key in votes) {
    if (votes[max] < votes[key]) {
      max = key;
    }
  }

  function handleNextAnecdote() {
    const random = Math.floor(Math.random() * 7);
    setSelected(random);
  }

  function handleVote() {
    setVotes({
      ...votes,
      [selected]: votes[selected] + 1,
    });
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
    </div>
  );
};

export default App;
