import React from 'react';
import {CoursePart} from './index';

const Part : React.FC<{part : CoursePart}> = ({part}) => {
    switch(part.name){
        case "Fundamentals":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description}
                </p>
            )
        case "Using props to pass data":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.groupProjectCount}
                </p>
            )
        case "Deeper type usage":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.exerciseSubmissionLink} {part.description}
                </p>
            )
        case "LAST EXERCISE":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.just_checking} {part.description}
                </p>
            )
        }
};

export default Part;