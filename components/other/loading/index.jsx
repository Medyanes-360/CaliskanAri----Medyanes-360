import HashLoader from "react-spinners/HashLoader";

const LoadingScreen = ({ isloading = false }) => {
  return (
    <>
    { isloading && 
        <div className='relative h-full'>
            <div className='absolute w-full min-h-[900px] md:min-h-screen h-full  min-w-screen  bg-black opacity-90 z-50 flex justify-center items-center flex-col gap-6'>
                <HashLoader
                color="#3d7bf1"
                aria-label="Loading Spinner"
                cssOverride={{}}
                size={100}
                loading={isloading}
                />
                <h2 className='text-white font-bold text-2xl'>Yükleniyor...</h2>
            </div>
        </div>   
    }
    </>
  )
}

export default LoadingScreen
