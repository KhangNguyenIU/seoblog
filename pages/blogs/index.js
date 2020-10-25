import Layout from '../../components/Layout'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'
import Card from '../../components/blog/Card'
import { useState } from 'react'
const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router }) => {
   const head = () => (
      <Head>
         <title>Programing blogs | {APP_NAME}</title>
         <meta
            name="description"
            content="Programing blogs and tutorial on react vue php next laravel and web development" />
         <link rel="canonnical" href={`${DOMAIN}${router.pathname}`} />
         <meta property="og:title" content={`Latest web develpoment tutorial | ${APP_NAME}`} />
         <meta
            property="og:description"
            content="Programing blogs and tutorial on react vue php next laravel and web development" />
         <meta property="og:type" content="website" />
         <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
         <meta property="og:site_name" content={APP_NAME} />
         <meta property="og:image" content="/static/images/seoblog.jpg" />
         <meta property="og:image:secure_url" content="/static/images/seoblog.jpg" />
         <meta property="og:image:type" content="image/jpg" />
         <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
   )

   const [limit, setLimit] = useState(blogsLimit);
   const [skip, setSkip] = useState(0)
   const [size, setSize] = useState(totalBlogs)
   const [loadedBlogs, setLoadedBlogs] = useState([])

   const loadMore = () => {
      let toSkip = skip + limit;
      listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
         if (data.error) {
            console.log(data.error);
         } else {
            setLoadedBlogs([...loadedBlogs, ...data.blogs]);
            setSize(data.size);
            setSkip(toSkip);
         }
      });
   };

   const loadMoreButton = () => {
      return (
         size > 0 &&
         size >= limit && (
            <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
               Load mmore
            </button>
         )
      );
   };
   const showAllTags = () => {
      return tags.map((t, i) => (
         <Link href={`/tags/${t.slug}`} key={i}>
            <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
         </Link>
      ));
   };

   const showAllCategories = () => {
      return categories.map((c, i) => (
         <Link href={`/categories/${c.slug}`} key={i}>
            <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
         </Link>
      ));
   };

   const showAllBlogs = () => {
      return blogs.map((blog, i) => {
         // ()
         return (
            <article key={i}>
               <Card blog={blog} />
               <hr />
            </article>
         );
      });
   };

   const showLoadedBlogs = () => {
      return loadedBlogs.map((blog, i) => (
         <article key={i}>
            <Card blog={blog} />
         </article>
      ));
   };

   return (
      <React.Fragment>
         {head()}
         <Layout>
            <main>
               <div className="container-fluid">
                  <header>
                     <div className="col-md-12 pt-3">
                        <h1 className="display-4 font-weight-bold text-center">Programing  blogs and tutorials</h1>
                     </div>
                     <section>
                        {showAllTags()}
                        {showAllCategories()}
                     </section>
                  </header>
               </div>

               <div className="container-fluid">{showAllBlogs()}</div>
               <div className="container-fluid">{showLoadedBlogs()}</div>
               <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </main>
         </Layout>
      </React.Fragment>
   )
}

Blogs.getInitialProps = () => {
   let skip = 0;
   let limit = 5
   return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
      console.log("data..",data);
      if (data.error) {
         console.log(data.error);
      } else {
         return {
            blogs: data.blogs,
            categories: data.categories,
            tags: data.tags,
            totalBlogs: data.size,
            blogsLimit: limit,
            blogsSkip: skip
         }
      }
   })
}
export default withRouter(Blogs)