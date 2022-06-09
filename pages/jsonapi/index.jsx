import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

export default function index( {data: arrData} ) {
  //console.log(arrData);

  return (
    <div className='divPostList'>
        
        <Head>
            <title>Article List [JSON:API]</title>
        </Head>

        <h3>All Articles List [JSON:API]</h3>

        <div className='postsListDiv'>
            <p>https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/api-overview</p> 
            <p>https://dev-training-decouple-drupal.pantheonsite.io/jsonapi/node/article</p> 
            <p>Doc: https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/fetching-resources-get</p>
            <ul>
            {
                arrData.data.map( (article, index) =>
                    <li key={ index+"getStaticPaths" } >
                        <Link href={ "/jsonapi/"+article.id }><a>{ article.attributes.title }</a></Link>
                    </li>
                )
            }
            </ul>
        </div>
        
    </div>
  )
}


export async function getServerSideProps( { params } ) {
  console.log("getServerSideProps");
  const req = await fetch(`https://dev-training-decouple-drupal.pantheonsite.io/jsonapi/node/article`);
  const data = await req.json();

  if (!data) {
      return {
          notFound: true
      }
  }

  return {
      props: { data },
  }
}