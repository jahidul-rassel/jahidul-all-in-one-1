import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

export default function index( {users} ) {
  console.log(users);

  return (
    <div className='divPostList'>
      <Head>
        <title>Users List</title>
      </Head>

      <h3>All Users List</h3>

      <div className='postsListDiv'>
        <p>getServerSideProps</p>
        <ul>
          {
            users.map( (user, index) => 
                <li key={ index+"getServerSideProps" } ><Link href={ "/users-jsonplaceholder/"+user.id+"/getServerSideProps" }><a>{ user.name }[ getServerSideProps ]</a></Link></li>
              )
          }
          
          <li><Link href="#"><a>DEMO User</a></Link></li>
        </ul>

        <p>getStaticProps</p>  
        <ul>
          {
            users.map( (user, index) =>
                <li key={ index+"getStaticPaths" } ><Link href={ "/users-jsonplaceholder/"+user.id }><a>{ user.name }[ getStaticPaths ]</a></Link></li>
              )
          }
          
          <li><Link href="#"><a>DEMO User</a></Link></li>
        </ul>
      </div>
    </div>
  )
}


//  For Server Side Genaration [ SSG - START ]
/*
If you export a function called getStaticProps (Static Site Generation) from a page,
Next.js will pre-render this page at build time using the props returned by getStaticProps.
*/
export async function getStaticProps( { params } ) {
  console.log("getStaticProps");
  const req = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await req.json();

  if (!data) {
      return {
          notFound: true
      }
  }

  return {
      props: { users: data },
  }
}

/*
If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes,
Next.js will statically pre-render all the paths specified by getStaticPaths.
export async function getStaticPaths() {
  console.log("getStaticPaths");
  const req = await fetch('http://localhost:3000/carsList.json');
  const data = await req.json();

  const paths = data.map(car => {
      return { params: { id: car } }
  });

  return {
      paths,
      fallback: false
  };
}
*/
//  For Server Side Genaration [ SSG - END ]