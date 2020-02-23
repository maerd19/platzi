import React from 'react';
import axios from 'axios';

import Link from 'next/link';

const channel = ({ channel, audioClips, series }) => (
    <>
        <header>Podcasts</header>

        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        <nav>
            <Link href={`/index`}>
              <a className='close'>&lt; Volver</a>
            </Link>
          </nav>

        <h1>{ channel.title }</h1>

        { series.length > 0 &&
            <div>
                <h2>Series</h2>
                <div className="channels">
                { series.map((serie) => (
                    <Link href={`/channel?id=${ serie.id }`} prefetch>
                    <a className="channel">
                        <img src={ serie.urls.logo_image.original } alt=""/>
                        <h2>{ serie.title }</h2>
                    </a>
                    </Link>
                ))}
                </div>
            </div>
        }

        <h2>Ultimos Podcasts</h2>
        { (audioClips.length > 0 || audioClips != undefined) ?
            audioClips.map((clip) => (
                <Link href={`/podcast?id=${ clip.id }`} prefetch>
                    <a className="channel">
                        <div className="podcast" key={clip.id}>{ clip.title }</div>
                    </a>
                </Link >
            ))
            :
            <div>Este podcast ya no contiene capitulos :(</div>
        }        

        <style jsx>{`
        header {
        color: #fff;
        background: #8756ca;
        padding: 15px;
        text-align: center;
        }

        .banner {
        width: 100%;
        padding-bottom: 25%;
        background-position: 50% 50%;
        background-size: cover;
        background-color: #aaa;
        }

        .channels {
        display: grid;
        grid-gap: 15px;
        padding: 15px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
        display: block;
        margin-bottom: 0.5em;
        color: #333;
        text-decoration: none;
        }
        .channel img {
        border-radius: 3px;
        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
        width: 100%;
        }
        h1 {
        font-weight: 600;
        padding: 15px;
        }
        h2 {
        padding: 5px;
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        text-align: center;
        }

        .podcast {
        display: block;
        text-decoration: none;
        color: #333;
        padding: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        cursor: pointer;
        }
        .podcast:hover {
        color: #000;
        }
        .podcast h3 {
        margin: 0;
        }
        .podcast .meta {
        color: #666;
        margin-top: 0.5em;
        font-size: 0.8em;
        }
    `}</style>

    <style jsx global>{`
        body {
        margin: 0;
        font-family: system-ui;
        background: white;
        }
    `}</style>
  </>
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