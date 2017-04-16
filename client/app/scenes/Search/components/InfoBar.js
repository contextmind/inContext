import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

const CenteredView = styled.View`
  background-color: #404142;
  padding: 10;
  height: 60;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: #89f3f4;
  font-family: Helvetica;
  font-size: 15;
  font-weight: 300;
`;



const InfoBar = (props) => {
  
  let message = '';
  const playingMessage = 'Playing ' + props.count + ' / ' + props.size + ' entries for ' + props.searchTerm;
  if (props.size === 0) {
    message = ' Type what you want to learn :) '
  } else {
    message = playingMessage;
  }

  return (
    <CenteredView>
      <StyledText> { message } </StyledText> 
    </CenteredView>
  );
};

export default InfoBar;