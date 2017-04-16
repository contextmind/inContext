import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const StyledText = styled.Text`
  background-color: #404142;
  color: #ffffff
  font-family: Helvetica;
  font-size: 15;
  font-weight: 300;
  padding: 15;
  height: 60;
  text-align: center;
`;

// const defaultMessage = 'If you change the rules that controls you, you will change the rules on what you can control';

const defaultMessage = 'fortis Fortuna adiuvat';
const TranscriptBar = (props) => {
  return (
    <StyledText> 
      { props.transcript ? props.transcript : defaultMessage }
      { '  \n time is: ' + props.time }
    </StyledText>);
}

export default TranscriptBar;
//  color: #ff3030; for the word power
