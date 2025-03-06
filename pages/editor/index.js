import React, { useEffect, useState } from 'react';
import styles from './Editor.module.css'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import RenderEditor from '../../components/RenderEditor';
import CustomSelect from '../../components/CustomSelect';
import Notifications from '../../components/Notification';
import { supabase } from '../../utils/supabaseClient';
import ImageUploader from '../../components/ImageUploader';
import TextContentEditor from '../../components/TextContentEditor';
import PreviewComponent from '../../components/PreviewComponent';
import Indicator from '../../components/Indicator';
import Switch from '../../components/Switch'
import MultipleTags from '../../components/MultipleTags';
const CustomEditor = dynamic(() => import('../../components/CustomEditor'), {
    ssr: false,
  });
import 'react-markdown-editor-lite/lib/index.css';
import {Pagination,Select,SelectItem,Skeleton} from '@nextui-org/react'
import "tailwindcss/tailwind.css";
function Editor() {

const [isLoggedIn,setIsLoggedIn] = useState();
const [formData,setFormData] = useState();
const [activeOption,setActiveOption] = useState(0);
const [posts,setPosts] = useState();
const [leads,setLeads] = useState();
const [posteditor,setPostEditor] = useState(false);
const [posteditorData,setPostEditorData] = useState();
const [quickEdits,setQuickEdits] = useState();
const [commentBox,setCommentBox] = useState(false);
const [comments,setComments] = useState();
const [commentsList,setCommentsList] = useState();
const [catdata,setCatData] = useState();
const postsPerPage = 10

const [loading,setLoading] = useState(false);
const [contentEditable,setContentEditable] = useState();
const [addNewPost,setAddNewPost] = useState();
const [newPostData,setNewPost] = useState();
const [categories,setCategories] = useState();
const [filterEmail,setFilterEmail] = useState();
const [notificationText,setNotificationText] = useState();
const [parentCatAdder,setParentCatAdder] = useState(false)
const [pcatData,setPCatData] = useState();
const [jsonContent,setjsonContent] = useState();
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
const [isLoading, setIsLoading] = useState(true)
const [selectedAuthor,setSelectedAuthor] = useState(undefined)
const [authors,setAuthors] = useState()

useEffect(()=>{

if(localStorage.getItem('isAuth-nmnVis-Bl')){
    setIsLoggedIn(true)
    const r = localStorage.getItem('isAuth-nmnVis-El');
    setFilterEmail(r)
      
}



},[])



useEffect(()=>{
    
},[categories])
const toolbaroptions = {
    container: [['bold', 'italic', 'underline', 'strike'],        // Text formatting options
    ['link', 'image'],                                // Insert link and image options
    [{ header: [1, 2, 3, 4, 5, 6, false] }],          // Heading styles
    [{ list: 'ordered' }, { list: 'bullet' }],        // List options
    ['align'],                                        // Alignment options
    [{ color: [] }, { background: [] }],              // Text color and background color options
    ['size'],                                         // Font size option
    ['code-block'],                                   // Code block option
    ['clean']  ], 
    handlers:{
        image:uploadImage
    }                                       // Remove formatting option
};


function getCloudinaryThumbnailUrl(fullSizeImageUrl) {
    if(fullSizeImageUrl == undefined){
        return 'https://winfort.net/wp-content/themes/consultix-1/images/no-image-found-360x260.png'
    }
    const cloudinaryPattern = /https?:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/([^/]+)\/([^?]+)/;
    const match = fullSizeImageUrl.match(cloudinaryPattern);
  
    if (!match) {
      console.error('Invalid Cloudinary URL');
      return null;
    }
  
    const cloudName = match[1];
    const transformationParams = `w_150`;
    const imagePublicId = match[3];
  
    // Combine the base Cloudinary URL with the transformation parameters and image public ID
    const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationParams}/${imagePublicId}`;
  
    return thumbnailUrl;
  }




function activatePostEditor(a,b){
    setPostEditor(a);
    
    setPostEditorData(b)

}

useEffect(()=>{
getSetPosts(currentPage)
},[currentPage])





const menu = [
    {
        title:'Posts',
        action:'postList'
    }
    ,{
        title:'Categories',
        action:'category'
    },
    {
        title:'E-Mail Marketing',
        action:'marketing'
    },
    {
        title:'CRM',
        action:'crm'
    },
   
    {
        title:'Tools',
        action:'tools'
    },
    {
        title:'Settings',
        action:'configure'
    }

]
async function getComments(a){
setLoading(true)
const {data,error} = await supabase.from('comments').select("*").eq('post_id',a).order('created_at',{ascending:false});

if(data){

    setComments(data)
    setLoading(false)
}

else if(error){
    setNotification('Unable to Find Comments')
    setLoading(false)
}


}
function countMatchingComments(number) {
    const count = commentsList?.reduce((acc, post) => {
      if (post.post_id === number) {
        return acc + 1;
      }
      return acc;
    }, 0);
  
    return count;
  }
async function getCommentsCount(a){
    setLoading(true)
    const {data,error} = await supabase.from('comments').select("post_id").order('created_at',{ascending:false});
    
    if(data){
    
        setCommentsList(data)
        setLoading(false)
    }
    
    else if(error){
        setNotification('Unable to Find Comments')
        setLoading(false)
    }
    
    
    }


  

async function updatePost(a){

    if(!a){
        setNotification('Everything is Missing')
        return 
    }
    if(!a.img ){
        setNotification('Image is Empty')
        return 
    }
   
    if(!a.slug ){
        setNotification('Slug is Empty')
        return 
    }
    if(!a.title ){
        setNotification('Title is Empty')
        return 
    }
    if(!a.metaTitle ){
        setNotification('Meta Title is Empty')
        return 
    }
    if(!a.metaDesc ){
        setNotification('meta description is Empty')
        return 
    }
    if(a.cat == undefined || a.cat == null  ){
        setNotification('Category is Empty')
        return 
    }
    if(!a.intro ){
        setNotification('Intro is Empty')
        return 
    }
    if(!a.keywords ){
        setNotification('Keywords are Empty')
        return 
    }
  

const {data,error} = await supabase.from('blog_posts').update({

    intro:a.intro,
    cat:a.cat.id,
    title:a.title,
    metaTitle:a.metaTitle,
    metaDesc:a.metaDesc,
    img:a.img,
    slug:a.slug,
   jsonContent:jsonContent ? JSON.stringify(jsonContent) : a.jsonContent ,
    isActive:a.isActive,
    keywords:a.keywords,
    MarkdownData:a.MarkdownData
}).eq('id', a.id).select()
if(data){
    setNotification('Post Update Successfully');
    setPostEditor(false);
    getSetPosts(currentPage)
}

else {
    setNotification('Error Occured')
}
}

async function ApproveComments(a,b,c){

    const {data,error} = await supabase.from('comments').update({'isApproved':a}).eq('id',c).select();

if(data){

   setNotification(a ? 'Approved Comment' :'Discarded Comment');
   getComments(b)
}

else if(error){
    setNotification('Unable to Update Comment')
}
}
async function getSetPosts(page) {
    const from = (page - 1) * postsPerPage
    const to = from + postsPerPage - 1

    setIsLoading(true)
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (data) {
      setPosts(data)
      setIsLoading(false)
      setTotalPages(Math.ceil((count || 0) / postsPerPage))
    } else if (error) {
        setIsLoading(false)
      console.error('Error fetching posts:', error)
    }
  }
async function updateField(a,b,c){

    const {data,error} = await supabase.from('blog_posts').update({
        [b] : a
    }).eq('id',c).select();

    if(data){
setNotification(`Update ${b}`)

    }
    else if(error){}
}
async function addNewCategory(a){
const{data,error} = await supabase.from('categories').insert({

    title:a.name,
    slug:a.slug,
    metaTitle:a.metaTitle,
}).select()

if(data){
    setNotification('Added Category');
    getSetCategory();
}
else if(error){
    setNotification('Error Encountered')
}

}

   
async function getSetCategory(){
 const {data,error} =   await supabase
    .from('categories')
    .select('*');

    if(data){
        setCategories(data)
    }else{
        }

}

async function getUserEmail(){
    const a = localStorage.getItem('isAuth-nmnVis-El')
    
}
useEffect(()=>{
    getUserEmail()
    getCommentsCount()
    getSetCategory()
    getAuthors()
},[])


async function getAuthors(){

    const {data,error} = await supabase.from('authors').select();

    if(error){
        return
    }
    if(data){
setAuthors(data)
        return
    }
}
async function Authenticate(a){

    const {data,error} = await axios.post('/api/auth',{
a
        
    })


    if(data && data.logged == true){
        
        localStorage.setItem('isAuth-nmnVis-Bl',data.logged)
        localStorage.setItem('isAuth-nmnVis-El',data.email)
        setIsLoggedIn(data.logged);
        setFilterEmail(data.email);
        setNotification(data.message)

    } else if(data && data.logged == false){
        setNotification(data.message)
    }
    if(error){
        setNotification('Something Went Wrong') 
    }

}


const fields = [
    {
        label:'Post Title',
        key:'name',
        placeholder:'Enter Post Title',
        type:'text',
        indicator:{
            min:20,
            average:50,
            max:160,
        }

    },
    
    
]

const categoryfields = [
    {
        label:'Category Title',
        key:'name',
        placeholder:'Enter Category Title',
        type:'text'
    },
   
   
    
    {
        label:"Category Slug",
        key:'slug',
        placeholder:"Enter Category Slug",
        type:"text",
    },
     
    {
        label:"Category Meta Title for Google",
        key:'metaTitle',
        placeholder:"Enter Category Meta Title",
        type:"text",
    }
    
    
]

async function PublishNewPost(a){

    const {data,error} = await supabase.from('blog_posts').insert({

        title:a.name,
        metaTitle:a.name,
       
        cat:a.category,
        category:a.category,
        jsonContent:"[]",
        isActive:false,
       
        author:selectedAuthor ?? filterEmail,
        
    }).select();

    if(data){
        setAddNewPost(false)
        setNotification('Published Post Successfully')
        getSetPosts(currentPage)
       setAddNewPost()
    }

    else if(error){
        setNotification('Unable to Publish')
    }
}


  
function setNotification(de){

    setNotificationText(de);
    setTimeout(()=>{setNotificationText()},2500);
}

const posteditorfield = [ 
    {
        label:'Post Image',
        key:'img',
        placeholder:'Enter Post Title',
        type:'file'
        
    }, 
    
    {
    label:'Post Title',
    key:'title',
    placeholder:'Enter Post Title',
    type:'text',
    indicator:{
        min:20,
        average:60,
        max:78,
    }
},


{
    label:"Select Category",
    key:'category',
    placeholder:"Enter Category",
    type:"select",
    objects:categories? categories : '',
},

{
    label:"Enter Intro",
    key:'intro',
    placeholder:"Enter Post Intro Slug",
    type:"textarea",
},
{
    label:"Enter Keywords",
    key:'keywords',
    placeholder:"Enter Keywords Seperated by commas",
    type:"keywords",
},
{
    label:"Enter Slug",
    key:'slug',
    placeholder:"Enter Post Slug",
    type:"text",
}
,{
    label:'Meta Title',
    key:'metaTitle',
    placeholder:'Meta Title',
    type:'text'
},
,{
    label:'Meta Description',
    key:'metaDesc',
    placeholder:'Meta Description',
    type:'textarea',
    indicator:{
        min:20,
        average:120,
        max:160,
    }
},
{
    label:'Post Content',
    key:'content',
    placeholder:'Post Content',
    type:'dynamic'
},
{
    label:'Post Live',
    key:'isActive',
    placeholder:'Is Post Live?',
    type:'checkbox'
}

]





function isAllowed() {
    var allowedEmails = ['ashutoshmishra@gmail.com', 'officialnmn@gmail.com'];
    var storedValue = localStorage.getItem('isAuth-nmnVis-El');
  
    return allowedEmails.includes(storedValue);
  }


 

async function uploadImage(a,b,c){
    const imageData = new FormData;
    
    imageData.append('file',a);
    imageData.append('upload_preset','nmnblog')
    
    axios.post('https://api.cloudinary.com/v1_1/dbnrwsxj1/image/upload',imageData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }).then(resa=>{
       
    })
    
    
    
    }

    const PostSkeleton = () => (
        <div  className="flex items-center mb-2 shadow-sm space-x-4 p-4 border border-gray-200 rounded-lg">
          <Skeleton className="rounded-lg">
            <div className="h-12 w-auto aspect-video bg-default-300"></div>
          </Skeleton>
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 rounded-lg">
              <div className="h-5 w-3/4 bg-default-200"></div>
            </Skeleton>
            <div className="flex space-x-2">
              <Skeleton className="rounded-full">
                <div className="h-6 w-24 bg-success-300"></div>
              </Skeleton>
              <Skeleton className="rounded-full">
                <div className="h-6 w-36 bg-success-300"></div>
              </Skeleton>
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="rounded-lg">
              <div className="h-10 w-24 bg-primary-300"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-10 w-28 bg-primary-300"></div>
            </Skeleton>
          </div>
        </div>
      )

    return <>


    {/* Parent Category Adder */}

    {parentCatAdder ? <>

    <div className={styles.overlay}><div className={styles.inner}>
    <svg className={styles.closer} onClick={()=>{setParentCatAdder(false)}} width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z" fill="#C0382B"/></svg>
{categoryfields && categoryfields.map((i,d)=>{

return <><h2 className={styles.lbl}>{i.label}</h2>
<input disabled={loading} type={i.type} label={i.label}  placeholder={i.placeholder} className={styles.input} value={pcatData ? pcatData[i.key] : ''} onChange={(e)=>{setPCatData(res=>({...res,[i.key]:i.key == "slug" ? e.target.value.toLowerCase().replace(" ",'-'):e.target.value}))}}
    />
    </>
})}

<button className={styles.btn} onClick={()=>{
    AddNewPCategory(pcatData)
}}>Add Category</button>
</div></div>
</>:''}


{/* Post Editor */}
{loading? <div className={styles.loader}>

<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#000000"/>
<path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="#fff"/>
</svg>
</div>:''}
{posteditor && posteditorData? <div className={styles.posteditor}>
    <button onClick={()=>{setPostEditor(false),setPostEditorData()}} className={styles.decline + " " + styles.close}>Close</button>
   
    <div className={styles.blog_wrapper}><div className={styles.col1}>
{posteditorfield && posteditorfield.map((i,d)=>{


   if(i.type == "text" || i.type == "date"){
    return <><h2 className={styles.lbl}>{i.label}</h2>
    <input disabled={loading} type={i.type} label={i.label}  placeholder={i.placeholder} className={styles.input} value={posteditorData ? posteditorData[i.key] : ''} onChange={(e)=>{setPostEditorData(res=>({...res,[i.key]:i.key == "slug" ? e.target.value.toLowerCase().replace(" ",'-'):e.target.value}))}}
        />
       {i?.indicator != undefined ?  <Indicator text={posteditorData ? posteditorData[i.key] : ''} data={i.indicator}></Indicator>:''}
</>} 
else if(i.type == "textarea"){
    return <>
    <h2 className={styles.lbl}>{i.label}</h2>
<textarea disabled={loading} type={i.type} label={i.label}  placeholder={i.placeholder} className={styles.input} value={posteditorData ? posteditorData[i.key] : ''} onChange={(e)=>{setPostEditorData(res=>({...res,[i.key]:e.target.value}))}}
        />
    {i?.indicator != undefined ?  <Indicator text={posteditorData ? posteditorData[i.key] : ''} data={i.indicator}></Indicator>:''}</>
}

else if(i.type == "file"){
    return <><h2 className={styles.lbl}>{i.label}</h2>
    <ImageUploader data={{image:posteditorData ? posteditorData[i.key] : ''}} onUploadComplete={(a)=>{setPostEditorData(res=>({...res,[i.key]:a}))}}></ImageUploader></>
}

else if(i.type == "select"){return <>
<h2>{i.label}</h2>
<CustomSelect defaultIndex={posteditorData.cat.id} noPadding out z={9} objects={i?.objects} defaultText={"Select Category"} setSelect={(a)=>{setPostEditorData(res=>({...res,cat:({...res.cat,id:categories[a].id})}))}} /></>
}
else if(i.type == "dynamic"){
    

    return<><h2>{i.label}</h2>
    <div className={styles.contentwrapper}>
   
        {posteditorData?.MarkdownData != undefined ?"":<RenderEditor postData={posteditorData ? posteditorData :''}  onChange={(e)=>{setjsonContent(e)}}/>}
    </div>
    
    </> 
}

else if(i.type == "checkbox"){
    

    return<><h2>{i.label}</h2>
    <Switch value={posteditorData[i.key]} placeholder={i.placeholder} onChange={(e)=>{setPostEditorData(res=>({...res,[i.key]:e}))}}/>
    </>
}
else if(i.type == "keywords"){
    return <><h2 className={styles.lbl}>{i.label}</h2>
    <MultipleTags value={posteditorData[i.key]} placeholder={i.placeholder} onChange={(e)=>{setPostEditorData(res=>({...res,[i.key]:e}))}}/>
    </>
}
    


    
})}







<div className={styles.spacer}></div>
<div className={styles.spacer}></div>
<div className={styles.spacer}></div>

<div className={styles.buttonwrap}>
    <button onClick={()=>{updatePost(posteditorData)}}>Update</button>
    
</div>

<div className={styles.spacer}></div>
<div className={styles.spacer}></div>
</div>
<div className={styles.preview}>
<PreviewComponent data={posteditorData} postData={jsonContent}/>
    
</div>
</div>
</div>:''}
{/* Comments */}

{commentBox ? <div className={styles.commentbox}> <div className={styles.sides} onClick={()=>{setCommentBox(false),setComments()}}></div>
<ul className={styles.comments}>
    <h2>Comments on this post</h2>
    {comments && comments.map((i,d)=>{

        return <li className={styles.commentlist} style={{animationDelay:`${(d+1)*50}ms`}}>
            <div>
            <p><svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.918a2.75 2.75 0 0 1-.513 1.599C17.945 20.929 15.42 22 12 22c-3.422 0-5.945-1.072-7.487-3.237a2.75 2.75 0 0 1-.51-1.595v-.92a2.249 2.249 0 0 1 2.249-2.25h11.501ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="#222F3D"/></svg>{i.user}</p>
           <h3> {i.text}</h3></div>
           <div className={styles.cbutton}>

            <div className={styles.approve} onClick={()=>{ApproveComments(true,i.post_id,i.id)}} disabled={i.isApproved ? true : false}>Approve</div>
            <div className={styles.decline} onClick={()=>{ApproveComments(false,i.post_id,i.id)}} disabled={i.isApproved ? false : true}>Discard</div>
           </div>
           </li>
    })}
    
    {comments == undefined || comments?.length ==0 ? <div className={styles.notfoundbox}><h6>No Comment Found</h6></div>:''}
    </ul>
   
</div>:''}

    {/* Add New Post */}

    {notificationText && notificationText.length > 2 ? <Notifications text={notificationText} /> : ''}
    {addNewPost != undefined ? <div className={styles.zoverlay}>
    <div className={styles.closer} onClick={(e)=>{e.stopPropagation(),setAddNewPost(),getSetPosts(currentPage),setNewPost()}}></div>
    <div className={styles.modal}>

    {/* <div className={styles.dragarea}>
<input type={"file"} placeholder="Click to Upload File" onChange={(e)=>{uploadImage(e.target.files[0],"new"),setNewPost((res)=>({...res,img:URL.createObjectURL(e.target.files[0])})) }}/>
<p>Click Here to Upload File</p>
<img src={newPostData ? newPostData.img : ''}/>


</div> */}
{/* <div className={styles.spacer}></div> */}
<CustomSelect z="999" defaultText="Select Category" noPadding={true} objects={categories.map((i,d)=>{
return{
title:i.title,
value:i.title}

})} mainout={true} out={true} setSelect={(e)=>{setNewPost(data=>({...data,category:categories[e].id}))}}/>
<div className={styles.spacer}></div>
{fields && fields.map((i,d)=>{
    return <><h2 className={styles.lbl}>{i.label}</h2>
    <input disabled={loading} type={i.type} label={i.label}  placeholder={i.placeholder} className={styles.input} value={newPostData ? newPostData[i.key] : ''} onChange={(e)=>{setNewPost(res=>({...res,[i.key]:i.key == "slug" ? e.target.value.toLowerCase().replace(" ",'-'):e.target.value}))}}
        /></>
    
})}

<Select selectedKeys={[selectedAuthor]} label="Select Author" onSelectionChange={(e)=>{setSelectedAuthor(e.anchorKey)}} placeholder='Select Author'>
    {authors && authors.map((author,author_index)=>{
        return <SelectItem key={author.email} value={author.email}>{author.fullname}</SelectItem>
    })}
</Select>

<div className={styles.toolbarbottom}>
<div className={styles.newPost} onClick={()=>{PublishNewPost(newPostData)}}>Publish Post</div>
<div className={styles.btn} onClick={()=>{setAddNewPost()}}>Cancel</div></div>
    </div>
    </div>:''}



{/* Quick Edits */}

    {quickEdits != undefined ? <div className={styles.overlay} >
<div className={styles.closer} onClick={(e)=>{e.stopPropagation(),setQuickEdits(),getSetPosts(currentPage)}}></div>
        <div className={styles.modal}>

<div className={styles.dragarea}>
<input type={"file"} placeholder="Click to Upload File" onChange={(e)=>{uploadImage(e.target.files[0],"img",quickEdits.id),setQuickEdits((res)=>({...res,img:URL.createObjectURL(e.target.files[0])})) }}/>
<p>Click Here to Upload File</p>
<img src={quickEdits.img}/>
</div>

            <p>Click Any Field Below to Edit</p>


<h3>Title</h3>
            <div key={"title"} onClick={()=>{setContentEditable(0)}} contentEditable={contentEditable == 0? true :false } onInput={(e)=>{setQuickEdits(res=>({...res,title:e.currentTarget && e?.currentTarget?.innerText  }))}} onBlur={(e)=>{updateField(e.currentTarget.textContent,'title',quickEdits.id)}}>{quickEdits.title}</div>
            <h3>Meta Title : {quickEdits?.metaTitle?.length}/60</h3>
            <div key={"metatitle"} onClick={()=>{setContentEditable(1)}} contentEditable={contentEditable == 1? true :false } onInput={(e)=>{setQuickEdits(res=>({...res,metaTitle:e.currentTarget && e?.currentTarget?.innerText  }))}} onBlur={(e)=>{updateField(e.currentTarget.textContent,'metaTitle',quickEdits.id)}}>{quickEdits.metaTitle}</div>
            <h3>Meta Description : {quickEdits?.metaDesc?.length}/160</h3>
            <div key={"metadesc"} onClick={()=>{setContentEditable(2)}} contentEditable={contentEditable == 2? true :false } onInput={(e)=>{setQuickEdits(res=>({...res,metaDesc:e.currentTarget && e?.currentTarget?.innerText  }))}} onBlur={(e)=>{updateField(e.currentTarget.textContent,'metaDesc',quickEdits.id)}}>{quickEdits.metaDesc}</div>
           

           {/* <div onClick={()=>{setContentEditable(3)}} contentEditable={contentEditable == 3? true :false } onInput={(e)=>{}}>{quickEdits.author}</div> */}
            
        </div>
    </div>:''}
    {isLoggedIn? 
    <div className={styles.appcont}>
<div className={styles.navigation}>
    <img className={styles.navlogo} src='/edulogo.svg'/>
<ul>
{menu && menu.map((i,d)=>{
    return <li className={(activeOption == d ? styles.activeOption : '')} onClick={()=>{setActiveOption(d)}}>{i.title}</li>
})}
</ul>
</div>
<div className={styles.apparea}>
{/* Leads */}
{activeOption != undefined && activeOption == 4 && isAllowed() ? <> 

<h2>Leads Centre</h2>
<div className={styles.leadscont}>
<div className={styles.leaditem + " "  + styles.centre}>

        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Type</p>
        <p>Comapny</p>
        <p>Source</p>
        <p>Extra</p>
    </div>
{leads != undefined && leads.length > 0 && leads.map((i,d)=>{

    return <div className={styles.leaditem}>

        <p>{i.fullname}</p>
        <p>{i.email}</p>
        <p>{i.phone}</p>
        <p>{i?.type ? i.type : ''}</p>
        <p>{i?.company ? i.company : ''}</p>
        <p>{i?.source ? i.source : ''}</p>
        <p>{i?.extra ? "ithas" : ''}</p>
    </div>
})}


</div>
</>:''}


{activeOption != undefined && activeOption == 6 && isAllowed() ? <> 


</>:''}

{/* Questionnaire */}
{activeOption != undefined && activeOption == 5 ? <> 
</>:''}

{/* {Question Categories} */}
{activeOption != undefined && activeOption == 2 ? <> 
</>:''}
    {/* Categories */}

{activeOption != undefined && activeOption == 1  ?<>
<div className={styles.categories}>
    <h2>Available Categories</h2>
    <ul>
    {categories && categories.map((i,d)=>{

        return <li>{i.title}</li>
    })}</ul>


    <div className={styles.addCat}>
<h2>Add New Category</h2>
    {categoryfields && categoryfields.map((i,d)=>{
    return <><h2 className={styles.lbl}>{i.label}</h2>
    <input disabled={loading} type={i.type} label={i.label}  placeholder={i.placeholder} className={styles.input} value={catdata ? catdata[i.key] : ''} onChange={(e)=>{setCatData(res=>({...res,[i.key]:i.key == "slug" ? e.target.value.toLowerCase().replace(" ",'-'):e.target.value}))}}
        /></>
    
})}

<button onClick={()=>{addNewCategory(catdata)}} className={styles.newPost}>Add Category</button>
    </div>
</div>
</>:''}
    {/* Posts List Manager */}
    {activeOption != undefined && activeOption == 0  ? <>
    <div className={styles.toolbar}>

<button className={styles.newPost} onClick={()=>{setAddNewPost(true)}}>Add New Post</button>
    </div>
    <div className={styles.postList}>
        {isLoading ? Array(postsPerPage).fill(0).map((_, index) => <PostSkeleton key={index} />) : <>
        {posts && posts.map((i,d)=>{
            return <div className={styles.post}>
                <div className={styles.leftcont}>
                <img src={getCloudinaryThumbnailUrl(i.img)}/>
                <p className={styles.postTitle}>{i.title}</p>
               </div>
                <div className={styles.postEditTools}>
{!i.isActive ? <div className={styles.smallbadge}>Draft</div> : ''}
                <div className={styles.quickSEO}>
                {i.metaTitle && i.metaTitle.length > 5 ? <div className={styles.badge + " " +(i.metaTitle.length < 20 || i.metaTitle.length > 60 ? styles.red : styles.green)}>Meta Title : {i.metaTitle.length < 20 || i.metaTitle.length > 60 ? "Improve" : 'Good'}</div>:<div className={styles.badge + " " + styles.red}>Missing Meta Description</div>}
{i.metaDesc && i.metaDesc.length > 5 ? <div className={styles.badge + " " +(i.metaDesc.length < 120 ? styles.red : styles.green)}>Meta Description : {i.metaDesc.length > 120 ? "Good" : 'Improve'}</div>:<div className={styles.badge + " " + styles.red}>Missing Meta Description</div>}

                </div>

                <button onClick={()=>{setCommentBox(true),getComments(i.id)}} className={styles.quickEdit}>
                {countMatchingComments(i.id) > 0 ?<p className={styles.commentbadge}>{countMatchingComments(i.id)}</p> :''}
                    Comments</button>
                <a onClick={()=>{activatePostEditor(true,i)}} target={"_blank"} className={styles.quickEdit}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.94 5 5.061 5.06-.962.962a6.5 6.5 0 0 0-7.016 7.016l-1.96 1.96a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.92l1.394-5.116a2.25 2.25 0 0 1 .58-1L13.94 5Zm7.091-2.03a3.579 3.579 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.061 0ZM14.28 13.974a2 2 0 0 1-1.441 2.497l-.584.144a5.729 5.729 0 0 0 .006 1.807l.54.13a2 2 0 0 1 1.45 2.51l-.187.632c.44.386.94.699 1.484.921l.494-.518a2 2 0 0 1 2.899 0l.498.525a5.28 5.28 0 0 0 1.483-.913l-.198-.686a2 2 0 0 1 1.442-2.496l.583-.144a5.729 5.729 0 0 0-.006-1.808l-.54-.13a2 2 0 0 1-1.45-2.51l.187-.63a5.28 5.28 0 0 0-1.484-.923l-.493.519a2 2 0 0 1-2.9 0l-.498-.525c-.544.22-1.044.53-1.483.912l.198.686ZM17.501 19c-.8 0-1.45-.672-1.45-1.5 0-.829.65-1.5 1.45-1.5.8 0 1.45.671 1.45 1.5 0 .828-.65 1.5-1.45 1.5Z" fill="#000000"/></svg>
                    Edit in Editor</a>
                    
                    
                
                    </div>
            </div>
        })}</>}
    </div>
    <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}

          onChange={(page) => setCurrentPage(page)}
          color="primary"
          size="lg"
        />

    
    </>
    :'' }
</div>
    </div>
    :<div className={styles.logform}>
        <h2>Please Login to Admin Panel</h2>
        <input type={"text"} placeholder="Enter Email" onChange={(e)=>{setFormData((res)=>({...res,email:e.target.value}))}}/>
        <input type={"password"} placeholder="Enter Password" onChange={(e)=>{setFormData((res)=>({...res,password:e.target.value}))}}/>
        <button onClick={()=>{
            Authenticate(formData)
        }}>Login</button>
        </div>}
    </>
}

export default Editor;

  