import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
      <div className="container-fluid">
        <a href="#" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <strong>Album</strong>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link href="/" passHref>
                <a className="nav-link active" aria-current="page" >Home</a>
              </Link>  
            </li>
            <li className="nav-item">
              <Link href="/users-jsonplaceholder" passHref>
                <a className="nav-link">Users-JsnPlc</a>
              </Link>  
            </li>
            <li className="nav-item">
              <Link href="/next-drupal" passHref>
                <a className="nav-link" >Next-Drupal</a>
              </Link>  
            </li>
            <li className="nav-item">
              <Link href="/pantheon-drupal-kit" passHref>
                <a className="nav-link" >Panthoen-Drupal-Kit</a>
              </Link>  
            </li>
            <li className="nav-item">
              <Link href="/jsonapi" passHref>
                <a className="nav-link" >JSON:API</a>
              </Link>  
            </li>
            <li className="nav-item">
              <Link href="/" passHref><a className="nav-link disabled">Disabled</a></Link> 
            </li>
          </ul>
          <form role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>
  )
}