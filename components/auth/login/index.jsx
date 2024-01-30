import React from 'react'
import Link from 'next/link'

 const LoginComponent = () => {
  return (
    <>
      <Link href="/auth/login/admin">Admin Login Page</Link>
      <hr />
      <Link href="/auth/login/student">Student Login Page</Link>
      <hr />
      <Link href="/auth/login/teacher">Teacher Login Page</Link>
    </>
  )
}

export default LoginComponent