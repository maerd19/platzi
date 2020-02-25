import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from 'next/error';

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
index.getInitialProps = async ({ res }) => {
    try {
        const res = await axios.get('https://api.audioboom.com/channels/recommended');
        const data = await res.data;
        
        return { channels : data.body, statusCode: 200 }   
    } catch (error) {
        res.statusCode = 503
        return { channels: null, statusCode: 503 }
    }    
}

export default index;
