import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';
import Error from './_error';

const channel = ({ channel, audioClips, series, statusCode }) => {
    // early return
    if (statusCode !== 200) {
      return <Error statusCode={ statusCode } />
    }
    return (
      <Layout title={channel.title}>
          <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        
        <h1>{ channel.title }</h1>

        { series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={ series } />
          </div>
        }

        <h2>Ultimos Podcasts</h2>
        <PodcastList podcasts={ audioClips } />

        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 15px;
            font-size: 1.2em;
            font-weight: 600;
            margin: 0;
          }
        `}</style>
    </Layout>
  )
};

channel.getInitialProps = async ({ query, res }) => {
  // let idChannel = query.id;
  console.log('query', query);
  let URL1 = `https://api.audioboom.com/channels/${idChannel}`
  let URL2 = `https://api.audioboom.com/channels/${idChannel}/audio_clips`
  let URL3 = `https://api.audioboom.com/channels/${idChannel}/child_channels`
  
  try {
      axios.all([ reqChannel, reqAudios, reqSeries ]).then(axios.spread((...responses) => {
        console.log('responses', [...responses])
        // const responseOne = responses[0]
        // const responseTwo = responses[1]
        // const responesThree = responses[2]
        // use/access the results 
      })).catch(errors => {
        // react on errors.
      })
      
      let [ reqChannel, reqAudios, reqSeries ] = await Promise.all([ 
        axios.get(URL1).then(null, e => {
          console.log(e);          
          reqChannel.status = e.response.status
        }),
        // axios.get(URL1)
        //   .then(response => console.log(response))
        //   .catch(e => {
        //     console.log(e);
        //     reqChannel.status = e.response.status
        //   }),
        axios.get(URL2), 
        axios.get(URL3) 
      ]);
      
      console.log(reqChannel)

      if( reqChannel.status >= 400 ) {
        res.statusCode = reqChannel.status
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }
      }
      
      let dataChannel = await reqChannel.data;
      let channel = dataChannel.body.channel;

      let dataAudios = await reqAudios.data;
      let audioClips = dataAudios.body.audio_clips;

      let dataSeries = await reqSeries.data;
      let series = dataSeries.body.channels;

      return { channel, audioClips, series, statusCode: 200 }
  } catch (error) {
      return { channel: null, audioClips: null, series: null, statusCode: 503 }
  }    
}

export default channel;