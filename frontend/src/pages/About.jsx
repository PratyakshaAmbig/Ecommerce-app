import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt='' className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6  md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, debitis, consequuntur tempore deleniti corrupti recusandae perferendis laborum ullam est nihil adipisci architecto alias quis nesciunt. Quas, necessitatibus sapiente. Qui, molestias.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil a alias officia doloremque architecto placeat magnam aspernatur sint odio dolorum possimus eveniet recusandae minus atque praesentium quis veniam, dolorem assumenda.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam officiis et nemo fugiat ratione dolores iusto laudantium voluptatibus expedita fugit alias eligendi unde aliquid tempore, ipsam fuga doloribus dignissimos nesciunt.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, perferendis cupiditate suscipit et commodi id illum. Harum quia, maxime omnis dolorum, nihil qui rem sit quasi modi a est? Laborum.</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, perferendis cupiditate suscipit et commodi id illum. Harum quia, maxime omnis dolorum, nihil qui rem sit quasi modi a est? Laborum.</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, perferendis cupiditate suscipit et commodi id illum. Harum quia, maxime omnis dolorum, nihil qui rem sit quasi modi a est? Laborum.</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About