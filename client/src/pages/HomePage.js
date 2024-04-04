import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/auth';
function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title = {'Paudha Mandi'}>
       <h1>HomePage</h1> 
       <pre>{JSON.stringify(auth , null ,4)}</pre>
    </Layout>
  )
}

export default HomePage