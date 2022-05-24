import React from 'react';
import Head from "next/head";

//import { Head } from 'next/document'

import Header from './Header';
import Footer from './Footer';

export default function Layout( { children } ) {
    //console.log(children);
    return (
        <div className='fullPage'>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="" />
                <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors" />
                <meta name="generator" content="Hugo 0.98.0" />

                <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/blog/" />
                <meta name="theme-color" content="#712cf9" />
                
                <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet" />
            </Head>

            <Header />

            <main>
                <div className="container mt-3" >
                {   children    }
                </div>
            </main>

            <Footer />
        </div>
    )
}
