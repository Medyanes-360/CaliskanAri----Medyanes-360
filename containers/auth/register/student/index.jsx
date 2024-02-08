import StudentRegisterComponent from '@/components/auth/register/student/index'
import data from '@/mocks/cities.json'

 const StudentRegisterContainer = () => {

  return (
    <>
      <StudentRegisterComponent CitiesData={data}/>
    </>
  )
}

export default StudentRegisterContainer;
