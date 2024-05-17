import { useState } from 'react';
import TaskForm from './components/TaskForm';
import logoSVG from './assets/Logo.svg';
import crossSVG from './assets/close_ring_duotone.svg';
import pencilSVG from './assets/Edit_duotone.svg';
import plusSVG from './assets/Add_round_duotone.svg';

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="mx-auto max-w-[40rem] p-8">
      <header className="mb-10 flex items-start gap-x-3 leading-none">
        <img src={logoSVG} alt="My Task Board Logo" />
        <div>
          <h1 className="mb-4 text-[2.5rem]">
            My Task Board
            <img
              className="ml-3 inline-block cursor-pointer align-baseline"
              src={pencilSVG}
              alt="Pencil"
            />
          </h1>
          <h2>Tasks to keep organised</h2>
        </div>
      </header>

      <main>
        <div className="mb-4">
          <article
            onClick={() => setShowTaskForm(true)}
            className="relative flex cursor-pointer items-start gap-x-6 rounded-xl bg-clr-gray-light p-4"
          >
            <div>
              <span className="mb-2 flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl bg-clr-white">
                📚
              </span>
              <span className="right-4 top-4 flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl bg-clr-red-dark sm:absolute">
                <img src={crossSVG} alt="Red X" />
              </span>
            </div>
            <div className="self-center">
              <h3 className="text-xl font-semibold">Task To Do</h3>
              <p className="mt-1 font-light leading-5">
                Work on a Challenge on devChallenges.io,
                <br />
                learn TypeScript.
              </p>
            </div>
          </article>
        </div>
        <div
          onClick={() => setShowTaskForm(true)}
          className="flex cursor-pointer items-center gap-x-6 rounded-xl bg-clr-orange-light p-4"
        >
          <span className="flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl bg-clr-orange-dark">
            <img src={plusSVG} alt="" />
          </span>
          <h3 className="font-semibold">Add new task</h3>
        </div>
      </main>
      {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
    </div>
  );
}

export default App;
