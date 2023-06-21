import { PropsWithChildren, Suspense } from 'react';

import Container from '@/components/Container';
import { Post } from '@/lib/types';
import Author from '@/components/Author';
import AboutAuthor from '@/components/AboutAuthor';
import PlayGames from '@/components/PlayGames';
import Link from 'next/link';

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Post }>) {

  return (
    <Container
      title={`${post.heading} – Girish chaudhari`}
      description={post.description}
      image={post.socialImage}
      date={post.date}
      tags={post.tags}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <Author readingTime={post.readingTime} date={post.date} />
        <div className="mb-4">
          {post.tags.map((oneTag:string, i:number) => {
            return (
              <Link href={`/category/${oneTag}`} key={i} legacyBehavior>
                <a className="text-lg mr-2 bg-gray-200 dark:bg-gray-600 p-px pr-1 pl-1 rounded-sm">
                  #{oneTag}
                </a>
              </Link>
            );
          })}
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.heading}
        </h1>
        <Suspense fallback={null}>
          <div className="w-full prose dark:prose-dark max-w-none">
            {children}
          </div>
        </Suspense>
        <hr className="mt-16 w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
        <AboutAuthor />
        <PlayGames />
      </article>
    </Container>
  );
}
