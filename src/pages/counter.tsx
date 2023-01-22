import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/counter.module.scss'
import { useEffect, useState } from 'react'
import { HOST } from '@/env';
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: [ 'latin' ] })

const incrementCounterApi = async () => {
  const requestOptions = {
    method: "GET"
  };
  const path = `${HOST}/api/counter?INC`;
  const res = await fetch(path, requestOptions)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .catch(err => console.log(err));
  return res;
}

const decrementCounterApi = async () => {
  const requestOptions = {
    method: "GET"
  };
  const path = `${HOST}/api/counter?DEC`;
  const res = await fetch(path, requestOptions)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .catch(err => console.log(err));
  return res;
}

const getCounterValueApi = async () => {
  const requestOptions = {
    method: "GET"
  };
  const path = `${HOST}/api/counter`;
  const res = await fetch(path, requestOptions)
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .catch(err => console.log(err));
  return res;
}

export default function Home() {
  const [ counter, _setCounter ] = useState<number>(0);
  const incrementCounter = async () => {
    const { value } = await incrementCounterApi();
    _setCounter(_prev => value);
  };

  const decrementCounter = async () => {
    const { value } = await decrementCounterApi();
    _setCounter(_prev => value);
  };

  const getCounterValue = async () => {
    const { value } = await getCounterValueApi();
    return value;
  }

  useEffect(() => {
    const run = async () => {
      const value = await getCounterValue();
      _setCounter(_prev => value);
    } 
    run();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className={styles.main}>
        <div className={styles.counter}>
          <button 
            className={styles.counter_button}
            onClick={incrementCounter}
          >+</button>
          <div className={styles.value}>
            {counter}
          </div>
          <button
            className={styles.counter_button}
            onClick={decrementCounter}
          >-</button>
        </div>
      </main>
    </>
  )
}
