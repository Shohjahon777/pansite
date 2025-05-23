// src/app/template.jsx
import Navbar from '../components/layout/Navbar'

export default function Template({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}