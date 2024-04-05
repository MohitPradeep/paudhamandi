import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { UserMenu } from '../../components/Layouts/UserMenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={'dashboard'}>
        <div className='container-fluid p-3 m-3'>
        <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
            <div className='card w-75 m-3'>
            <h3>{auth?.user?.name}</h3>
            <h3>{auth?.user?.email}</h3>
            <h3>{auth?.user?.phone}</h3>
            </div>
        </div>
        </div>
    </div>

    </Layout>
  )
}

export default Dashboard