import Link from "next/link"
import Head from "next/head";

import styles from './header.module.scss';

type Props = {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <div className={styles.header}>
    <Head>
        <title>{title}</title>
    </Head>
    <div className="header--nav">
        <Link href={'/'}><a className={styles['header--link']}>Main Page</a></Link>
        <Link href={'/products'}><a className={styles['header--link']}>Products</a></Link>
    </div>
  </div>
  )
} 