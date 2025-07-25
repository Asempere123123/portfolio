function Projects() {
  return (
    <>
    <article className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2">
      <div className="p-2 px-3 border border-indigo-600 rounded-lg bg-white">
        <h2 className="font-medium text-xl pb-1">Space Game</h2>
        <p>Little technical demo that has orbital mechanics and planet rendering implemented</p>
        <a href="/space-game" className="float-end px-4 text-indigo-500 hover:text-indigo-800 underline">More</a>
      </div>
      <div className="bg-orange">Casino</div>
      <div className="bg-orange">Bootloader</div>
      <div className="bg-orange">Lootbox</div>
      <div className="bg-orange">Fps</div>
      <div className="bg-orange">Cuda Experiments</div>
      <div className="bg-orange">Portfolio</div>
    </article>
    </>
  )
}

export default Projects
