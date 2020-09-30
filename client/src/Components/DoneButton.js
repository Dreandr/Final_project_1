import React from 'react';

const DoneButton = (props) => {
  const {handler} = props;

  return(<button onClick={handler}>Done!</button>)
}

export default DoneButton;
