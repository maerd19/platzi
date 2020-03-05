import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error'

const index = ({ channels, statusCode }) => {
    // early return
    if (statusCode !== 200) {
        return <Error statusCode={statusCode} />
    }

    return (
        <Layout title="Podcasts">
            <ChannelGrid channels={ channels } />
        </Layout>
    )
};

// res maneja la respuesta del server
// getInitialProps solo funciona con elementos dentro de la carpeta pages.
index.getInitialProps = async ({ res }) => {
    // El try catch es la forma de manejar los errores en un flujo async.
    try {
        let req = await axios.get('https://api.audioboom.com/channels/recommended');
        let data = await req.data;
        console.log('data', data);
        return { channels : data.body, statusCode: 200 }   
    } catch (error) {
        res.statusCode = 503
        return { channels: null, statusCode: 503 }
    }    
}

export default index;