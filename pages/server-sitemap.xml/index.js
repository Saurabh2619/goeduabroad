import { getServerSideSitemap, getServerSideSitemapLegacy } from "next-sitemap";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps = async(ctx) => {

    const [data, datgr,datapr,datapro] = await Promise.all([

        await supabase.from('services').select('*'), await supabase.from('blog_posts').select('*'), await supabase.from('studyabroad').select('*'),await supabase.from('testpreps').select('*')
    ])

    var r;
    if (data && datgr && datapr) {

        r = data.data.map((i, d) => ({
            "loc": `https://goeduabroad.com/services/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
        }))
        const ne = datgr.data.map((i, d) => ({
            "loc": `https://goeduabroad.com/post/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
        }))
        const net = datapr.data.map((i, d) => ({
            "loc": `https://goeduabroad.com/studyabroad/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
        }))
        const neto = datapro.data.map((i, d) => ({
            "loc": `https://goeduabroad.com/testpreps/${i.slug}`,
            "lastmod": `${i.created_at.substring(0,10)}`,
        }))
        const stat = [{
            "loc": `https://goeduabroad.com/contact`,

        }]
        r = [...r, ...ne, ...stat,...net,...neto];
     console.table(r)

    }

    const field = [...r];
    return getServerSideSitemapLegacy(ctx,field)
}

export default function Site() {}