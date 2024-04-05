import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { AdminMenu } from '../../components/Layouts/AdminMenu'

export const CreateProduct = () => {
  return (
    <Layout title = {'dashboard-Create Product'}>
        <div className='container-fluid m-3 p-3'>
         <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1> Create Product</h1>
            </div>
        </div>
    </div>
    </Layout>
  )
}
