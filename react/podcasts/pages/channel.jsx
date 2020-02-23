import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

const channel = ({ channel, audioClips, series }) => (
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
);

channel.getInitialProps = async ({ query }) => {
    let idChannel = query.id;

    let URL1 = `https://api.audioboom.com/channels/${idChannel}`
    let URL2 = `https://api.audioboom.com/channels/${idChannel}/audio_clips`
    let URL3 = `https://api.audioboom.com/channels/${idChannel}/child_channels`

    let [ reqChannel, reqAudios, reqSeries ] = await Promise.all([ axios.get(URL1), axios.get(URL2), axios.get(URL3) ]);
    
    const dataChannel = await reqChannel.data;
    let channel = dataChannel.body.channel;

    const dataAudios = await reqAudios.data;
    let audioClips = dataAudios.body.audio_clips;

    const dataSeries = await reqSeries.data;
    let series = dataSeries.body.channels;

    let response = { channel, audioClips, series }
    return {...response}
}

export default channel;