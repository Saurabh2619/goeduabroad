import { useEffect, useState } from 'react'
import styles from './Blogs.module.css'
import { useRouter } from 'next/router'

import { supabase } from '../utils/supabaseClient'
import Section from '../components/Section'
import Card from '../components/Card'
import { NextSeo } from 'next-seo'
import DefaultLayout from '../layouts/DefaultLayout'
import Paginator from '../components/Paginator'

function Blogs({ data, datac, da, pagecount, pagenumber, allPosts }) {
  const router = useRouter()

  const [rquery, setQuery] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(allPosts || [])

  // Catch query param string
  useEffect(() => {
    if (router.query) {
      setQuery(router.query.string)
    }
  }, [])

  // ───────────────────────── SEARCH FUNCTIONALITY ─────────────────────────
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(allPosts || [])
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = allPosts?.filter((post) =>
        post.title.toLowerCase().includes(term)
      )
      setFilteredPosts(filtered || [])
    }
  }, [searchTerm, allPosts])
  // ───────────────────── END SEARCH FUNCTIONALITY ─────────────────────

  function isoDateToWords(isoDate) {
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ]
    const dateObj = new Date(isoDate)
    if (isNaN(dateObj)) return 'Invalid date'
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  }

  const d = new Date()

  return (
    <DefaultLayout isSideBar={true} isHomepage={false} cat={data.data} isActivePassive={true}>
      <NextSeo
        title={`Best Study Abroad Consultant in ${d.getFullYear()}`}
        description={`See what's trending in ${d.getFullYear()} for IELTS/Study Abroad only on GoEduAbroad.`}
        openGraph={{
          url: `https://goeduabroad.com/blogs/`,
          images: [
            {
              url: datac.data.length > 0 ? datac.data[0].img : 'https://goeduabroad.com/harvard.webp',
              alt: `Best IELTS & Study Abroad Consultant for ${da} in ${d.getFullYear()}`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary',
          handle: '@goeduabroad',
        }}
      />

      <div className={styles.post_holder}>
        <h1 className={styles.mainhead}>Showing all Posts</h1>
        <p className={styles.para}>Number of Posts : {filteredPosts.length}</p>

        {/* ───────────── SEARCH BOX ───────────── */}
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        />
        {/* ───────── END SEARCH BOX ───────── */}

        <Section noMargin text="">
          {filteredPosts.length > 0 ? (
            <Paginator
              pagenumber={0} // Reset to first page on search
              count={filteredPosts.length}
              items={filteredPosts}
              renderFunction={(item, index) => (
                <Card
                  icons={item.icons}
                  key={index}
                  slug={item.slug}
                  date={item.created_at}
                  title={item.title}
                  description={item.intro}
                  image={item.img}
                />
              )}
            />
          ) : (
            <p>No matching posts found</p>
          )}
        </Section>
      </div>
    </DefaultLayout>
  )
}

export default Blogs

// ───────────────────── getServerSideProps ─────────────────────
export async function getServerSideProps(context) {
  const pagenumber = context.query.pg || 0

  function getRange() {
    const posts = 15
    return pagenumber == undefined
      ? [0, 14]
      : [posts * pagenumber, posts * pagenumber + posts - 1]
  }

  const [data, datac, pagecount, allPosts] = await Promise.all([
    supabase.from('categories').select('*'),

    supabase
      .from('blog_posts')
      .select('title,created_at,author,intro,slug,img,icons,cat!inner(*)')
      .eq('isActive', true)
      .order('created_at', { ascending: false })
      .range(getRange()[0], getRange()[1]),

    supabase
      .from('blog_posts')
      .select('id', { count: 'exact' })
      .eq('isActive', true),

    // 🔥 Fetch all posts for global search (without range)
    supabase
      .from('blog_posts')
      .select('title,created_at,author,intro,slug,img,icons,cat!inner(*)')
      .eq('isActive', true)
      .order('created_at', { ascending: false }),
  ])

  return {
    props: {
      data,
      datac,
      pagecount,
      pagenumber,
      allPosts: allPosts.data || [],
    },
  }
}
