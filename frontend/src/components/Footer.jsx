import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-8 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>© {new Date().getFullYear()} Paynoma — Built by OLNET Technologies. All rights reserved.</div>
        <div className="space-x-3 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Facebook</a>
        </div>
      </div>
    </footer>
  )
}
