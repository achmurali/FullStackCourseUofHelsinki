import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text,handleClick}) => {
  return (
      <button onClick = {handleClick}>
        {text}
      </button>
  );
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array(6).fill(0));
  const handleVotes = () => {
    const currVotes = [...votes];
    currVotes[selected] += 1;
    setVotes(currVotes);
  }
  const maxVoteIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {props.anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <Button text = {"vote"} handleClick = {handleVotes}/>
      <Button text = {"next anecdote"} handleClick = {() => setSelected(Math.floor(Math.random()*5) + 0)}/>
      <h3>Anecdote with most votes</h3>
      {props.anecdotes[maxVoteIndex]}
      <br/>
      has {votes[maxVoteIndex]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)