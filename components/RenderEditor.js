import React, { useEffect, useState } from 'react'
import styles from '../pages/editor/Editor.module.css'
const HTML_Render = dynamic(()=> import ('./HTML_Render'),{})
const Switch = dynamic(()=> import ('./Switch'),{})
const Block = dynamic(()=> import ('./Block'),{})
const Spacer = dynamic(()=> import ('./Spacer'),{})
const CodeBlock = dynamic(()=> import ('./CodeBlock'),{})
const Button = dynamic(()=> import ('./Button'),{})
const Image = dynamic(()=> import ('./Image'),{})
const InputField = dynamic(()=> import ('./InputField'),{})
const Range = dynamic(()=> import ('./Range'),{})
const SwiperSlider = dynamic(()=> import ('./SwiperSlider'),{})
const Divider = dynamic(()=> import ('./Divider'),{})
import dynamic from 'next/dynamic';
const SlideEditor = dynamic(()=> import('./SlideEditor'),{})
const CustomSelect = dynamic(()=> import('./CustomSelect'),{})
const List = dynamic(()=> import('./List'),{})
const ListEditor = dynamic(()=> import('./ListEditor'),{})
const TableofContents = dynamic(()=> import('./TableofContents'),{})
const TableContentEditor = dynamic(()=> import('./TableContentEditor'),{})
const PromoBlock = dynamic(()=> import('./PromoBlock'),{})
const IconGrid = dynamic(()=> import('./IconGrid'),{})
const IconEditor = dynamic(()=> import('./IconEditor'),{})
const Charts = dynamic(()=> import('./Charts'),{})
const ChartEditor = dynamic(()=> import('./ChartEditor'),{})
const ExpandableList = dynamic(()=> import('./ExpandableList'),{})
const YTVideo = dynamic(()=> import('./YTVideo'),{})
const PromoBlockEditor = dynamic(()=> import('./PromoBlockEditor'),{})
const ShareButton = dynamic(()=> import('./ShareButton'),{})
const YTEditor = dynamic(()=> import('./YTEditor'),{})
import ImageUploader from './ImageUploader'
const ExpandableListEditor = dynamic(()=> import('./ExpandableListEditor'),{})

const CustomEditor = dynamic(() => import('./CustomEditor'), {
    ssr: false,
  });


  const headings = [
    { title: 'Heading 1', value: 1 },
    { title: 'Heading 2', value: 2 },
    { title: 'Heading 3', value: 3 },
    { title: 'Heading 4', value: 4 },
    { title: 'Heading 5', value: 5 },
    { title: 'Heading 6', value: 6 }
]
  const editorSampleRender = [{
    id:"htmlRender",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8.086 18.611 5.996-14.004a1 1 0 0 1 1.878.677l-.04.11-5.996 14.004a1 1 0 0 1-1.878-.677l.04-.11 5.996-14.004L8.086 18.61Zm-5.793-7.318 4-4a1 1 0 0 1 1.497 1.32l-.083.094L4.414 12l3.293 3.293a1 1 0 0 1-1.32 1.498l-.094-.084-4-4a1 1 0 0 1-.083-1.32l.083-.094 4-4-4 4Zm14-4.001a1 1 0 0 1 1.32-.083l.093.083 4.001 4.001a1 1 0 0 1 .083 1.32l-.083.095-4.001 3.995a1 1 0 0 1-1.497-1.32l.084-.095L19.584 12l-3.293-3.294a1 1 0 0 1 0-1.414Z" fill="#222F3D"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"HTML Renderer",
       component:HTML_Render,
      
   },
   props:[
       {
           name:"HTML DATA",
           type:"html",
           component:CustomEditor,
           key:"data",
           default:"<strong><p>Start Editing Here</p></strong>"
       }
   ]
},
{
   id:"block",
   icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.75 5a1 1 0 0 1 1-1h12.5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V6H13v12h1a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2h1V6H6.75v1a1 1 0 0 1-2 0V5Z" fill="#222F3D"/></svg>,
   color:'#ddd',
 
  frontend:{
      name:"Title & Content Block",
      component:Block,
      
  }
  ,
  props:[
   {
       name:"Title",
       type:"text",
       key:"title",
       component:InputField,
       default:'Sample Heading'
   },
   {
       name:"Description",
       type:"textarea",
       key:"description",
       component:InputField,
       default:'Sample Description'
   },
   {
       name:"Heading Level",
       type:"select",
       key:"heading",
       objects:headings,
       component:CustomSelect,
       default:2
   }
]
},{
   id:"codeBlock",
   icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.25 2h3.5a2.25 2.25 0 0 1 2.236 2h1.764A2.25 2.25 0 0 1 20 6.25v7.46a1.75 1.75 0 0 0-3.429-.454L16.058 15h-.726a1.75 1.75 0 0 0-2.89-.413l-2 2.25a1.75 1.75 0 0 0 0 2.326l2 2.25c.343.386.818.584 1.297.587H6.25A2.25 2.25 0 0 1 4 19.75V6.25A2.25 2.25 0 0 1 6.25 4h1.764a2.25 2.25 0 0 1 2.236-2Zm3.5 1.5h-3.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5Z" fill="#222F3D"/><path d="m11.19 18.498 2 2.25a.748.748 0 0 0 1.058.063.75.75 0 0 0 .063-1.06L12.754 18l1.557-1.752a.75.75 0 0 0-1.122-.996l-2 2.25a.75.75 0 0 0 0 .996ZM17.53 13.538a.75.75 0 0 1 1.44.424l-2.5 8.5a.75.75 0 1 1-1.44-.424l2.5-8.5ZM19.752 20.81a.75.75 0 0 1-.063-1.058L21.247 18l-1.558-1.752a.75.75 0 0 1 1.122-.996l2 2.25a.75.75 0 0 1 0 .996l-2 2.25a.75.75 0 0 1-1.06.063Z" fill="#222F3D"/></svg>,
   color:'#ddd',
 
  frontend:{
      name:"Code Block",
      component:CodeBlock,
     
  },
  props:[
      {
          name:"Code Data",
          type:"textarea",
          component:InputField,
          key:"data",
          default:"function()=>{console.log('trial')}"
      },{
        name:"FilePath",
        type:"text",
        component:InputField,
        key:"filepath",
        default:"Code_Block.js"
      }
  ]
},
{
   id:"button",
   icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.25 2a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 9.25 2ZM4.47 3.97a.75.75 0 0 1 1.06 0l1.75 1.75a.75.75 0 1 1-1.06 1.06L4.47 5.03a.75.75 0 0 1 0-1.06Zm9.56 0a.75.75 0 0 1 0 1.06l-1.75 1.75a.75.75 0 1 1-1.06-1.06l1.75-1.75a.75.75 0 0 1 1.06 0ZM2.5 8.75A.75.75 0 0 1 3.25 8h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm6 .737c0-1.127 1.322-1.735 2.177-1.001l8.461 7.252c.91.78.392 2.271-.805 2.32l-3.84.153c-.413.016-.801.2-1.077.507l-2.614 2.922c-.807.903-2.302.331-2.302-.88V9.488Z" fill="#222F3D"/></svg>,
   color:'#ddd',
 
  frontend:{
      name:"Button",
      component:Button,
     
  },
  props:[
      {
          name:"Button Text",
          type:"text",
          component:InputField,
          key:"text",
          default:"Button Text"
      },
      {
       name:"Button Link",
       type:"text",
       component:InputField,
       key:"href",
       default:"#"
   },
   {
       name:"Link Target",
       type:"select",
       component:CustomSelect,
       objects:[
           {
               title:'Open in New Window',
               value:'_blank'
           },
           {
               title:'Open in Same Window',
               value:'_self'
           }
       ],
       key:"target",
       default:"_self"
   }
  ]
},

{
   id:"image",
   icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.475 13.718.083-.071a.75.75 0 0 1 .874-.007l.093.078 6.928 6.8A3.235 3.235 0 0 1 17.75 21H6.25a3.235 3.235 0 0 1-1.703-.481l6.928-6.801.083-.071-.083.07ZM17.75 3A3.25 3.25 0 0 1 21 6.25v11.5c0 .627-.178 1.213-.485 1.71l-6.939-6.813-.128-.116a2.25 2.25 0 0 0-2.889-.006l-.135.123-6.939 6.811A3.235 3.235 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm-1.998 3a2.252 2.252 0 1 0 0 4.504 2.252 2.252 0 0 0 0-4.504Zm0 1.5a.752.752 0 1 1 0 1.504.752.752 0 0 1 0-1.504Z" fill="#222F3D"/></svg>,
   color:'#ddd',
 
  frontend:{
      name:"Image",
      component:Image,
     
  },
  props:[
      {
          name:"Image",
          type:"image",
          component:ImageUploader,
          key:"image",
          default:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",


      },
      {
       name:"Width",
       type:"range",
       component:Range,
       key:"width",
       suffix:'px',
       default:"100%",
       min:50,
       max:300,
   },
   {
       name:"Height",
       type:"range",
       component:Range,
       suffix:'px',
       key:"height",
       default:"300px",
       min:50,
       max:300,
   }
  ]
},
{
   id:"slideswipe",
   icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm2.5 13.5A2 2 0 0 1 4.563 16H15.5a2.5 2.5 0 0 0 2.5-2.5V6.563A2 2 0 0 1 19.5 8.5v5a4 4 0 0 1-4 4h-9ZM9 20a2 2 0 0 1-1.937-1.5h9.187a4.25 4.25 0 0 0 4.25-4.25V9.063A2 2 0 0 1 22 11v3.25A5.75 5.75 0 0 1 16.25 20H9Z" fill="#222F3D"/></svg>,
   color:'#ddd',
 
  frontend:{
      name:"Swiper Slider",
      component:SwiperSlider,
     
  },
  props:[
      {
          name:"Slider Data",
          type:"slides",
          component:SlideEditor,
          key:"data",
          default:{
           config:{
               centered:false,
               autoplay:5000,
           },
           slides:[{image:'/mainbg.png'},{image:'/mainbg.png'},{image:'/mainbg.png'}]},


      },
      
  ]
},
{
    id:"list",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.707 3.293a1 1 0 0 0-1.414 0L4 4.586l-.293-.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414Zm14.296 13.7H10L9.883 17A1 1 0 0 0 10 18.993h11.003l.117-.006a1 1 0 0 0-.117-1.994Zm0-5.993H10l-.117.007A1 1 0 0 0 10 13h11.003l.117-.007A1 1 0 0 0 21.003 11Zm0-6H10l-.117.007A1 1 0 0 0 10 7h11.003l.117-.007A1 1 0 0 0 21.003 5ZM6.707 16.293a1 1 0 0 0-1.414 0L4 17.586l-.293-.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0 0-1.414Zm-1.414-6.5a1 1 0 0 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-1-1a1 1 0 1 1 1.414-1.414l.293.293 1.293-1.293Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"List",
       component:List,
      
   },
   props:[
    {
        name:"List Item Editor",
        type:"list",
        component:ListEditor,
        key:"value",
        default:[
            {
                heading:'Sample List Title',
                description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            },
            {
                heading:'Sample List Title2',
                description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry2.'
            }
        ],


    }
       
   ]
 }
 ,
 {
    id:"tableofcontent",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 21h5v-5h-5v5ZM16 21h1.75A3.25 3.25 0 0 0 21 17.75V16h-5v5ZM21 14.5v-5h-5v5h5ZM21 8V6.25A3.25 3.25 0 0 0 17.75 3H16v5h5ZM14.5 3h-5v5h5V3ZM8 3H6.25A3.25 3.25 0 0 0 3 6.25V8h5V3ZM3 9.5v5h5v-5H3ZM3 16v1.75A3.25 3.25 0 0 0 6.25 21H8v-5H3ZM14.5 9.5v5h-5v-5h5Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Table of Content",
       component:TableofContents,
      
   },
   props:[
    {
        name:"Table of Content Editor",
        type:"list",
        component:TableContentEditor,
        key:"value",
        default:[
            {
                title:'Item 1',
                link:'#anchor1'
            },
            {
                title:'Item 2',
                link:'#anchor2'
            }
        ],


    }
       
   ]
 },
 {
    id:"horizontalline",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 3v18a1 1 0 1 0 2 0V3a1 1 0 1 0-2 0Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Divider",
       component:Divider,
      
   },
   props:[
    {
        name:"Gap",
        type:"range",
        component:Range,
        key:"gap",
        suffix:'px',
        default:"2px",
        min:1,
        max:100,
    },
    {
        name:"Border Width",
        type:"range",
        component:Range,
        suffix:'px',
        key:"borderWidth",
        default:"2px",
        min:1,
        max:15,
    }
       
   ]
 },
 {
    id:"sharebutton",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.747 4h3.464a.75.75 0 0 1 .102 1.493l-.102.007H6.747a2.25 2.25 0 0 0-2.245 2.096l-.005.154v9.5a2.25 2.25 0 0 0 2.096 2.245l.154.005h9.5a2.25 2.25 0 0 0 2.245-2.096l.005-.154v-.498a.75.75 0 0 1 1.494-.101l.006.101v.498a3.75 3.75 0 0 1-3.55 3.745l-.2.005h-9.5a3.75 3.75 0 0 1-3.745-3.55l-.005-.2v-9.5a3.75 3.75 0 0 1 3.55-3.745l.2-.005h3.464-3.464ZM14.5 6.544V3.75a.75.75 0 0 1 1.187-.61l.082.069 5.994 5.75c.28.268.306.7.077.997l-.077.085-5.994 5.752a.75.75 0 0 1-1.262-.434l-.007-.107V12.45l-.321-.006c-2.658-.008-4.93 1.083-6.865 3.301-.496.568-1.425.132-1.306-.612.827-5.14 3.6-8.045 8.19-8.559l.302-.03V3.75v2.794Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Share Button",
       component:ShareButton,
      
   },
   props:[
   {}
       
   ]
 },
 {
    id:"icons",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.25 12.028c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5a1.75 1.75 0 0 1-1.75-1.75v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm-14 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 2 16.278v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm7 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 9 16.278v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm0-7c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 9 9.278v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm7 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 16 9.278v-2.5c0-.966.784-1.75 1.75-1.75h2.5Zm-14 0c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 0 1-1.75 1.75h-2.5A1.75 1.75 0 0 1 2 9.278v-2.5a1.75 1.75 0 0 1 1.606-1.744l.144-.006h2.5Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Icon Grid",
       component:IconGrid,
      
   },
   props:[
    {
        name:"Icon Grid",
        type:"list",
        component:IconEditor,
        key:"value",
        default:{
            config:{
                size:"24px",
                borderRadius:"200px",
                gap:"5px"
            },
            icons:[
            {
                icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png',
                link:'#'
            },
            {
                icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png',
                link:'#'
            },
           ]
        },


    }
       
   ]
 },
 {
    id:"promoblock",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.25v15.496c0 1.078-1.274 1.65-2.08.934l-4.492-3.994a.75.75 0 0 0-.498-.19H4.25A2.25 2.25 0 0 1 2 14.247V9.75a2.25 2.25 0 0 1 2.25-2.25h3.68a.75.75 0 0 0 .498-.19l4.491-3.993C13.726 2.599 15 3.17 15 4.25Zm3.992 1.647a.75.75 0 0 1 1.049.157A9.959 9.959 0 0 1 22 12a9.96 9.96 0 0 1-1.96 5.946.75.75 0 0 1-1.205-.892A8.459 8.459 0 0 0 20.5 12a8.459 8.459 0 0 0-1.665-5.054.75.75 0 0 1 .157-1.049ZM17.143 8.37a.75.75 0 0 1 1.017.303c.536.99.84 2.125.84 3.328a6.973 6.973 0 0 1-.84 3.328.75.75 0 0 1-1.32-.714c.42-.777.66-1.666.66-2.614s-.24-1.837-.66-2.614a.75.75 0 0 1 .303-1.017Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Promotion Block",
       component:PromoBlock,
      
   },
   props:[
    {
        name:"Promo Block Editor",
        type:"promoblock",
        component:PromoBlockEditor,
        key:"value",
        default:{
            title:'Heading to the Shopping Page',
            description:'We are promoting something Here',
            link:'/',
            linktext:'SHOP NOW',
            bgcolor:'#2b76e4',
            image:'/mainbg.png',
            height:"150px",
        },


    }
       
   ]
 },
 {
    id:"ytvideo",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 4h11.5a3.25 3.25 0 0 1 3.245 3.066L21 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L17.75 20H6.25a3.25 3.25 0 0 1-3.245-3.066L3 16.75v-9.5a3.25 3.25 0 0 1 3.066-3.245L6.25 4h11.5-11.5Zm3.803 5.585A.5.5 0 0 0 10 9.81v4.382a.5.5 0 0 0 .724.447l4.382-2.19a.5.5 0 0 0 0-.895l-4.382-2.191a.5.5 0 0 0-.671.223Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"YouTube Video",
       component:YTVideo,
      
   },
   props:[
    {
        name:"YouTube Video Editor",
        type:"ytvideo",
        component:PromoBlockEditor,
        key:"value",
        default:{
            title:'',
            autoplay:true,
            loop:true,
            video:'gevB5znAOsw'
        },


    }
       
   ]
 },
 {
    id:"spacer",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 11v2H4v-2a1 1 0 1 0-2 0v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a1 1 0 1 0-2 0Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Spacer",
       component:Spacer,
      
   },
   props:[
    {
        name:"Space Y",
        type:"range",
        component:Range,
        key:"value",
        suffix:'px',
        default:"2px",
        min:1,
        max:100,
    },
       
   ]
 },
 {
    id:"expandablelist",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4h-2.5Zm7 1a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10Zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7Zm-7 5A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13h-2.5Zm7 1a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10Zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Expandable List",
       component:ExpandableList,
      
   },
   props:[
    {
        name:"List Item Editor",
        type:"list",
        component:ExpandableListEditor,
        key:"value",
        default:[
            {
                question:'Sample List Title',
                answer:'<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>'
            },
            {
                question:'Sample List Title2',
                answer:'<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry2.</p>'
            }
        ],


    }
       
   ]
 },
 {
    id:"charts",
    icon:<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5.23a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 5.23V21H9V5.23ZM7.5 10H5.25A2.25 2.25 0 0 0 3 12.25v8c0 .415.336.75.75.75H7.5V10ZM16.5 21h3.75a.75.75 0 0 0 .75-.75v-11A2.25 2.25 0 0 0 18.75 7H16.5v14Z" fill="#212121"/></svg>,
    color:'#ddd',
  
   frontend:{
       name:"Charts",
       component:Charts,
      
   },
   props:[
    {
        name:"Chart Editor",
        type:"chart",
        component:ChartEditor,
        key:"value",
        default:{
        
            height:300,
            width:"100%",
            type:"bar",
            bars:[
                {
                    name:"React",
                    key:"a",
                    color:"#61dbfb"
                },
                {
                    name:"Vue",
                    key:"b",
                    color:"#41B883"
                }
            ],
            data:[

                {
                    name:'2020',
                    a:1000,
                    b:2000
                },
                {
                    name:'2021',
                    a:2050,
                    b:1000
                },
                {
                    name:'2022',
                    a:2000,
                    b:3000
                },
                {
                    name:'2022',
                    a:2000,
                    b:3000
                },
                {
                    name:'2022',
                    a:2000,
                    b:3000
                },
                {
                    name:'2022',
                    a:2000,
                    b:3000
                },
                {
                    name:'2022',
                    a:2000,
                    b:3000
                }
            ]
        
           


    }
           ,


    }
       
   ]
 }
]


const RenderEditor = (props) =>{

    const [getOut,setOut] = useState(editorSampleRender);
    const [data,setData] = useState(props.value);
    const [activeEdit,setActiveEdit] = useState();
    const [selector,setSelector] = useState();
    const [postData,setPostData] =useState([]) ;
    



    function getJSONParsed(a){
        
            try {
              JSON.parse(a);
              return JSON.parse(a);
            } catch (error) {
              return [];
            }
          
    }
    useEffect(()=>{
    
        props.onChange(postData)
    },[postData])
    const moveItemBack = (index) => {
        if (index > 0 && index < postData.length) {
          const updatedData = [...postData];
          const itemToMove = updatedData.splice(index, 1)[0];
          updatedData.splice(index - 1, 0, itemToMove);
          setPostData(updatedData);
        }
      };
    
      const moveItemForward = (index) => {
        if (index >= 0 && index < postData.length - 1) {
          const updatedData = [...postData];
          const itemToMove = updatedData.splice(index, 1)[0];
          updatedData.splice(index + 1, 0, itemToMove);
          setPostData(updatedData);
        }
      };
    const deletePostAtIndex = (index) => {
        // Use the filter method to create a new array without the item at the specified index
        const updatedPostData = postData.filter((_, i) => i !== index);
    
        // Update the state with the new array
        setPostData(updatedPostData);
      };
    const addDataAtIndex = (index, newData) => {
       
        const updatedData = [...postData];
    
        
        updatedData.splice(index+1, 0, newData);
    
       
        setPostData(updatedData);
    
      };
    useEffect(()=>{
       if(props.renderFrontEndOnly == true && props.isJSON == true){

       }else{
        setPostData(getJSONParsed(props?.postData?.jsonContent))}
        
    },[])
    useEffect(()=>{
        if(props.renderFrontEndOnly == true){
            
            if(props.isJSON == true){
        setPostData(props?.postData)
    }  
        else {
           
        }
    
    }
    },[props.postData])


    const updateDataAtIndex = (index, key, value) => {
        /* console.log(value) */
        // Step 1: Retrieve the current state data
        const updatedData = [...postData];
    
        // Step 2: Find the item in the array at the specified index
        const itemToUpdate = updatedData[index];
    
        // Step 3: Update the key inside the props object with the new value
        itemToUpdate.props[key] = value;
    
        // Step 4: Create a new array with the updated item
        updatedData[index] = itemToUpdate;
    
        // Step 5: Update the state with the new array
        setPostData(updatedData);
      };
    function activateSelector(a){
    
        setSelector(a)
    }
    
    function addWidget(index,widget){
    
    
    const newprops = widget.props.reduce((result, i) => {
            
        const value = i.default;
        return {
          ...result,
          [i.key]: value,
    
        };
      }, {});
        const dataToAdd = {
            component:widget.id,
            props:newprops
        }
    
        console.log(dataToAdd)
        addDataAtIndex(index,dataToAdd);
        setSelector()
    }
    if(props.renderFrontEndOnly == false || !props.renderFrontEndOnly){
    return (<> {postData?.map((field, index) => {
    
        const item = getOut.find(item => field.component == item.id);
        const frontEndComponent = item.frontend.component;
        const EditorComp = item.props;
        const frontEndProps = item.props.reduce((result, i) => {
            
            const value = field?.props[i.key] ? field.props[i.key] : '';
            return {
              ...result,
              [i.key]: value,
    
            };
          }, {});
       const getEditorComponentProps = (itemz) =>{
       const pr = {
        [itemz.key] :field?.props[itemz.key] ? field.props[itemz.key] : itemz.default,
        label :itemz.name,
        onChange:(e)=>updateDataAtIndex(activeEdit,itemz.key,e),
        ...(itemz.type == "range"? {  min:itemz.min ,max:itemz.max,value: field?.props[itemz.key] ?field.props[itemz.key]: itemz.default }:{}),
        ...(itemz.type == "text" || itemz.type =="textarea"? { type:itemz.type ,value: field?.props[itemz.key] ?field.props[itemz.key]: itemz.default }:{}),
        ...(itemz.type == "select"? {noPadding:true ,defaultText:`Select ${itemz.key}`,z:9,objects:itemz.objects, setSelect:(e)=>updateDataAtIndex(activeEdit,itemz.key,e)}:{}),
        ...(itemz.type == "image"? { min:itemz.min,max:itemz.max,data:{image:field.props[itemz.key]},onUploadComplete:(e)=>updateDataAtIndex(activeEdit,itemz.key,e)}:{})
       }
    /* console.log(pr,itemz) */
    return pr;
       }
        
    return <div key={index} className={styles.block_wrapper + " " + (activeEdit == index ? styles.editmode : '')}>
    
              
    <div className={styles.editpanel}>
    
        <div className={styles.remove} onClick={()=>{deletePostAtIndex(index)}}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="#222F3D"/></svg>
        </div>
        { index > 0 ?
        <div className={styles.arrow} onClick={()=>{moveItemBack(index)}}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 15.707a1 1 0 0 0 1.414 0L12 9.414l6.293 6.293a1 1 0 0 0 1.414-1.414l-7-7a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 0 1.414Z" fill="#222F3D"/></svg>
        </div>:''}
        {index != postData.length -1?
        <div className={styles.arrow} onClick={()=>{moveItemForward(index)}}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" fill="#222F3D"/></svg>
        </div>:''}
        {activeEdit == index ? 
        <div className={styles.confirm} onClick={()=>{setActiveEdit()}}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z" fill="#222F3D"/></svg>
        </div>:''}
    </div>
    
    {activeEdit == index ?  <>
    {
        EditorComp && EditorComp.map((ec,ei)=>{
    
            return React.createElement(ec.component,getEditorComponentProps(ec))
        })
    }
       
    </>:<>
    {React.createElement(frontEndComponent,frontEndProps)}
    </>}
    {activeEdit == index ? '':
    <div className={styles.editcont}>
        <p className={styles.classifier}>{field.component}</p>
    <div className={styles.edit} onClick={()=>{setActiveEdit(index)}}>
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" fill="#222F3D"/></svg>
    <p>EDIT 
    </p></div>
    </div>
    }
    {activeEdit == index ? '':
    <div className={styles.addcont}>
       
    <div className={styles.add} onClick={()=>{activateSelector(index)}}>
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" fill="#222F3D"/></svg>
    </div>
    </div>
    }
    {selector != undefined && selector == index? 
     <div className={styles.widgets} >
     {
         getOut != undefined && getOut.map((z,v)=>{
     
             return <div className={styles.widget} onClick={()=>{addWidget(selector,z)}}>
     
                 {z?.icon}
                <p> {z?.frontend?.name}</p>
             </div>
         })
     }
     
         </div>
    :''}
    
    </div>
    
    
    })}
          
     {postData && postData.length ==0 ? <><h2>Add your first widget here</h2>
      <div className={styles.widgets + " " + styles.widgetstand} >
        
      {
          getOut != undefined && getOut.map((z,v)=>{
      
              return <div className={styles.widget} onClick={()=>{addWidget(selector,z)}}>
      
                  {z?.icon}
                 <p> {z?.frontend?.name}</p>
              </div>
          })
      }
      
          </div></>
     :''}     
          
    </>
    )
}
    if(props.renderFrontEndOnly == true) {
        

        return (<>
        {postData?.map((field, index) => {

const item = getOut.find(item => field.component == item.id);
        const frontEndComponent = item.frontend.component;
        const frontEndProps = item.props.reduce((result, i) => {
            
            const value = field?.props[i.key] ? field.props[i.key] : '';
            return {
              ...result,
              [i.key]: value,
    
            };
          }, {});


         return React.createElement(frontEndComponent,frontEndProps)

        })}
        </>)
    }
    
    
    }
    export default RenderEditor;