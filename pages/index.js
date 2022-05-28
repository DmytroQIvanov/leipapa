import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Wrapper from "../components/Wrapper/Wrapper";
import MainPage from "../layouts/MainPage/MainPage";

export default function Home() {
  return (
    <div className={styles.container}>

        <Wrapper><MainPage/></Wrapper>

    </div>
  )
}
