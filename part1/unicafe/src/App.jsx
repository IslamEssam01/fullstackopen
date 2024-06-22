import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;
  const avg = total ? (good - bad) / total : 0;
  const pos = total ? (good / total) * 100 : 0;
  if (!total)
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="total" value={total} />
      <StatisticsLine text="average" value={avg} />
      <StatisticsLine text="positive" value={pos} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button
          onClick={() => {
            setGood((good) => good + 1);
          }}
          text="good"
        />
        <Button
          onClick={() => {
            setNeutral((neutral) => neutral + 1);
          }}
          text="neutral"
        />
        <Button
          onClick={() => {
            setBad((good) => good + 1);
          }}
          text="bad"
        />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
