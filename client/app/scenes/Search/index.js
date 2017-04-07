import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  searchBar: {
    marginTop: 100
  },
  container: {

  }
});

export default class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={ styles.container }>
        <SearchBar
          placeHolder="Hunt for a word..."
          style={styles.searchBar}
        /> 
      </View>
    );
  }
}

