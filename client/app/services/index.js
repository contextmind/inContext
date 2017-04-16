
const axios = require('axios');

const dummyData = {
  data : [
  {
    id:'NM-zWTU7X-k',
    start: 30,
    end: 40,
    transcript:[]
  },
  {
    id:'TGLxjppFqeA',
    start: 40,
    end: 50,
    transcript:[]
  },
  {
    id:'KGR5HP3KSBk',
    start: 25,
    end: 35,
    transcript:[]
  },
  ]
};

const mockBase = "https://contexmind.herokuapp.com/api";
// const baseUrl =" http://context.cassac.co/api/" 
// search?q=fun

const getVideos = (query) => {
  return new Promise((resolve, reject) => {
    axios.get(mockBase).then(resolve).catch(reject);
  });
};

const getHistory = ({ query }) => {
  console.log(query, ' sending');
  return new Promise((resolve, reject) => {
    resolve(dummyData);
  });
};

const humanToSeconds = (time) => {
  if (time) {
    const segments = time.split(':');
    const intSegments = segments.map(s => parseInt(s));
    return intSegments[0] * 3600 + intSegments[1] * 60 + intSegments[2];
  } else {
    return 0;
  }
}


export {
  getVideos,
  getHistory,
  humanToSeconds
};

