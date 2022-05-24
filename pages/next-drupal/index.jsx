import React from 'react'

import { drupal } from "../../lib/nextDrupalOrg"

/*
import { Experiment_DrupalClient as DrupalClient } from "next-drupal"
import { getResourceCollection } from "next-drupal"
*/

import Link from 'next/link'
import Head from 'next/head';

export default function nextDrupalModule( { article } ) {

    //console.log(article);

    return (
        <div className='divPostList'>
            { /* }
            <Head>
                <title>Article List [next-drupal]</title>
            </Head>
            { */ }

            <h3>All Articles List [next-drupal]</h3>

            <div className='postsListDiv'>
                <p>https://next-drupal.org</p> 
                <p>https://www.npmjs.com/package/next-drupal</p> 
                <p>https://next-drupal.org/docs/reference#getresourcecollection</p>
                <ul>
                {
                    article.map( (article, index) =>
                        <li key={ index+"getStaticPaths" } >
                            <Link href={ "/next-drupal/"+article.id }><a>{ article.title }</a></Link>
                        </li>
                    )
                }
                </ul>
            </div>
        </div>
    )
}

/*
//  IF you want to do it in one line
export const drupal = new DrupalClient(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    {
        previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
    }
)
*/

export async function getServerSideProps(context) {
    //const worklog = await getResourceFromContext("node--article", context);
    const articles = await drupal.getResourceCollection("node--article", {
        params: {
            "fields[node--article]": "id,type,title,status,field_image",
        },
    });

    //console.log("next-drupal [getServerSideProps]");
    //console.log(articles);

    return {
        props: {
            article: articles
        }
    }
}