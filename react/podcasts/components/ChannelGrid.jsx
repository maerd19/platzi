import React from 'react';
import Link from 'next/link';

const ChannelGrid = ({ channels }) => (
    <div className="channels">
        { channels.map(channel => (
            
            // Prefetch indica a <Link> que el contenido solicitado tiene que cargar por adelantado 
            // y permite un ahorro de algunos segundos en la carga. 
            // <Link href={`/channel?id=${ channel.id }`} prefetch key={channel.id}>
            <Link href={`/channel?id=${ channel.id }`} key={channel.id}>
                <a className="channel">
                    <img src={channel.urls.banner_image.original} alt={channel.title}/>
                    <h2>{ channel.title }</h2>
                </a>
            </Link >
        )) }

    {/* css grid nos permitira implementar layouts a nivel componente */}
    {/* grid-template-columns nos permite crear columnas virtuales cuando se modifica el tamano del viewport */}
    <style jsx>{`
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
    </div>
)

export default ChannelGrid;