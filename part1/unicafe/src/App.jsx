import { useState } from "react";

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <li>
      {text}: {value}
    </li>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const statistic = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "all", value: good + neutral + bad },
    { text: "average", value: (good - bad) / (good + bad + neutral) },
    { text: "positive", value: `${(good / (good + bad + neutral)) * 100}%` },
  ];
  return (
    <>
      <h1>statistics</h1>
      <table border={1}>
        <tbody>
          {statistic.map((row) => (
            <tr key={row.text}>
              <th>{row.text}</th>
              <th>{row.value}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)}>good</Button>
        <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
        <Button onClick={() => setBad(bad + 1)}>bad</Button>
      </div>
      {good || bad || neutral ? (
        <Statistics bad={bad} good={good} neutral={neutral} />
      ) : null}
    </div>
  );
};

export default App;
