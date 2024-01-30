export const dynamic = 'force-dynamic'
import VerifyEmailContainer from '@/containers/auth/verifyEmail';


const VerifyEmailPage = async ({searchParams})  => {

  const verifyEmailContainer = await VerifyEmailContainer({ searchParams });
    
  return (
    <>
        {verifyEmailContainer}
    </>
  )
}

export default VerifyEmailPage