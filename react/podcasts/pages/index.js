import React from 'react';
import axios from 'axios';

const index = ({ channels }) => (
    <>
        <header>Podcasts</header>

        <div className="channels">
            { channels.map(channel => (
                <div className="channel">
                    <img src={channel.urls.banner_image.original} alt={channel.title}/>
                    <h2>{ channel.title }</h2>
                </div>
            )) }
        </div>        

        <style jsx>{`
            header {
                color: #fff;
                background: #5756ca;
                padding: 15px;
                text-align: center;
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
            h2 {
                padding: 5px;
                font-size: 0.9em;
                font-weight: 600;
                margin: 0;
                text-align: center;
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

index.getInitialProps = async () => {
    const res = await axios.get('https://api.audioboom.com/channels/recommended');
    const data = await res.data;
    
    console.log(`Show data fetched. Count: ${data.length}`);
    return { channels : data.body }
  }

export default index;
