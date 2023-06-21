import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_SLUGS } from 'graphql/queries';
import axios from 'lib/axiosConfig';

// const client = new ApolloClient({
//   uri: process.env.CMS_HOST,
//   cache: new InMemoryCache()
// });

const createSitemap = (slugs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://localhost/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;
export async function getServerSideProps({ res }) {
  // const { data } = await client.query({ query: GET_ALL_SLUGS });
  let resp = await axios.get('/category/slugs');
  let { data } = resp.data;


  const allPages = [
    ...data.map(
      (slug: any) => `blog/${slug}`
    ),
    ...['', 'about', 'blog', 'blog/code', 'blog/life', 'blog/misc']
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
