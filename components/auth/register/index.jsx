import React from 'react'
import Link from 'next/link'

 const RegisterComponent = () => {
  return (
    <div>
        <Link href="/auth/register/student">
            <div>
                <h4>Öğrenci Kayıt</h4>
            </div>
        </Link>
        <Link href="/auth/register/teacher">
            <div>
                <h4>Öğretmen Kayıt</h4>
            </div>
        </Link>
    </div>
  )
}

export default RegisterComponent;