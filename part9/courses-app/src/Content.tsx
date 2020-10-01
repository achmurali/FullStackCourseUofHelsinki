import React from 'react';
import Part from './Part';
import {CoursePart} from './index';

interface ContentProp{
    courses:CoursePart[]
};

const Content : React.FC<ContentProp> = (props) => {
    return (
        <>
            {
                props.courses.map(course => (
                    <Part part = {course} />
                ))
            }
        </>
    )
}

export default Content;