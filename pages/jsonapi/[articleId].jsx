import React from 'react'
import Image from "next/image"

import { DRUPAL_URL, IMAGE_URL } from "../../lib/constants.jsx"

export default function nextDrupalArticle( { data } ) {
    var imgSrc = "";
    if( data ) {
        /*
        console.log("<<<<<--------  [data]");  
        console.log(data);
        console.log("[data]    -------->>>>>");  
        */
       
        if( data.included && data.included[0] ) {
            imgSrc = data.included[0].attributes.uri.url;
        }
    }
    
    return (
        <div>
            { imgSrc != "" && <div className="relative w-full rounded-lg shadow-lg overflow-hidden mb-10" > 
            
                <Image priority
                    src={DRUPAL_URL + imgSrc}
                    width={768}
                    height={400}
                    layout="responsive"
                    objectFit="fill"
                    alt={data && data.data.title}
                />
                
                { console.log("Image URL, "+ DRUPAL_URL + imgSrc) }
            </div> } 

            <div className="mt-4" > 
                <h3>{ data && <div dangerouslySetInnerHTML={{ __html: data.data.attributes.title }} /> }</h3>
            </div>

            <div className="mt-4" > 
                { data && <div dangerouslySetInnerHTML={{ __html: data.data.attributes.body.value }} /> }
            </div>
        </div>
    )
}

// This function gets called at build time [ PART OF SSG ]
export async function getStaticPaths() {
    //console.log("jsonapi [getStaticPaths]");
    const req = await fetch(`${DRUPAL_URL}/jsonapi/node/article`);
    const dataArr = await req.json();
    
    const paths = dataArr.data.map((data) => ({
        params: { articleId: data.id }
    }));
    
    return { paths, fallback: true }
}

// This gets called at build time [ PART OF SSG ] 
export async function getStaticProps( {params} ) {
    try {
        const res = await fetch(`${DRUPAL_URL}/jsonapi/node/article/${params.articleId}?include=field_image&fields[file--file]=uri,url`);
        const data = await res.json();
        
        // Pass post data to the page via props
        return { props: { data } }
    } catch (error) {
        console.error("Unable to fetch articles: ", error);
        return {
            props: {},
        };
    }
}