export function getCurrentAndNextTwoYears() {
    const currentYear = new Date().getFullYear();
   
   return  Array(4).fill().map((i,d)=>{
    return {
title:`${currentYear+d}`,
value:`${currentYear+d}`,
    }
   })
  }