import React from 'react'
import Card from './Card.js'

const Benefits = () => {
  return (
    <div className='bg-blue-100'>
      <Card
        heading="Your Personal Speaking Coach, in Real-Time"
        img="https://cdn.prod.website-files.com/623ca68edd1e7fcbf0efec7d/6524037f748909d3e1cf842c_Image%201-p-1600.png"
        para={`Get immediate, actionable feedback on your delivery. Our AI analyzes your speech as you talk, offering insights designed to be helpful, not distracting. The best part? It's completely private—no one else knows you're using it.`}
        reverse={false}
      />
      <Card
        heading="Stay Clear, Confident, and on Pace"
        img="https://cdn.prod.website-files.com/623ca68edd1e7fcbf0efec7d/65240394d71f95097bcd4abe_Image%202-p-1600.png"
        para={`Master your delivery with a live dashboard. Our intelligent coach tracks your Pacing (WPM) to keep you engaging and flags filler words like "um," "ah," and "like." Build habits of powerful, persuasive speech with every word.`}
        reverse={true}
      />
      <Card
        heading="See What You Say, and How You Say It"
        img="https://cdn.prod.website-files.com/623ca68edd1e7fcbf0efec7d/6524043b72cfc161a0c57401_Image%205-p-1600.png"
        para={`Our platform doesn't just transcribe your speech in real-time. It analyzes your vocal tone to provide a live "Confidence" meter, helping you understand your impact and make instant adjustments to sound more authoritative and engaging.`}
        reverse={false}
      />
      <Card
        heading="Instant Insights. Zero Distractions."
        img="https://cdn.prod.website-files.com/623ca68edd1e7fcbf0efec7d/652404a4d03ac60ae71a367f_Image%204-p-1600.png"
        para={`Our tool provides a live transcript alongside a private dashboard, giving you instant insights without pulling you out of the moment. As you speak, you'll see real-time metrics on your Pacing with a live WPM gauge, a simple counter for Filler Words like "ums" and "ahs," and a Confidence meter based on your vocal tone and sentiment.`}
        reverse={true}
      />
    </div>
  )
}

export default Benefits