'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Stepper from "@/components/other/Stepper";
import LoadingScreen from '@/components/other/loading';
import {postAPI} from '@/services/fetchAPI/index';
import studentValidationSchema from './formikData';
import { Formik, Form, FormikProps } from 'formik';
import Input from '@/components/formElements/input';
import Select from '@/components/formElements/select';
import { ToastContainer, toast } from 'react-toastify';
import ErrorText from '@/components/formElements/errorText';
import schools from "@/mocks/allSchool.json"


 const StudentRegisterComponent   = ({ CitiesData }) => {

  const PageRole = 'student';
  const PageLabelUpper = 'ÖĞRENCİ';
  const PageLabelLover = 'öğrenci';
  const PageLabelNormal = 'Öğrenci';

  const [city, setCity] = useState ('');
  const [town, setTown] = useState ('');
  const [towns, setTowns] = useState([]);
  const [schooltype, setSchooltype] = useState('');



  // yükleme ekranları tetikleneceği zaman çalışan state.
  const [isloading, setIsloading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [schollNames, setschollNames] = useState([]);
  
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setschollNames(schools.filter((ft) => ft.dc_District.toLowerCase() === town));
    setSchooltype('');
  }, [town]);

  useEffect(() => {
    setIsloading(false);
  }, [towns, schollNames])

  const router = useRouter();

  function nextActiveTab(e, props) {
    e.preventDefault();
    const { errors } = props;
    props.handleSubmit();
    if (activeTab === 1) {
      
      if (errors.name || errors.surname || errors.phone) {
        return props.errors;
      } else {
        props.setErrors({});
        props.setTouched({});
      }
    }
    if (activeTab === 2) {
      if (
        errors.city ||
        errors.town ||
        errors.schooltype ||
        errors.schollName ||
        props.values.schollName === '' ||
        errors.class
      ) {
        return props.errors;
      } else {
        props.setErrors({});
        props.setTouched({});
      }
    }
    if (activeTab === 3) return;
    setActiveTab((activeTab) => activeTab + 1);
  }

  function prevActiveTab(e) {
    e.preventDefault();
    if (activeTab === 1) return;
    setActiveTab((activeTab) => activeTab - 1);
  }
  return (
    <>
    { isloading && (<LoadingScreen isloading={isloading}/>) }
      <div className={styles.main}>
        
        <ToastContainer
          className='4xl:text-4xl min:w-40'
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />

        <Formik
          validateOnMount={true}
          // input verileri
          initialValues={{
            role: PageRole,
            name: '',
            surname: '',
            phone: '',
            city: '',
            town: '',
            schooltype: '',
            schollName: '',
            class: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          // input check
          validationSchema={studentValidationSchema}
          onSubmit={(values) => {
            setIsloading(true);
            // kullanıcı 2 şifresini de doğru girerse artık "passwordConfirm" değerine ihtiyacımız olmayacak.
            // burada temizleriz. prisma hata veriyor (veri tabanında olmayan bir değer) gönderidğimiz için.
            delete values.passwordConfirm;

            // girilen telefonlarda boşlukları siler ve sonrasında son 10 haniesini alma
            values.phone = values.phone.replace(/\s/g, "").slice(-10);
            

            postAPI("/auth/register", values).then((res) => {
              
              if (res.status === 'success') {
                // Giriş başarılı ise ekrana "blur" efekti verir
                setIsloading(false);
                setIsRegister(true);

                toast.success(res.message);
                //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                const timeOut = setInterval(() => {
                  router.push(`/auth/login/${values.role}`);
                  clearInterval(timeOut);
                }, 4000);

                values.password = '';
                values.passwordConfirm = '';
              } else {

                setIsloading(false);
                // girilen mail adresi daha önce kullanılmış ise hata mesajı verir. ve şifreleri temizler.
                toast.error(
                  res.message
                    ? res.message
                    : 'Girdiğiniz bilgileri kontrol ediniz.'
                );
                values.password = '';
                values.passwordConfirm = '';
              }
            });
          }}
        >
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              className={`${isRegister ? 'blur' : ''} ${styles.main_container} md:scale-75 2xl:scale-75 4xl:scale-50`}
            >
              <div className={styles.container}>
                <div className={styles.container_left_side}>
                  <img
                    className={styles.left_side_image}
                    src='https://source.unsplash.com/user/erondu/1600x900'
                    alt='img'
                  />
                </div>

                <div className={styles.container_right_side}>
                  <div className='w-full'>
                    <div className={styles.right_side_logo}>
                      <div
                        className={styles.right_side_logoImage}
                      >
                        <Image
                          src='/logo.png'
                          width='150'
                          height='150'
                          alt='logo'
                          priority={true}
                        />
                      </div>
                    </div>
                    <h1 className='mb-4 md:mb-8 tracking-wider uppercase mt-4 text-2xl 2xl:text-3xl 4xl:text-5xl font-bold text-center text-white bg-secondary p-4'>
                      {`${PageLabelUpper} Kayıt`} 
                    </h1>
                    {/* Progress Bar (Stepper) */}
                    <div className='grid gap-8 mx-0 md:mx-8 row-gap-0 grid-cols-3 4xl:gap-40'>
                      {/* Progress Bar Step 1 */}
                      <Stepper
                        activeTab={1}
                        
                        title={`${PageLabelNormal} Bilgileri`}
                        activeTitle={activeTab == 1}
                        showIcon={activeTab != 1}
                        icon={<FaCheck size={46} />}
                        stepCompleted={activeTab != 1}
                        
                      />
                      {/* Progress Bar Step 2 */}
                      <Stepper
                        activeTab={2}
                        title='Okul Bilgileri'
                        activeTitle={activeTab == 2}
                        showIcon={activeTab > 2}
                        icon={<FaCheck size={46}/>}
                        stepCompleted={activeTab > 2}
                      />
                      {/* Progress Bar Step 3 */}
                      <Stepper
                        activeTab={3}
                        title='Giriş Bilgileri'
                        activeTitle={activeTab == 3}
                        showIcon={activeTab == 3 && isRegister}
                        icon={<FaCheck  size={46}/>}
                        stepCompleted={isRegister}
                        lastStep={true}
                      />
                    </div>
                    <div className='block w-full opacity-100 4xl:mb-6 relative z-10'>
                      {/* Step 1 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 1}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >

                        <div className={styles.container_first_row}>

                          <Input
                            labelValue='İsim'
                            disabled={isloading || isRegister}
                            id='name'
                            name='name'
                            type='text'
                            
                            onChange={props.handleChange}
                            placeholder='İsminizi giriniz.'
                            
                          />
                          {props.touched.name &&
                          <ErrorText >
                            {props.errors.name}
                          </ErrorText>
                          }
                          
                        </div>
                        <div className={styles.container_first_row}>
                        <Input
                            labelValue='Soyisim'
                            disabled={isloading || isRegister}
                            id='surname'
                            name='surname'
                            type='text'
                            
                            onChange={props.handleChange}
                            placeholder='Soyisminizi giriniz.'
                            
                          />
                          {props.touched.surname &&
                            <ErrorText >
                              {props.errors.surname}
                            </ErrorText>
                           }
                        </div>
                        <div className={styles.container_middle_row}>
                        <Input
                            labelValue='Telefon'
                            disabled={isloading || isRegister}
                            id='phone'
                            name='phone'
                            type='text'
                            
                            onChange={props.handleChange}
                            placeholder='5xxxxxxxxx'
                            
                          />
                          {props.touched.phone &&
                          <ErrorText >
                            {props.errors.phone}
                          </ErrorText>
                          }
                        </div>
                      </Transition>
                    </div>
                    <div className='w-full relative z-10'>
                      {/* Step 2 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 2}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <div className='grid grid-cols-2 gap-2'>
                          <div>
                            <Select
                            labelValue='Okulun Bulunduğu İl'
                              id='city'
                              name='city'
                              optionLabel='İl Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                                setCity(e.target.value.toString());
                                props.values.town = '';
                              }}
                            >
                              <option disabled={true} className=' hidden md:block bg-gray-200 text-[5px]'></option>
                              {CitiesData.length > 0 &&
                                  CitiesData.map((item, index) => {
                                    return (
                                      <option key={index} value={item.name}>
                                        {item.name}
                                      </option>
                                    );
                              })}
                            </Select>

                            {props.touched.city &&
                              <ErrorText >
                                {props.errors.city}
                              </ErrorText>
                            }
                          </div>
                          <div>
                            <Select
                            labelValue='Okulun Bulunduğu İlçe'
                              id='town'
                              name='town'                              
                              disabled={city ? false : true}
                              optionLabel='İlçe Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                                setTown(e.target.value.toString());
                                props.values.schollName = '';
                                props.values.schooltype = '';
                              }}
                            >
                              <option disabled={true} className='hidden md:block bg-gray-200 text-[5px]'></option>
                              {city !== "" &&
                                CitiesData.filter((ft) => ft.name.toLowerCase() === city.toLowerCase())[0].counties.map((item, index) => {
                                  return (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  );
                                })}
                            </Select>

                            {props.touched.town &&
                              <ErrorText >
                                {props.errors.town}
                              </ErrorText>
                            }
                        
                          </div>
                          <div>
                            
                          <Select
                            labelValue='Okul Türü'
                              id='schooltype'
                              name='schooltype'
                              
                              disabled={town ? false : true}
                              optionLabel='Okul Türü Seç'
                              onChange={(e) => {
                                e.target.value === 'anaokul' ? props.values.class = "anaokul" : props.values.class = "";
                                props.handleChange(e);
                                setSchooltype(e.target.value);
                                props.values.schollName = '';
                              }}
                            >
                              <option disabled={true} className=' hidden md:block bg-gray-200 text-[5px]'></option>
                              {town && (
                                <>
                                  <option value='anaokul'>Anaokulu</option>
                                  <option value='ilkokul'>İlkokul</option>
                                  <option value='ortaokul'>Ortaokul</option>
                                  <option value='lise'>Lise</option>
                                  <option value='diger'>
                                    Okulum Listede Yok
                                  </option>
                                </>
                              )}
                            </Select>

                            {props.touched.schooltype &&
                              <ErrorText >
                                {props.errors.schooltype}
                              </ErrorText>
                            }

                          </div>
                          {props.values.schooltype === 'diger' ? (
                            <div>
                              <Input
                                  labelValue='Okul İsmi'

                                  id='schollName'
                                  name='schollName'
                                  type='text'
                                  disabled={schooltype || isloading || isRegister ? false : true}
                                  
                                  onChange={props.handleChange}
                                  placeholder='Okul ismini giriniz.'
                                  
                                />
                                {props.touched.schollName &&
                                  <ErrorText >
                                    {props.errors.schollName}
                                  </ErrorText>
                                }
                              
                            </div>
                          ) : (
                            <div>
                              <Select
                            labelValue='Okul İsmi'
                              id='schollName'
                              name='schollName'
                              
                              disabled={schooltype ? false : true}
                              optionLabel='Okul Seç'
                              onChange={(e) => {
                                props.handleChange(e);
                              }}
                            >
                              <option disabled={true} className=' hidden md:block bg-gray-200 text-[5px]'></option>
                              {schollNames.length > 0 &&
                                  props.values.schooltype &&
                                  
                                  schollNames.map((item, index) => {
                                    return (
                                      <option key={index} value={item.dc_SchoolName}>
                                        {item.dc_SchoolName}
                                      </option>
                                    );
                              })}
                            </Select>

                            {props.touched.schollName &&
                              <ErrorText >
                                {props.errors.schollName}
                              </ErrorText>
                            }
                            </div>
                          )}
                        </div>
                        <div className={schooltype === "anaokul" ? "hidden" : "block"}>
                        <Select
                            labelValue='Sınıf'
                              id='class'
                              name='class'
                              
                              disabled={schooltype ? false : true}
                              optionLabel='Sınıf Seç'
                              onChange={props.handleChange}
                            >
                              <option disabled={true} className=' hidden md:block bg-gray-200 text-[5px]'></option>
                              {schooltype === 'ilkokul' &&
                                <>
                                  <option value='1. Sınıf'>1. Sınıf</option>
                                  <option value='2. Sınıf'>2. Sınıf</option>
                                  <option value='3. Sınıf'>3. Sınıf</option>
                                  <option value='4. Sınıf'>4. Sınıf</option>
                                </>
                              }
                              {schooltype === 'ortaokul' &&
                                <>                              
                                  <option value='5. Sınıf'>5. Sınıf</option>
                                  <option value='6. Sınıf'>6. Sınıf</option>
                                  <option value='7. Sınıf'>7. Sınıf</option>
                                  <option value='8. Sınıf'>8. Sınıf</option>
                                </>
                              }
                              {schooltype === 'lise' &&
                                <>
                                  <option value='9. Sınıf'>9. Sınıf</option>
                                  <option value='10. Sınıf'>10. Sınıf</option>
                                  <option value='11. Sınıf'>11. Sınıf</option>
                                  <option value='12. Sınıf'>12. Sınıf</option>
                                </>
                              }
                              {schooltype === 'diger' &&
                                <>
                                <option disabled={true} className=' hidden md:block bg-gray-200 text-[5px]'></option>
                                  <option value='anaokul'>Anaokul</option>
                                  <option value='1. Sınıf'>1. Sınıf</option>
                                  <option value='2. Sınıf'>2. Sınıf</option>
                                  <option value='3. Sınıf'>3. Sınıf</option>
                                  <option value='4. Sınıf'>4. Sınıf</option>
                                  <option value='5. Sınıf'>5. Sınıf</option>
                                  <option value='6. Sınıf'>6. Sınıf</option>
                                  <option value='7. Sınıf'>7. Sınıf</option>
                                  <option value='8. Sınıf'>8. Sınıf</option>
                                  <option value='9. Sınıf'>9. Sınıf</option>
                                  <option value='10. Sınıf'>10. Sınıf</option>
                                  <option value='11. Sınıf'>11. Sınıf</option>
                                  <option value='12. Sınıf'>12. Sınıf</option>
                                  </>
                                }


                            </Select>

                            {props.touched.class &&
                              <ErrorText >
                                {props.errors.class}
                              </ErrorText>
                            }

                        </div>
                      </Transition>
                    </div>
                    <div className='w-full relative z-10'>
                      {/* Step 3 */}
                      <Transition
                        className='mx-8 my-4 max-w-full'
                        show={activeTab === 3}
                        enter='transition-all ease-in-out duration-500 delay-[200ms]'
                        enterFrom='opacity-0 translate-y-6'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition-all ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <div className={styles.container_end_row}>
                        <Input
                            labelValue='E-mail'
                            disabled={isloading || isRegister}
                            id='email'
                            name='email'
                            type='email'
                            
                            onChange={props.handleChange}
                            placeholder='Mail adresinizi giriniz.'
                            
                          />
                          {props.touched.email &&
                          <ErrorText >
                            {props.errors.email}
                          </ErrorText>
                          }

                        </div>
                        <div className={styles.container_end_row}>
                        <Input
                            labelValue='Şifre'
                            disabled={isloading || isRegister}
                            id='password'
                            name='password'
                            type='password'
                            
                            onChange={props.handleChange}
                            placeholder='******'
                            
                          />
                          {props.touched.password &&
                          <ErrorText >
                            {props.errors.password}
                          </ErrorText>
                          }

                        </div>
                        <div className={styles.container_end_row}>

                        <Input
                            labelValue='Şifre Doğrulama'
                            disabled={isloading || isRegister}
                            id='passwordConfirm'
                            name='passwordConfirm'
                            type='password'
                            
                            onChange={props.handleChange}
                            placeholder='******'
                            
                          />
                          {props.touched.passwordConfirm &&
                          <ErrorText >
                            {props.errors.passwordConfirm}
                          </ErrorText>
                          }

                        </div>
                      </Transition>
                    </div>
                    <div className='flex justify-center items-center flex-col w-full'>
                      {/* Next, Prev, Submit Buttons */}
                      <div className='w-full px-8 flex justify-center gap-10'>
                        {/* Prev Button */}
                        {activeTab >= 2 && (
                          <button
                          disabled={isloading || isRegister}
                            type='button'
                            onClick={(e) => prevActiveTab(e)}
                            className={`${isloading == true ||  isRegister == false && "hover:bg-[#595959]"} mb-6 w-1/4 4xl:text-6xl text-white bg-secondary border rounded-md p-4`}
                          >
                            Geri
                          </button>
                        )}
                        {/* Next Button */}
                        {activeTab < 3 && (
                          <button
                          disabled={isloading || isRegister}
                            type='button'
                            onClick={(e) => nextActiveTab(e, props)}
                            className={`${
                              activeTab === 1 ? 'w-full' : 'w-3/4'
                            } mb-6 text-white text-xl bg-primary 4xl:text-4xl border rounded-md p-4 hover:bg-primarydark`}
                          >
                            Sonraki Sayfa
                          </button>
                        )}
                        {/* Submit Button */}
                        {activeTab === 3 && (
                          <button
                            disabled={isloading  == true ||  isRegister == true}
                            type='submit'
                            className={`${isloading == true ||  isRegister == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"}  w-full mb-6 text-white text-xl 4xl:text-6xl border rounded-md p-4 `}
                          >
                            Kayıt Ol
                          </button>
                        )}
                      </div>
                      <div className='text-center mb-4 gap-2 flex flex-col'>
                        <p className='text-md 2xl:text-xl 4xl:xl:text-2xl'>
                          Zaten bir hesabınız var mı?{' '}
                          <Link
                            
                            href={`${isloading || isRegister ? "#" : "/auth/login/"+PageRole}`}
                            className={`${isloading || isRegister ? "text-secondary cursor-default" : "text-primary font-semibold hover:underline"}  `}
                          >
                            {`${PageLabelNormal} Giriş.`}

                          </Link>
                        </p>
                        <p className='text-md 2xl:text-xl 4xl:xl:text-2xl'>
                          Şifrenizi mi unuttunuz?{' '}
                          <Link
                            
                            href={`${isloading || isRegister ? "#" : "/auth/forgotPassword" }`}
                            className={`${isloading || isRegister ? "text-secondary cursor-default" : "text-primary font-semibold hover:underline"}  `}
                          >

                            Şifremi Unuttum.
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      
    
    </>
    
  );
}

export default StudentRegisterComponent;