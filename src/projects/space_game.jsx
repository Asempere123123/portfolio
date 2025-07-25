function SpaceGame() {
  return (
    <article class="grid grid-cols-3 gap-4 h-full">
      <div class="col-span-3 sm:col-span-1 p-4">
        <h2 className="text-2xl font-medium mb-2">Space Game</h2>
        <p className="ml-2">This is a technical demo I made that has the following characteristics:</p>
        <ul className="list-disc ml-10">
          <li>Realistic orbit simulation using Keplerian and Newtonian mechanics</li>
          <li>Procedural true-scale planet rendering using recursively tessellated faces and shaders</li>
          <li><a href="https://space-game.asempere.net/" target="_blank" className="underline">Functional web version</a></li>
        </ul>

        <h3 className="text-xl font-medium my-2">Controls</h3>
        <ul className="list-disc ml-10">
          <li>Top-left arrow controls adjust the simulation speed (time warp)</li>
          <li>Scroll to zoom in and out</li>
          <li>Hold right-click and drag to pan the camera</li>
          <li>Press "I" to switch the view to Earth, which is the only planet rendered at realistic scale</li>
          <li>Press "T" to switch to free camera mode (WASD controls)</li>
          <li>Press "O" in free camera mode to double the speed, and "P" to halve it</li>
          <li>Press "E" and "Q" in free camera mode to roll the camera</li>
        </ul>

        <h3 className="text-xl font-medium my-2">Web version</h3>
        <p className="ml-2">I managed to get a working web version after optimizing some parts of the code. It still requires a good computer to run, and performance will likely be poor if your computer has no GPU.</p>

        <div className="flex flex-row justify-between px-4 mt-2">
          <a href="/space-game/technical" className="text-indigo-500 hover:text-indigo-800 underline">Technical Info</a>
          <a href="https://github.com/Asempere123123/space_game" target="_blank" className="text-indigo-500 hover:text-indigo-800 underline">Github Link</a>
        </div>
      </div>
      <div class="col-span-2 hidden sm:block p-2  h-full">
        <iframe src="https://space-game.asempere.net/" frameborder="0" className="size-full"></iframe>
      </div>
    </article>
  )
}

export default SpaceGame
