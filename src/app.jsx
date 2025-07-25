import github from './assets/github.svg';

function App() {
  return (
    <>
      <article className="">

        <div>
          <a href="https://github.com/Asempere123123" target="_blank">
            <img src={github} alt="Github Logo" />
          </a>
        </div>
        <a href="/projects" className="rounded px-3 py-1 bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100 transition">Projects</a>
      </article>
    </>
  )
}

export default App
