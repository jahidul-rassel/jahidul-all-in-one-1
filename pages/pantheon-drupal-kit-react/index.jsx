import React, { useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';

//  Pantheon Drupal Kit
import { DrupalState } from "@pantheon-systems/drupal-kit";

import ArticleList from './articleList';

export default function panthoenDrupalKit( { article } ) {
    
    const [ articleList, setArticleList ] = useState(article);

    const [ searchArticleList, setSearchArticleList ] = useState(articleList);
    const [ searchByTitle, setSearchByTitle ] = useState("");

    const filterOnChange = ( searchValue ) => {
        const searchResult = articleList.filter( (article) => {
            return article.title.toLowerCase().includes(searchValue.toLowerCase())
        });
        setSearchArticleList(searchResult);
    }
    
    const filterOnClick = () => {
        const searchResult = articleList.filter( (article) => {
            return article.title.toLowerCase().includes(searchByTitle.toLowerCase())
        });
        setSearchArticleList(searchResult);
    }
    
    return (
        <div className='divPostList'>
            <Head>
                <title>[useState] Article List [pantheon-drupal-kit]</title>
            </Head>

            <h3>[useState] All Articles List [pantheon-drupal-kit]</h3>

            <div>
                <h5>This module uses the following ReactJs Features</h5>

                <ul>
                    <li>useState</li>    
                    <li>props [sending data to other components]</li>    
                    <li>filter</li>    
                </ul> 
            </div>

            <div className='postsListDiv'>
                <p>https://www.npmjs.com/package/@pantheon-systems/drupal-kit</p> 
                <p>https://project.pages.drupalcode.org/drupal_state/en/api/classes/DrupalState.default.html</p>
                <p>https://project.pages.drupalcode.org/drupal_state/en/introduction/</p> 
                <p>https://project.pages.drupalcode.org/drupal_state/en/quick-start/</p>
                <ul>
                {
                    articleList && articleList.map( (article, index) =>
                        <li key={ index+"getStaticPaths" } >
                            <Link href={ "/pantheon-drupal-kit-react/"+article.id }><a>{ article.title }</a></Link>
                        </li>
                    )
                }
                </ul>

                @------------------------------------------------------@<br />
                @------------------------------------------------------@<br />
                <br />
                <ArticleList articleList={ articleList.filter((article)=> article.title.includes("Russia") ) } spanText="All Russia List" />

                <ArticleList articleList={ articleList.filter((article)=> /Russia|Putin/.test(article.title) ) } spanText="All 'Russia | Putin' List" />
                
                @------------------------------------------------------@<br />
                @------------------------------------------------------@<br />
                <br />

                <span>
                    { /* }
                    Search By Title<input type="text" value={searchByTitle} onChange={(e) => setSearchByTitle(e)}></input>

                    Search By Title<input type="text" onInput={(event) => setSearchByTitle(event.input.value)}></input>

                    <button onClick={() => filterSearchValue('Russia')}>Filter</button>

                    { */ }


                    Search onChange&nbsp;&nbsp;<input onChange={(event) => filterOnChange(event.target.value)} />&nbsp;&nbsp;
                    <br /><br />

                    Search onButtonClick&nbsp;&nbsp;<input onChange={(event) => setSearchByTitle(event.target.value)} />&nbsp;&nbsp;<button onClick={() => filterOnClick()}>Filter</button>
                    <br /><br />

                    <ArticleList articleList={ searchArticleList } spanText="All List" />
                </span>
                <br />


            </div>
            
        </div>
    )
}


const store = new DrupalState({
    apiBase: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
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
  
    //console.log("pantheon-drupal-kit [ getServerSideProps ]");

    return {
        props: {
            article: recipesFromApi
        },
    }
}