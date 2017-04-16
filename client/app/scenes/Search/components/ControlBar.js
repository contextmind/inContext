import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TextInput, Image } from 'react-native';
// import { StyledButton } from './StyledButton.js'

const ControlView = styled.View`
  background-color: #404142;
  height: 50;
  flex-direction: row;
  justify-content: space-between;
`;

const ControlButton = styled.TouchableOpacity`
  height: 50;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  transform: scale(1.3);
`;

const ControlBar = (props) => {

  return (
    <ControlView>
      <ControlButton onPress={props.handleActions.bind(null, {action: 'prevVideo'})}> 
        <Icon source={require('../../../assets/prev.png')}/>
      </ControlButton>
      <ControlButton> 
        <Icon source = {require('../../../assets/history.png')}/>
      </ControlButton>
       <ControlButton > 
        <Icon source = {require('../../../assets/tag.png')}/>
      </ControlButton>
      <ControlButton onPress={props.handleActions.bind(null, {action: 'nextVideo'})} > 
        <Icon source = {require('../../../assets/next.png')}/>
      </ControlButton>
    </ControlView>
  );
}


export default ControlBar;
