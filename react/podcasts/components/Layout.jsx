import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children, title }) => (
    <>
        <Head>
            <title>{ title }</title>
            <meta name="viewport" content="width=device-width" />
        </Head>
        <header>
            <Link href="/">
                <a>Podcasts</a>
            </Link>
        </header>

        { children }

        <style jsx>{`
            header {
                color: #fff;
                background: #5756ca;
                padding: 15px;
                text-align: center;
            }

            header a {
                color: #fff;
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
)

export default Layout;