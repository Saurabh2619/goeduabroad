import { getServerSideSitemap, getServerSideSitemapLegacy } from "next-sitemap";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps = async(ctx) => {

    const [data, datgr,datapr,datapro] = await Promise.all([

        await supabase.from('services').select('slug,created_at'), await supabase.from('blog_posts').select('slug,created_at'), await supabase.from('studyabroad').select('slug,created_at'),await supabase.from('testpreps').select('slug,created_at')
    ])

    var r;
    if (data && datgr && datapr) {

        r = data.data.map((i, d) => ({
            "loc": `https://www.goeduabroad.com/services/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
            "priority":1,
            "changefreq":"daily"
        }))
        const ne = datgr.data.map((i, d) => ({
            "loc": `https://www.goeduabroad.com/post/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
            "priority":1,
            "changefreq":"daily"
            
        }))
        const net = datapr.data.map((i, d) => ({
            "loc": `https://www.goeduabroad.com/studyabroad/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
            "priority":1,
            "changefreq":"daily"
        }))
        const neto = datapro.data.map((i, d) => ({
            "loc": `https://www.goeduabroad.com/testpreps/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
            "priority":1,
            "changefreq":"daily"
        }))
        const stat = [{
            "loc": `https://www.goeduabroad.com/contact`,

        },
    
        {
            "loc": `https://www.goeduabroad.com`,

        }
    ]
        r = [...r, ...ne, ...stat,...net,...neto];
     

    }

    const field = [...r];
    console.log(data) 
    const t = getServerSideSitemapLegacy(ctx,field)
     
     return t;
}

export default function Site() {}