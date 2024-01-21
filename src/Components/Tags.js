import React from 'react'

function Card({text}){
    return <div className='tag'>
        {text}
    </div>
}

function Tags({tags}) {    
   
  return (
    <div className='tag-container'>
        {tags.map(tag=>{
            return <Card text={tag}/>
        })}
    </div>
  )
}

export default Tags