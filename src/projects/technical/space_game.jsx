function TechnicalSpaceGame() {
  return (
    <article className="container self-center bg-white rounded-sm shadow p-2 px-4">
        <a href="/space-game" className="float-end text-indigo-500 hover:text-indigo-800 underline">Preview</a>
        <h1 className="text-3xl font-medium mb-4">Technical Details of the Space Game</h1>

        <p className="max-w-170">The game has two main parts: the orbiting logic and the planet rendering logic.</p>
        <p className="max-w-170">It was developed in Rust using the <a href="https://github.com/bevyengine/bevy" className="underline" target="_blank">Bevy</a> game engine.</p>

        <h2 className="text-xl font-medium mb-4 mt-4">The orbit implementation</h2>
        <p className="max-w-170">
          Each orbiting body has an Orbit component attached to it, which contains all of its orbital parameters.
          This component is responsible for updating the body's position each frame.
          It supports two modes: one that calculates the position using Keplerian mechanics, and another that uses Newtonian mechanics.
        </p>
        <h3 className="text-lg mb-4 mt-4">Newtonian mechanics</h3>
        <p className="max-w-170">
          This is the simplest way to predict motion. It relies on calculating gravitational acceleration using Newton's Law of Universal Gravitation,
          and then applying two integrators—one for velocity and one for position.
          The simplest form of integration involves incrementing velocity (or position) by acceleration · delta_time each frame.
        </p>
        <code className="bg-gray-200 px-1">velocity = acceleration * dt</code>
        <br />
        <code className="bg-gray-200 px-1">position = velocity * dt</code>
        <p className="max-w-170">
          Unfortunately, when I tested it, this integrator was not precise enough, even at low timewarp speeds like 4 times.
          The results were quite unstable. While there are many more advanced integrators available,
          I chose to use <a href="https://en.wikipedia.org/wiki/Verlet_integration" className="underline" target="_blank">Verlet integration</a> instead.
        </p>
        <h3 className="text-lg mb-4 mt-4">Keplerian mechanics</h3>
        <p className="max-w-170">
          For bodies without any external acceleration (such as planets), position can be calculated using Keplerian mechanics.
          This method is more stable and works well at any timewarp speed. It requires a set of <a href="https://en.wikipedia.org/wiki/Kepler_orbit" className="underline" target="_blank">six orbital elements</a> to describe the orbit and involves solving Kepler's equation,
          which does not have an analytical solution. Therefore, a numerical method is used. In this case, I chose the <a href="https://en.wikipedia.org/wiki/Newton%27s_method" className="underline" target="_blank">Newton-Raphson</a> method.
        </p>

        <h2 className="text-xl font-medium mb-4 mt-4">The planet rendering</h2>
        <p className="max-w-170">
          The rendering method is based on a <a href="https://en.wikipedia.org/wiki/Geodesic_polyhedron" className="underline" target="_blank">geodesic icosahedron</a> that recursively subdivides each face as you get closer to it.
          The position of each vertex and the color of each face are determined by a shader using noise functions.
        </p>
        <h3 className="text-lg mb-4 mt-4">Mesher Implementation</h3>
        <p className="max-w-170">
          To generate a mesh like this, multiple abstraction layers are needed.
          A mesh is essentially a list of vertices (their positions), which can be represented as a <code>{"Vec<[f32; 3]>"}</code>.
          It also includes a list of faces, which can be stored as a <code>{"Vec<u32>"}</code>,
          where every three indices correspond to a triangle connecting those three vertices.
          A better representation for faces would be <code>{"Vec<[u32; 3]>"}</code>, grouping the indices into triplets explicitly.
        </p>
        <br />
        <p className="max-w-170">
          On top of this, multiple caches are implemented to avoid generating unnecessary vertices (since one vertex may be shared between multiple faces) and to efficiently remove unused vertices.
        </p>
        <br />
        <p className="max-w-170">
          Avoiding unnecessary vertex generation is fairly straightforward because the only two required operations are subdivide and undivide.
          During subdivision, it's known that the three original face vertices will still be used.
        </p>
        <br />
        <p className="max-w-170">
          To remove only completely unused vertices, a reference counting system is used. Removing a vertex outright would be inefficient, as it would require shifting all vertices to the right (or swapping with the last vertex), which is costly and would mess up the face indices.
          For this reason, unused vertices are just marked as removed and their positions are set to zero.
          When a new vertex is created, the system first checks the list of empty spots before expanding the vertex list.
        </p>
        <br />
        <p className="max-w-170">
          Next, a chunk system is implemented that checks each frame whether you are close enough to subdivide a chunk or far enough to undivide it. To avoid excessive memory usage, a maximum subdivision level is enforced.
        </p>

        <h3 className="text-lg mb-4 mt-4">Procedural Planet Generation</h3>
        <p className="max-w-170">
          Then, the mesh is passed through a shader that rounds it. Each vertex's position is projected onto a sphere with the planet's radius, and an offset is added.
          The offset is generated using a series of <a href="https://es.wikipedia.org/wiki/Ruido_Perlin" className="underline" target="_blank">Perlin noise</a> functions, where each successive <a href="https://gamedev.stackexchange.com/questions/197861/how-to-handle-octave-frequency-in-the-perlin-noise-algorithm" className="underline" target="_blank">octave</a> is more detailed but contributes less than the previous one.
        </p>
        <br />
        <p className="max-w-170">
          The results are then passed to a fragment shader, which colors each face differently based on the offset value and a color list.
        </p>

        <h2 className="text-xl font-medium mb-4 mt-4">Web Optimizations</h2>
        <p className="max-w-170">
          The WASM version of the code didn't work on the first attempt. After some debugging, I found that a recursive call to remove items from the cache was causing stack overflows on the web.
          To fix this, I replaced the recursion with a <code>VecDeque</code>, pushing the recursive parameters onto it and popping from the front to process them. This approach reduces the maximum stack(<code>VecDeque's</code>) size by allowing the queue to clear items that won't lead to further calls before adding more.
          I also had to lower the maximum Level of Detail (LOD) and make subdivisions and undivisions happen earlier. Currently, it works well enough for practical use.
        </p>
    </article>
  )
}

export default TechnicalSpaceGame
