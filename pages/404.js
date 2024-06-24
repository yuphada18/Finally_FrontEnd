import React from 'react'
import Head from 'next/head'

function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Page Not Found</title>
      </Head>
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '72px', marginBottom: '24px' }}>404</h1>
          <p style={{ fontSize: '24px', marginBottom: '48px' }}>The page you are looking for could not be found.</p>
          <a href="/" style={{ fontSize: '18px', color: '#0070f3' }}>Go back to the home page</a>
        </div>
      </div>
    </>
  )
}

export default NotFound
