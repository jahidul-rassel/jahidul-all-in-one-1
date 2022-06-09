import React from 'react'
import Image from "next/image"

import { DrupalState } from '@pantheon-systems/drupal-kit'

import { DRUPAL_URL, IMAGE_URL } from "../../lib/constants.jsx"

export default function nextDrupalArticle( { articleFromApi } ) {
    const [ articleDetails, setArticleList ] = React.useState(articleFromApi);

    if( articleDetails ) {
        console.log("<<<<<--------  [articleDetails {useState}]");  
        console.log(articleDetails);
        console.log("[articleDetails {useState}]    -------->>>>>");
    }
    
    const imgSrc = articleDetails?.field_image?.uri?.url || "";

    return (
        <div>
            
            { imgSrc && <div className="relative w-full rounded-lg shadow-lg overflow-hidden mb-10" > 
                <Image priority
                    src={DRUPAL_URL + imgSrc}
                    width={768}
                    height={400}
                    layout="responsive"
                    objectFit="fill"
                    alt={articleDetails && articleDetails.title}
                />
                { console.log("Image URL, "+ DRUPAL_URL + imgSrc) }
            </div> }

            <div className="mt-4" > 
                <h3>[UseState] { articleDetails && <div dangerouslySetInnerHTML={{ __html: articleDetails.title }} /> }</h3>
            </div>

            <div className="mt-4" > 
                { articleDetails && <div dangerouslySetInnerHTML={{ __html: articleDetails.body.value }} /> }
            </div>
            
        </div>
    )
}



// Call an external API endpoint to get posts
const store = new DrupalState({
    apiBase: DRUPAL_URL,
});

// This function gets called at build time [ PART OF SSG ]
export async function getStaticPaths() {
    //console.log("pantheon-drupal-kit [getStaticPaths]");
    //console.log("DRUPAL_URL: " + DRUPAL_URL);

    const articleFromApi = await store.getObject({ 
            objectName: 'node--article',
            query: `{
                    id
                }`
        });  

    /*    
    console.log("<<<<<--------  [getStaticPaths -> articleFromApi]");  
    console.log(articleFromApi);
    console.log("[getStaticPaths -> articleFromApi]    -------->>>>>");  
    */

    // Get the paths we want to pre-render based on posts
    const paths = articleFromApi.map((article) => ({
            params: { articleId: article.id }
        }));

    /*        
    console.log("<<<<<--------  [getStaticPaths -> paths]");  
    console.log(paths);
    console.log("[getStaticPaths -> paths]    -------->>>>>"); 
    */

    return { paths, fallback: true }
}


// This gets called at build time [ PART OF SSG ] 
export async function getStaticProps( {params} ) {
    /*
    console.log("<<<<<--------  [getStaticProps -> params]");  
    console.log(params);
    console.log("params.articleId: "+ params.articleId);
    console.log("[getStaticProps -> params]    -------->>>>>");  
    */
    

    try {
        //  Add an include parameter to include relationship data
        store.params.addInclude(["field_image"]);
        const articleFromApi = await store.getObject({ 
            objectName: 'node--article',
            id: params.articleId,
            query: `{
                    id
                    title
                    body
                    path {
                        alias
                    }
                    field_image
                }`
        }); 

        /*    
        console.log("<<<<<--------  [getObject -----> getStaticPaths -> articleFromApi]");  
        console.log(articleFromApi);
        console.log("[getObject -----> getStaticPaths -> articleFromApi]    -------->>>>>"); 
        */

        // Pass post data to the page via props
        return { props: { articleFromApi } }
    } catch (error) {
        console.error("Unable to fetch articles: ", error);
        return {
            props: {},
        };
    }
}