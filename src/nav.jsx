function Nav() {
  return (
    <nav className="flex items-center justify-center gap-10 p-2.5 mb-5 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
        <a href="/" className="rounded px-3 py-1 bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100 transition">Main Page</a>
        <a href="/projects" className="text-white hover:underline hover:text-gray-200 transition">Projects</a>
    </nav>
  )
}

export default Nav
