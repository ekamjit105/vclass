import React from 'react'

const ToDate = (obj) => {
   console.log(obj.day)
   console.log(obj) 
   let day = new Date()
    if(obj.day!==undefined)
    day = obj.day
    const m = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const str_op = day.getDate() + ' ' + m[day.getMonth()] + ' ' + day.getFullYear();
  
return (
   <> {str_op}</>
  )
}

export default ToDate