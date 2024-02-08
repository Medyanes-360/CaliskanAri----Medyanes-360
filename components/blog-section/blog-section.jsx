import {info,image} from "../constants/index"
import { BlogSectionSlider } from './blog-section-slider'

export const BlogSection = () => {
    const {blogTitle1,blogTitle2,blogDesc}=info
    const {underline}=image
  return (
    <div className='bg-cream'>
      <div className='container mx-auto sm:px-0 px-3'>
      <div className='flex flex-col items-center justify-center'>
            <p className='text-sm text-cst_grey p-2'>{blogTitle1}</p>
            <div>
                <h2 className='text-cst_purple text-4xl font-semibold p-2 relative pb-6'>{blogTitle2}
                <img src={underline} alt="" className='absolute right-4036' />
                
                </h2>
            </div>
            <p className='text-cst_grey tex-base'>{blogDesc}</p>
        </div>
<BlogSectionSlider/>
      </div>
        
    </div>
  )
}
