import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';

const StyledTextInput = styled.TextInput`
  margin-top: 30;
  background-color: #404142;
  color: #f4e242;
  font-family: Helvetica;
  font-size: 20;
  font-weight: 600;
  padding-left: 10;
  padding-right:10;
  height: 40;
`;

const BorderView = styled.View`
  border-style: solid;
  border-bottom-width: 5;
  border-color: #f4e242;
`;

const placeHolderMessage = 'search ...'
const SearchBar = (props) => {
  return (
    <BorderView> 
      <StyledTextInput
       placeholder={ placeHolderMessage } 
       returnKeyType= {'search'}
       placeholderTextColor = {'#f4e242'}
       keyboardAppearance= 'dark'
       autoCapitalize = 'none'
       multiline={false}
       onSubmitEditing={(event) => {
       props.handleActions({action: 'search', payload: {query: event.nativeEvent.text} });
      }}
      />
    </BorderView>
  );
}

export default SearchBar;
