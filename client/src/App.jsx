import { useState } from 'react';
import logoSVG from './assets/Logo.svg';
import crossSVG from './assets/close_ring_duotone.svg';
import pencilSVG from './assets/Edit_duotone.svg';
import TaskForm from './components/TaskForm';

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
        <article
          onClick={() => setShowTaskForm(true)}
          className="flex cursor-pointer items-start gap-x-6 rounded-xl bg-clr-gray-light p-4"
        >
          <span className="rounded-xl bg-white p-2 text-lg">📚</span>
          <div className="self-center">
            <h3 className="text-xl font-semibold">Task To Do</h3>
            <p className="mt-1 font-light leading-5">
              Work on a Challenge on devChallenges.io,
              <br />
              learn TypeScript.
            </p>
          </div>
          <img
            className="ml-auto hidden rounded-xl bg-red-500 p-3 sm:block"
            src={crossSVG}
            alt="Red X"
          />
        </article>
      </main>
      {showTaskForm && <TaskForm setShowTaskForm={setShowTaskForm} />}
    </div>
  );
}

export default App;
