import { WebView, View, Image } from 'react-native';
import React, { Component } from 'react';
import YouTube from 'react-native-youtube';
import { humanToSeconds } from '../../../services/index.js';
import styled from 'styled-components/native';

const InitialScreen = styled.View`
  background-color: #404142;
  flex:1;
  justify-content: center;
  align-items: center;
`;
  

const Icon = styled.Image`
  transform: scale(0.7);
`;


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      status:'',
      quality:'',
      error:'',
    };
    this.player = {};
    this.handleActions = this.props.handleActions;
  }

  componentWillReceiveProps(nextProps) {
    // handle seeking in the same video case:
    if (nextProps.video.start_time !== this.props.video.start_time && 
        nextProps.video.yt_id === this.props.video.yt_id) {
      this.player.seekTo(humanToSeconds(nextProps.video.start_time));
    }
  }

  onStateChange(e) {
    // handle error loading:
    if (e.state === 'error') {
      
    }
  }

  onProgress(e) {
    this.handleActions({action: 'updateTime', payload: {time: parseInt(e.currentTime)} });
    if (e.currentTime > (humanToSeconds(this.props.video.start_time) + 5)) {
      this.handleActions({ action: 'nextVideo' });
      // this.props.nextVideo({player: this.player});
      // this.setState({id: "FTXQZEl58GU", start: 150, end: 170 });
    }
  }

  willPlay(e) {  
    this.player.seekTo(humanToSeconds(this.props.video.start_time));
  }

  render() {
    if (this.props.video.yt_id) {
      return (
        <YouTube
          ref={ (r) => this.player = r }
          videoId={ this.props.video.yt_id } // The YouTube video ID
          play={true}           // control playback of video with true/false
          hidden={false}        // control visiblity of the entire view
          playsInline={true}    // control whether the video should play inline
          loop={false}          // control whether the video should loop when ended
          rel={false}
          controls={0}
          showinfo={false}
          onReady={(e)=>{this.willPlay(e)}}
          onChangeState={(e)=>{ this.onStateChange(e)}}
          onProgress={(e)=>{ this.onProgress(e) }}
          style={{ flex:1 }}
        />);
    } else {
      return (
        <InitialScreen>
           <Icon source={require('../../../assets/bolt.png')}/>
        </InitialScreen>
      );
    }
  }
}

// Alternative webview implementation, consider that in the worst case:
// <WebView
//   source= {{ uri: "https://www.youtube.com/embed/obCjODeoLVw?rel=0&autoplay=1&showinfo=0&controls=0&playsinline=1&start=510&end=515"}}
//   allowsInlineMediaPlayback={true}
//   mediaPlaybackRequiresUserAction ={false}
//   onMessage={ (e) => this.onMessage(e.nativeEvent.data) }
//   domStorageEnabled={true}
//   decelerationRate="normal"
//   javaScriptEnabled={true}
//   startInLoadingState={true}
// />

// for error handling and quality control:
// onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
//         onError={(e)=>{this.setState({error: e.error})}}
 

export default Player; 
