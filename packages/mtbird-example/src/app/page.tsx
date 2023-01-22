'use client';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import { Button, Layout } from 'antd';
import PageList from '@/components/PageList';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Content>
        <Button type="primary">123</Button>
        <PageList />
      </Layout.Content>
    </Layout>
  );
}
