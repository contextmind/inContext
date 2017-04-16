import React, { Component } from 'react';
import { StyleSheet, View, WebView, TextInput, StatusBar } from 'react-native';
import SearchBar from './components/SearchBar.js';
import TranscriptBar from './components/TranscriptBar.js';
import ControlBar from './components/ControlBar.js';
import Player from './components/Player.js';
import InfoBar from './components/InfoBar.js';
import { getVideos, getHistory } from '../../services/index.js';
//TODO: unlink video and native elements style
//TODO: get better resolution png assets
//TODO: hide/show x results found playing feedback bar
//TODO: organize styles in a better way
//TODO: implement updateHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404142'
  }
});

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      currentVideo: {},
      query:'',
      playIndex: 0,
      time: 0,
      querying: false,
    },
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions({ action, payload }) {
    const actions = {
      getHistory: getHistory,
      nextVideo: () => {
        let nextIndex = this.state.playIndex + 1;
        let nextItem = this.state.playlist[nextIndex];
        // loop to the beginning:
        if (nextIndex === this.state.playlist.length - 1) {
          nextIndex = 0;
        }
        // check the input:
        if (!nextItem.yt_id) {
          nextIndex += 1;
          if (nextIndex === this.state.playlist.length - 1) {
            nextIndex = 0;
          }
        }
        nextItem = this.state.playlist[nextIndex];
        this.setState({
          playIndex: nextIndex, 
          currentVideo: nextItem 
        }); 
      },
      prevVideo:() => {
        this.setState({
          playIndex: this.state.playIndex - 1, 
          currentVideo: this.state.playlist[this.state.playIndex] 
        }); 
      },
      updateTime: ({time}) => { this.setState({ time }); },
      search: ({query}) => { 
        getVideos(query).then((results) => {
          this.setState({
            query,
            querying: false,
            playlist: results.data,
            currentVideo: results.data[0]
          });
        }).catch((error) => {
          console.log(error);
          this.setState({ querying: false });
        });
      }
    };
    actions[action](payload);
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar backgroundColor="#404142" barStyle="light-content"/>
        <SearchBar handleActions= { this.handleActions }/>
        <InfoBar count={ this.state.playIndex + 1 } searchTerm={ this.state.query } size={this.state.playlist.length} /> 
        <Player video={ this.state.currentVideo } handleActions= { this.handleActions }/> 
        <TranscriptBar transcripts={ this.state.currentVideo.transcripts } time={this.state.time}/>
        <ControlBar handleActions={ this.handleActions }/> 
      </View>      
    );
  }
}