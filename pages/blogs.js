import { useEffect, useState } from 'react';
import styles from './Blogs.module.css'
import {useRouter} from 'next/router'

import { supabase } from '../utils/supabaseClient';
import Section from '../components/Section';
import Card from '../components/Card';
import { NextSeo } from 'next-seo';
import DefaultLayout from '../layouts/DefaultLayout';
function Blogs({data,datac,da}) {

    const router = useRouter();

    const [rquery,setQuery] = useState();
    
useEffect(()=>{

    if(router.query){
setQuery(router.query.string)
}
})

function isoDateToWords(isoDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj)) {
      return "Invalid date";
    }
  
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    return `${month} ${day}, ${year}`;
  }
const d = new Date(Date.now());
    return(
<DefaultLayout isSideBar={true} isHomepage={false} cat={data.data} isActivePassive={true} >
<NextSeo
        title={`Best Study Abroad Consultant in ${d.getFullYear()}`}
        description={`See what's trending in ${d.getFullYear()} for IELTS/Study Abroad only on GoEduAbroad.`}
        openGraph={{

            url:`https://goeduabroad.com/blogs/`,
            images:[
                {
                    url:datac.data.length > 0 ? datac.data[0].img :'https://goeduabroad.com/harvard.webp',
                    alt:`Best IELTS & Study Abroad Consultant for ${da} in ${d.getFullYear()}`,
                    
                }
                
            ]
        }}
        twitter={{
            cardType:'summary',
            handle:'@goeduabroad',
        }}
        
        />
<div className={styles.post_holder}>
    <h1 className={styles.mainhead}>{`Showing all Posts`}</h1>
    <p className={styles.para}>Number of Posts : {datac?.data?.length}</p>
<Section noMargin text={''}><div className={styles.gridr}>
{datac?.data && datac?.data?.length > 0 ? datac.data.map((item,index)=>{
  return(
<>
    <Card icons={item.icons} key={index} slug={item.slug} date={item.created_at} title={item.title} description={item.intro} image={item.img}/>
  </>
  )
}):'Posts are Unavailable'}
{datac?.data?.length > 0 ? '' : <p>There is no post in this category</p>}

</div>

    </Section></div>


</DefaultLayout>)
}
export default Blogs;

export async function getServerSideProps(context) {
    // Fetch data from external API
  
  
    const [data, datac] = await Promise.all([
     await supabase
  .from('categories')
  .select('*')
  , 
  await supabase
  .from('blog_posts')
  .select('*,cat!inner(*)').eq('isActive',true).order('created_at',{ascending:false})
    ]);
    let da = 0;
 /*    function setDa(){
        
        da = data.data.filter((i,id)=>{
             
                if(i.slug == context.query.string){ return i;}
             
             })}
   if(data){
setDa();
    } */

    


    return { props: {data,datac} }

}