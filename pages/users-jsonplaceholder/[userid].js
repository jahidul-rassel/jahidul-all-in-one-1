import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Post from '../../styles/Post.module.css';
import Head from 'next/head';

export default function user( props ) {
  /*
  console.log("<<<<<-----");
  console.log(props.data);
  console.log("----->>>>>");
  */
 
  return (
    <div>
      {
        props.data && Object.entries(props.data).length > 0 && 
        <div>
          <Head>
            <title>getStaticPaths</title>
          </Head>
          <h1 className={Post.title}>getStaticPaths</h1>
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
      } 
    </div>
  );
}

// This function gets called at build time [ PART OF SSG ]
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => ({
    params: { userid: user.id.toString() }
  }));
  
  return { paths, fallback: false }
}

// This gets called at build time [ PART OF SSG ] 
export async function getStaticProps( { params } ) {
  try {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userid}`);
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