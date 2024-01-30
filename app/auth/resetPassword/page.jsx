export const dynamic = 'force-dynamic'
import ResetPasswordContainer from '@/containers/auth/resetPassword';



 const resetPassword = async ({ searchParams }) => {

    const resetPasswordComponent = await ResetPasswordContainer({ searchParams });

    return (
      <div>
        {resetPasswordComponent}
      </div>
    );
}

export default resetPassword;