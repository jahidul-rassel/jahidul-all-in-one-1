import React from 'react';

import Link from 'next/link';
import Post from '../../styles/Post.module.css';
import Head from 'next/head';

export default function Details( props ) {

  console.log( props ); 

  console.log( Object.entries(props.data).length ); 

  if( Object.entries(props.data).length === 0 ) {
    return (<div>ERROR IN REQUEST DATA [getServerSideProps]</div> );
  }
  else {
    
    return (
      <div>
        <Head>
          <title>getServerSideProps</title>
        </Head>
    
        <h1 className={Post.title}>getServerSideProps</h1>
        <h1 className={Post.title}>{ props.data.name } [ { props.data.email } ]</h1>
        <p className={Post.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
        <p className={Post.text}>
          <b>Address: </b><br />
          Suite: { props.data.address.suite }<br />
          Zipcode: { props.data.address.zipcode }<br />
          Street: { props.data.address.street }<br />
          City: { props.data.address.city }<br />
        </p>
        <Link href="/users-jsonplaceholder">
            <a className={Post.btn}>See USERS Listing</a>
        </Link>
      </div>
    );
  } 
}


export async function getServerSideProps( context ) {

  console.log(context.query);

  try {
    var userId = context.query.userid[0];

    // Fetch data from external API
    //console.log(`https://jsonplaceholder.typicode.com/users/`+userId);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/`+userId);
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } }

  } catch (error) {
    console.error("Unable to fetch articles: ", error);
    return {
      props: {},
    };
  }
}
