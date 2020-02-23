import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

const index = ({ channels }) => (
    <Layout title="Podcasts">
        <ChannelGrid channels={ channels } />
    </Layout>
);

index.getInitialProps = async () => {
    const res = await axios.get('https://api.audioboom.com/channels/recommended');
    const data = await res.data;
    
    console.log(`Show data fetched. Count: ${data.body.length}`);
    return { channels : data.body }
}

export default index;
