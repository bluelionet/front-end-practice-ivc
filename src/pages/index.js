import Head from 'next/head';
import PolicyholderSearcher from '../components/PolicyholderSearcher.js';

export default function Home() {
  return (
    <>
      <Head>
        <title>front-end-practice-ivc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PolicyholderSearcher />
    </>
  );
}
