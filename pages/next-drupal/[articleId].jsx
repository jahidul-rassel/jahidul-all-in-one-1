import React from 'react'
import Image from "next/image"

import { drupal } from "../../lib/nextDrupalOrg"
import { DRUPAL_URL, IMAGE_URL } from "../../lib/constants.jsx"

export default function nextDrupalArticle( { article } ) {
    /*
    console.log("<<<<<--------  [article]");  
    console.log(article.field_image.resourceIdObjMeta.alt);
    console.log("[article]    -------->>>>>");  
    */

    const imgSrc = article?.articleImageDetails?.uri?.url || "";

    return (
        <div>
            { imgSrc && <div className="relative w-full rounded-lg shadow-lg overflow-hidden mb-10" > 
                <Image priority
                    src={DRUPAL_URL + imgSrc}
                    width={768}
                    height={400}
                    layout="responsive"
                    objectFit="fill"
                    alt={article && article.field_image.resourceIdObjMeta.alt}
                />
                { console.log("Image URL, "+ DRUPAL_URL + imgSrc) }
            </div> }

            <div className="mt-4" > 
                <h3>{ article && <div dangerouslySetInnerHTML={{ __html: article.title }} /> }</h3>
            </div>

            <div className="mt-4" > 
                { article && <div dangerouslySetInnerHTML={{ __html: article.body.value }} /> }
            </div>
            
        </div>
    )
}

// This function gets called at build time [ PART OF SSG ]
export async function getStaticPaths() {
    console.log("next-drupal [getStaticPaths]");
    
    // Call an external API endpoint to get posts
    const nextDrupalArticles = await drupal.getResourceCollection("node--article", {
        params: {
            "fields[node--article]": "id",
        },
    });
    
    /*
    console.log("<<<<<--------  [nextDrupalArticles getStaticPaths]");  
    console.log(nextDrupalArticles);
    console.log("[nextDrupalArticles getStaticPaths]    -------->>>>>"); 
    */
   
    // Get the paths we want to pre-render based on posts
    const paths = nextDrupalArticles.map((article) => ({
        params: { articleId: article.id.toString() }
      }));
    
    /*  
    console.log("<<<<<--------  [paths getStaticPaths]");  
    console.log(paths);
    console.log("[paths getStaticPaths]    -------->>>>>");  
    */  

    return { paths, fallback: true }
}


// This gets called at build time [ PART OF SSG ] 
export async function getStaticProps( {params} ) {
    console.log(params);

    try {
        /*
        console.log("<<<<<--------  [paths]");  
        console.log(params);
        console.log("[paths]    -------->>>>>");  
        */
        
        //  In here "fields[node--article]" selects the Fields, "include" to include relationship data
        const article = await drupal.getResource(
            "node--article",
            params.articleId.toString(),{
                params: {
                    "fields[node--article]": "title,body,path,field_image,uid",
                    "include": "field_image, uid"
                },
            }
        );

        console.log("<<<<<--------  [getStaticProps - article]");  
        console.log(article);
        console.log("[getStaticProps - article]    -------->>>>>"); 
        

        if( article.field_image && article.field_image.id ) {
            console.log("Image ID: "+ article.field_image.id);
            const articleImageDetails = await drupal.getResource(
                "file--file",
                article.field_image.id
            );
    
            /*
            console.log("<<<<<--------  [articleImage]");  
            console.log(articleImage);  
            console.log("[articleImage]    -------->>>>>");  
            */

            article.articleImageDetails = articleImageDetails;
        }
 
        /*
        console.log("<<<<<--------  [getStaticProps - article]");  
        console.log(article);
        console.log("[getStaticProps - article]    -------->>>>>"); 
        */ 
 
        // Pass post data to the page via props
        return { props: { article } }
    } catch (error) {
        console.error("Unable to fetch articles: ", error);
        return {
            props: {},
        };
    }
}