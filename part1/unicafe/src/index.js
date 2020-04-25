import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './button';

const Statistic = (props) => {
  return (
    <tr>
    <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral;
  return (
    <>
      {
        (all != 0) ? 
        <table>
          <tbody>
            <Statistic text = {"good"} value = {props.good}/>
            <Statistic text = {"neutral"} value = {props.neutral}/>
            <Statistic text= {"bad"} value = {props.bad}/>
            <Statistic text= {"all"} value = {all}/>
            <Statistic text = {"average"} value = {(props.good + (-1 * props.bad))/all}/>
            <Statistic text = {"positive"} value = {((props.good)/all)*100 + '%'}/>
          </tbody>
        </table> : 
        <h5>No feedback given</h5>
      }
    </>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text = "good" handleClick = {() => setGood(good + 1)}/>
      <Button text = "neutral" handleClick = {() => setNeutral(neutral + 1)}/>
      <Button text = "bad" handleClick = {() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)