import React from "react";

interface HeaderProps {
    header:string
}

const Header : React.FC<HeaderProps> = (props) => {
    return <h3>{props.header}</h3>
};

export default Header;