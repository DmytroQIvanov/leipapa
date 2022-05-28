import React from 'react';
import Head from "next/head";

const Wrapper = ({children,title,description}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            {children}
        </div>
    );
};

export default Wrapper;