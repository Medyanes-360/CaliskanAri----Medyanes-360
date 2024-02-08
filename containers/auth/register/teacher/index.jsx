import TeacherRegisterComponent from '@/components/auth/register/teacher/index'
import data from '@/mocks/cities.json'

 const TeacherRegisterContainer = () => {


  return (
    <>
      <TeacherRegisterComponent CitiesData={data}/>
    </>
  )
}

export default TeacherRegisterContainer;
