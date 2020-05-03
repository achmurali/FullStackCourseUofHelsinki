import React from 'react';

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((sum,part) => {
      return part.exercises + sum;
    },0)
    return(
      <p><strong>Total of {sum} exercises</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(
            part =>
              <Part part = {part} key = {part.id} /> 
          )
        }
      </div>
    )
  }
  
  const Course = ({course}) => {
      return (
          <>
          <Header name = {course.name}/>
          <Content parts = {course.parts} />
          <Total parts = {course.parts} />
          </>
      )
  }

  export default Course;