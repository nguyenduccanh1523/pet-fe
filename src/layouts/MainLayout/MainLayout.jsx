import React from 'react'
import Title from '../../components/Sidebar/Title'
import Header from '../../components/Sidebar/Header'
import Footer from '../../components/Sidebar/Footer'

const MainLayout = ({children}) => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className="max-w-7xl mx-auto">
        <Title />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
