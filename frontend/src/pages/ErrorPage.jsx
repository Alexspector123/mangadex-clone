import React from 'react'

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Go Back Home
      </Link>
    </div>
  )
}

export default ErrorPage