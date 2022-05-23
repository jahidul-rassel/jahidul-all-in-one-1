import React from 'react'

import Link from 'next/link'
import Head from 'next/head';

//  Pantheon Drupal Kit
import { DrupalState } from "@pantheon-systems/drupal-kit";

export default function panthoenDrupalKit( { article } ) {
    console.log(article);
    return (
        <div className='divPostList'>
            
            <Head>
                <title>Article List [pantheon-drupal-kit]</title>
            </Head>

            <h3>All Articles List [pantheon-drupal-kit]</h3>

            <div className='postsListDiv'>
                <p>https://www.npmjs.com/package/@pantheon-systems/drupal-kit</p> 
                <p>https://project.pages.drupalcode.org/drupal_state/en/introduction/</p> 
                <p>https://project.pages.drupalcode.org/drupal_state/en/quick-start/</p>
                <ul>
                {
                    article.map( (article, index) =>
                        <li key={ index+"getStaticPaths" } >
                            <Link href={ "/pantheon-drupal-kit/"+article.id }><a>{ article.title }</a></Link>
                        </li>
                    )
                }
                </ul>
            </div>
            
        </div>
    )
}


const store = new DrupalState({
    apiBase: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  });

export async function getServerSideProps(context) {
    const recipesFromApi = await store.getObject({ objectName: 'node--article' });
  
    console.log("pantheon-drupal-kit [ getServerSideProps ]");

    return {
        props: {
            article: recipesFromApi
        },
    }
}