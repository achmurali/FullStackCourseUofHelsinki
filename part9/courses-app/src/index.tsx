import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
  description:string
}

interface CoursePartOne extends CoursePartExtended {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtended {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartExtended {
  name:"LAST EXERCISE",
  just_checking:string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name:"LAST EXERCISE",
    exerciseCount:20,
    description:"ALL RIGHTTTT",
    just_checking:"OHH YEAHHH"
  }
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header header={courseName}/>
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));