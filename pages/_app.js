import Head from 'next/head'
import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { NextUIProvider } from '@nextui-org/react'
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Toaster} from 'react-hot-toast'
import {Analytics} from '@vercel/analytics/react'
export default function App({ Component, pageProps }) {
  return <>
  <SpeedInsights></SpeedInsights>
  <Analytics></Analytics>
   <DefaultSeo
    title="EduAbroad | Best Study Abroad & IELTS Consultant in India"
    description="EduAbroad is a leading study abroad consultant that helps students achieve their academic and career goals through international education. Our team of experienced professionals provides personalized guidance and support throughout the entire study abroad process, from choosing the right program to securing scholarships and visas. "
  openGraph={{
    type:'website',
    locale:'en_US',
    title:"EduAbroad | Best Study Abroad & IELTS Consultant in India",
    url:'https://goeduabroad.com/',
    description:"EduAbroad is a leading study abroad consultant that helps students achieve their academic and career goals through international education. Our team of experienced professionals provides personalized guidance and support throughout the entire study abroad process, from choosing the right program to securing scholarships and visas. ",
    siteName:'EduAbroad | Best Study Abroad & IELTS Consultant in India',
    images:[
      {
        url:'https://goeduabroad.com/mainbg.png',
        alt:'EduAbroad | Best Study Abroad & IELTS Consultant in India'
      }
    ]
  }}
twitter={{
  handle:'@eduabroad',
  site:'@eduabroad',
  cardType:'summary_large_image'
}}
  />
  <Head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,600,700,800"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,500,600,700,800"/>
 
        <title>EduAbroad | Study in Abroad</title>
        <meta name="description" content="Study in Abroad" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/edufavicon.svg" />
        
    
  {/* <script type="text/javascript" dangerouslySetInnerHTML={{__html:"var jscomp = jscomp || {};\njscomp.scope = {};\njscomp.createTemplateTagFirstArg = function (c) {\n  return (c.raw = c);\n};\njscomp.createTemplateTagFirstArgWithRaw = function (c, a) {\n  c.raw = a;\n  return c;\n};\nvar ApplyBoardEmbeddedSearch = (function () {\n  function c() {\n    var a = document.getElementById(\"ab-embedded-search\");\n    if (a) {\n      var e = a.hasAttribute(\"data-rp-ref\")\n        ? a.getAttribute(\"data-rp-ref\")\n        : \"\";\n      if (e) {\n        var n = a.hasAttribute(\"data-host\")\n            ? a.getAttribute(\"data-host\")\n            : \"https://www.applyboard.com\",\n          k = a.hasAttribute(\"data-orientation\")\n            ? a.getAttribute(\"data-orientation\")\n            : \"horizontal\",\n          p = [\"USA\", \"United Kingdom\", \"Canada\"],\n          h = a.hasAttribute(\"data-default-countries\")\n            ? a.getAttribute(\"data-default-countries\")\n            : \"\";\n        h = h\n          .split(\",\")\n          .filter(function (b) {\n            return p.includes(b);\n          })\n          .map(function (b) {\n            return encodeURIComponent(b);\n          })\n          .join(\",\");\n        a.style.cssText =\n          \"vertical\" === k\n            ? \"margin:50px auto; height: 525px; width:100%; max-width: 500px;\"\n            : \"margin:50px auto; height: 350px; width:100%; max-width: 800px; transition: height 0.25s;\";\n        e = (function (b, f, g) {\n          var d = document.createElement(\"iframe\");\n          d.setAttribute(\n            \"src\",\n            g + \"/embedded_search?rp_ref=\" + b + \"&countries=\" + f\n          );\n          d.setAttribute(\"scrolling\", \"no\");\n          d.setAttribute(\"frameborder\", \"0\");\n          d.style.cssText = \"width:100%; height:100%;\";\n          d.classList.add(\"ab-emmbedded-search-iframe\");\n          return d;\n        })(e, h, n);\n        a.appendChild(e);\n        if (\"horizontal\" === k) {\n          var l = function () {\n              a.style.height = 720 >= a.offsetWidth ? \"525px\" : \"350px\";\n            },\n            m = !1;\n          (function (b, f, g) {\n            b.addEventListener\n              ? b.addEventListener(f, g)\n              : b.attachEvent(\"on\" + f, function () {\n                  g.call(b);\n                });\n          })(window, \"resize\", function () {\n            clearTimeout(m);\n            m = setTimeout(l, 250);\n          });\n          l();\n        }\n      } else\n        a.innerHTML =\n          \"<span>Embedded Search configuration error: Recruitment Partner ID not specified.</span>\";\n    }\n  }\n  return {\n    onStart: function () {\n      \"loading\" !== document.readyState\n        ? c()\n        : document.addEventListener\n        ? document.addEventListener(\"DOMContentLoaded\", c)\n        : document.attachEvent(\"onreadystatechange\", function () {\n            \"loading\" !== document.readyState && c();\n          });\n    },\n  };\n})();\nApplyBoardEmbeddedSearch.onStart();\n"}}></script> */}
  <script dangerouslySetInnerHTML={{__html:"function gtag_report_conversion(url) { var callback = function () { if (typeof(url) != 'undefined') { window.location = url; } }; gtag('event', 'conversion', { 'send_to': 'AW-11123490788/CJ4_CIiN9-MYEOT_i7gp', 'event_callback': callback }); return false; }"}}></script>
  </Head>
  
  <>
 
  {process.env.NEXT_PUBLIC_SITE_LIVE == "true" ? 
  <NextUIProvider>
    <Toaster position="bottom-right"></Toaster>
     <Component {...pageProps} /></NextUIProvider>:
  <div><h1>Sorry, Something went Wrong!</h1><p>Please contact your cloud hosting provider to resolve the issue.</p></div>}</>
  </>
}
