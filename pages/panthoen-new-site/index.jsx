import React, { useState } from 'react';

import Link from 'next/link';

//  Pantheon Drupal Kit
import { DrupalState } from "@pantheon-systems/drupal-kit";

export default function panthoenNewSite({ article }) {
    const [ articleList, setArticleList ] = useState(article);
    return (
        <div>
            <h5>Panthoen - New - Site</h5>

            <ul>
            {
                articleList && articleList.map( (article, index) =>
                    <li key={ index+"getStaticPaths" } >
                        <Link href={ "/pantheon-drupal-kit/"+article.id }><a>{ article.title }</a></Link>
                    </li>
                )
            }
            </ul>
        </div>
    )
}


/*
const store = new DrupalState({
    apiBase: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  });
*/
const store = new DrupalState({
    apiBase: "https://dev-cse-jahidul-decoupled-idp.pantheonsite.io/"
  });

export async function getServerSideProps(context) {
    const recipesFromApi = await store.getObject({ 
        objectName: 'node--article',
        query: `
            {
                id,
                title
            }`
    });
  
    console.log("pantheon-drupal-kit [ getServerSideProps ]");

    console.log(recipesFromApi);

    return {
        props: {
            article: recipesFromApi
        },
    }
}