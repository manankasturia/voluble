import React from 'react'

const Card = ({img , heading , para,reverse=false}) => {
  return (
    <div className={`min-h-[80vh] w-full flex ${reverse ? "flex-row-reverse" : ""} mt-4 text-black`}>
    <div className=" w-[60%] flex flex-col items-center justify-center pl-20 pr-20 text-center md:text-left">
        <h1 className="text-5xl font-bold">{heading}</h1>
        <div className="text-2xl mt-10">{para}</div>
    </div>
    <div className="w-[40%] flex justify-center items-center">
        <img src={img} alt="image" className="max-w-full max-h-full object-contain" />
    </div>
</div>
  )
}

export default Card