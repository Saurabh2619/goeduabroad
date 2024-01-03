import { useEffect, useState } from 'react';
import styles from './Posts.module.css'
import {useRouter} from 'next/router'
import { supabase } from '../../utils/supabaseClient';

import HTML_Render from '../../components/HTML_Render';
import Block from '../../components/Block';
import React from 'react'
import ReactDOM from 'react-dom'
import CodeBlock from '../../components/CodeBlock';
import { NextSeo } from 'next-seo';
import Head from 'next/head'
import Image from '../../components/Image';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import Card from '../../components/Card';
import DefaultLayout from '../../layouts/DefaultLayout';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import RenderEditor from '../../components/RenderEditor';
function Post({data,datac}) {
    
    const router = useRouter();
    const [mobile,setMobile] = useState("desktop");
    const [comments,setComs] = useState();
    const [Localcomments,setLocalComments] = useState([]); 
    const [rquery,setQuery] = useState();
    const [relatedPosts,setRelatedPosts] = useState();
   const [commentData,setCommentData] = useState();
    const final = datac.data[0];

    useEffect(()=>{
  
        function setWidth(){
          
          if(window.innerWidth < 768){
            setMobile('mobile');
          
          }
          else if(window.innerWidth < 968){
            setMobile('tablet')
          }
          else{
            setMobile('desktop');
          }
        }
        window.addEventListener("resize",(e)=>{
      setWidth()
        })
      
        window.addEventListener('load',()=>{
          setWidth();
        })
      },[])

    //Renderer
    const CustomRender = (props)=> {


const cdomponents =
{
    block:Block,
    htmlRender:HTML_Render,
    codeBlock:CodeBlock,
    image:Image,
    button:Button
}
const data = props.data;
const getOb = ()=> data && data.map((i,id)=>{
return React.createElement(cdomponents[i.component],i.props);

}
)

return getOb();
 }
//Renderer End


useEffect(()=>{

    if(router.query){
setQuery(router.query.slug)
}

})


    function getDate(data){
        const r = new Date(data);
        return r.toDateString();
    }


   
    async function getCom(a){
    
        await supabase.from('comments').select('*').eq('post_id',a).then((res)=>{
          if(!comments){
            setComs(res.data)
          }else{}
        });
    
       
          
           
       
    }

    async function getRelatedPosts(a,b){
        await supabase.from('blog_posts').select('*').match({'cat':b,"isActive":true}).neq('id',a).limit(5).then((res)=>{
            
              setRelatedPosts(res.data)
           
          });

    }
    useEffect(()=>{
        if(final){
            getRelatedPosts(final.id,final.cat);
            getCom(final.id)
    
    }
    
    },[])   
async function addComment(a,b,c,d){

const {data,error} = await supabase.from('comments').insert({

    post_id :final.id,
    user:a,
    text:b,
    isApproved:false,
    isReply:c,
     replyTo:c? d:null,
}).select();
if(data){
    
    setLocalComments(res=>([...res,data[0]]))
}else{}

}
    return(
    <DefaultLayout isSideBar={true} isHomepage={false} cat={data.data} isActivePassive={true} >
        <Head>
{/* {final && final.structured_data && final.structured_data.map((i,d)=>{
    return <script key={`structured-data-${d}`}
    type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(i.data)}}></script>
})} */}
          
        </Head>
        <NextSeo
      title={final.title }
      description={`${final.metaDesc}| Best Study Abroad Consultant in India`}
      canonical={`https://goeduabroad.com/services/${final?.slug}`}
      openGraph={{
        type: "article",
        url: `https://goeduabroad.com/services/${final?.slug}`,
        title: final?.title + " | EduAbroad",
        description : final && final.metaDesc? final.metaDesc : final?.title,
        article: {
          publishedTime: final.created_at,
          modifiedTime: final.created_at,
          authors: ["Ashutosh Mishra"],
          tags: final?.tags? final.tags : '',
        },
        images: [
          {
            url: final.img,
           
            alt: final.title + " | EduAbroad",
          },
        ],
      }}
    />
       
       <div className={styles.mainholder}>
    <article className={styles.post_holder}>
<div className={styles.spacer}></div>
<img className={styles.featured} src={final.img} alt={final.title}/>
        <h1 className={styles.ptitle}>{final.title}</h1>
        <div className={styles.meta}>
            <Tooltip content={<div className={styles.details}>
               
                <p className={styles.authors}>{final.author.description}</p>
                <div className={styles.icons}>
              {/*   {final?.author?.socials && final.author.socials.map((i,d)=>{
return <a href={i.link}><img src={i.icon}/></a>
                })} */}
                
                </div>
                <div></div>
            </div>}>
           
           <div className={styles.author}> <img src={final.author.profile_image} width={44} height={44} /> <div className={styles.namebox}><p>{final.author.fullname} <span className={styles.auth}>Author</span></p><p>{final.author.badge}</p></div></div> </Tooltip>
        
        <p>{getDate(final.created_at)}</p> <p>{comments?.length} Comments</p> </div>
        <div className={styles.content}>
        
            
       
           
        
            
            {final.MarkdownData ?  <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]}>{final.MarkdownData}</ReactMarkdown>:<RenderEditor isJSON={false} renderFrontEndOnly={true} postData={final}  onChange={(e)=>{}}></RenderEditor>}
            </div>
        
       


        <h2 className={styles.ptitle}>Comments ({comments?.filter((i,d)=>{ if(i.isApproved){return i}}).length})</h2>
<div className={styles.comments}>
    
{comments && comments.length > 0 ? comments.filter((i,d)=>{
    if(i.isApproved && !i.isReply){return i}
}).map((item,index)=>{
return(<>
<div className={styles.commentsCont}>
    
    <div className={styles.cout}>
    <div className={styles.us}>{item && item.user? item.user.split(' ').map((i,m)=>{
        
    return(i.substring(0,1))
    }) : ''}
    
    </div>

    <div className={styles.hold}><p className={styles.user}>{item.user}</p>
    <p>{item.text}</p></div></div>
    {comments && comments.filter((i,d)=>{
if(i.isReply && i.replyTo == item.id){
    return i 
}

    }).map((i,d)=>{
        return  <div className={styles.cout + " " + styles.reply}>
            <div className={styles.replyicon}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.704 8.706A1 1 0 1 0 8.29 7.292l-4.997 5.004a1 1 0 0 0 0 1.413l4.997 4.998a1 1 0 1 0 1.415-1.414L6.41 14H13a8 8 0 0 0 7.996-7.75L21 6a1 1 0 1 0-2 0 6 6 0 0 1-5.775 5.996L13 12H6.414l3.29-3.294Z" fill="#222F3D"/></svg></div>
        <div className={styles.us}>{i && i.user? i.user.split(' ').map((z,m)=>{
            
        return(z.substring(0,1))
        }) : ''}
        
        </div>
    
        <div className={styles.hold}><p className={styles.user}>{i.user}</p>
        <p>{i.text}</p></div></div>
    })}

    </div>
    </>)
}):<p>No Comment found on this post. You can leave a comment</p>}
{/* Start UnApproved Comments */}
{Localcomments && Localcomments.length > 0 ? Localcomments.filter((i,d)=>{
    if(!i.isApproved && !i.isReply){return i}
}).map((item,index)=>{
return(<>
<div className={styles.commentsCont + " " + styles.unapproved}>
    <p style={{textAlign:"left",width:"100%",fontFamily:"Modernist"}}>Unapproved Comment</p>
    <div className={styles.cout}>
    <div className={styles.us}>{item && item.user? item.user.split(' ').map((i,m)=>{
        
    return(i.substring(0,1))
    }) : ''}
    
    </div>

    <div className={styles.hold}><p className={styles.user}>{item.user}</p>
    <p>{item.text}</p></div></div>
    

    </div>
    </>)
}):<p></p>}

{/* End UnApproved Comments */}
<div>
<h2 className={styles.head}>Add a Comment</h2>
<input className={styles.input} name="text" type="text" placeholder="Write your Name" onChange={(e)=>{setCommentData((res)=>({...res,name:e.target.value}))}}></input>
<textarea className={styles.comment} name="text" type="text" placeholder="Write your Comment Here" onChange={(e)=>{setCommentData((res)=>({...res,comment:e.target.value}))}}></textarea><br/>
<Button onClick={()=>{addComment(commentData.name,commentData.comment,false)}} text="Add Comment"></Button>
</div>
</div>
{relatedPosts && relatedPosts.length > 0 ?
<div className={styles.relatedWrap}>
    
    <h2 className={styles.head}>Related Posts</h2>
<Swiper
     modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={mobile === "mobile" ? 1.2 : mobile === "tablet" ? 2 : 2}
      loop={true}
      autoplay={true}
      
      pagination={{ clickable: true }}
      centeredSlides={mobile === "desktop" || mobile === "tablet" ? false : false}
      onSlideChange={() =>{}}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
       
        swiper.navigation.update();
      }}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev',
        clickable:true,
      }}
   
    >


     
      
      {relatedPosts && relatedPosts.map((item,index)=>{

return(<>

<SwiperSlide key={index}><Card icons={item.icons} title={item.title} slug={item.slug} description={item.intro} image={item.img}/></SwiperSlide>

</>)
})} 


    </Swiper>

</div> : ''}

    </article>
    <div className={styles.sidebar}></div></div>
    
    </DefaultLayout>)
}
export default Post;
export async function getServerSideProps(context) {
  // Fetch data from external API


  const [data, datac] = await Promise.all([
   await supabase
.from('categories')
.select('*')
, 
await supabase
.from('blog_posts')
.select('*,author!inner(*)')
.match({'slug':context.query.slug,'isActive':true})
  ]);

if(datac?.data?.length == 0){
  return {
      redirect: {
        destination: '/404', // Set the destination route where you want to redirect
        permanent: false, // Set this to true for a 301 permanent redirect, or false for a 302 temporary redirect
      }}
}








  
  return { props: {data,datac} }
}