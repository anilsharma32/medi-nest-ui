// layout.js
import React from 'react'
import CategoryList from '../_components/CategoryList'

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="hidden md:block col-span-1">
        <CategoryList />
      </div>

      {/* Main content */}
      <div className="col-span-4 md:col-span-3">
        {children}
      </div>
    </div>
  )
}

export default Layout
