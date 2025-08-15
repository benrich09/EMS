import React from 'react'
import { UserRound, Building, Banknote } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="container-custom py-12 px-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          Administrator Dashboard
        </h1>
      </div>
      {/* Stats*/}
      {/** total employees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <UserRound className="h-6 w-6 text-primary-700" />
            </div>
            <h2 className="text-lg font-semibold">Total Employees </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{/*{stats.employees}*/}</p>
        </div>
        {/** total departments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full mr-4"><Building className="h-6 w-6 text-primary-700" /></div><h2 className="text-lg font-semibold">Total Departments </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{/*{stats.departments}*/}</p>
        </div>
        {/** monthly pay */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full mr-4"><Banknote className="h-6 w-6 text-primary-700" /></div><h2 className="text-lg font-semibold">Total Monthly Pay </h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{/*{stats.monthlyPay}*/}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard