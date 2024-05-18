import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TaskForm from '../components/TaskForm';
import logoSVG from '../assets/Logo.svg';
import crossSVG from '../assets/close_ring_duotone.svg';
import pencilSVG from '../assets/Edit_duotone.svg';
import plusSVG from '../assets/Add_round_duotone.svg';
import clockSVG from '../assets/Time_atack_duotone.svg';
import checkmarkSVG from '../assets/Done_round_duotone.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBoard, getBoard } from '../services/apiBoard';

const statusInfo = new Map([
  [
    'in-progress',
    {
      img: clockSVG,
      iconColor: 'bg-clr-orange-dark',
      bgColor: 'bg-clr-yellow',
      altText: 'In Progress'
    }
  ],
  [
    'completed',
    {
      img: checkmarkSVG,
      iconColor: 'bg-clr-green-dark',
      bgColor: 'bg-clr-green-light',
      altText: 'Completed'
    }
  ],
  [
    'wont-do',
    {
      img: crossSVG,
      iconColor: 'bg-clr-red-dark',
      bgColor: 'bg-clr-red-light',
      altText: "Won't do"
    }
  ],
  ['created', { bgColor: 'bg-clr-gray-light' }]
]);

function TaskBoard() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const boardIdStorage = localStorage.getItem('boardId');

  const { data, error, status } = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
    enabled: Boolean(boardId)
  });

  const { mutate } = useMutation({
    mutationFn: () => createBoard(),
    onSuccess: board => {
      localStorage.setItem('boardId', board._id);
      navigate(`/${board._id}`, { replace: true });
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (!boardId && !boardIdStorage) {
      mutate();
    } else if (!boardId && boardIdStorage) {
      navigate(`/${boardIdStorage}`, { replace: true });
    }
  }, [mutate, boardId, navigate, boardIdStorage]);

  useEffect(() => {
    if (error && boardId === boardIdStorage) {
      localStorage.removeItem('boardId');
      toast.error(
        "We can't find your board. We trying to create you a new one."
      );
      navigate('/', { replace: true });
    } else if (error && boardId !== boardIdStorage) {
      navigate(`${boardIdStorage}`, { replace: true });
      toast.error(
        "This board isn't valid or doesn't exist anymore. We trying to redirect you to your own board."
      );
    }
  }, [error, navigate, boardId, boardIdStorage]);

  if (status !== 'success') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-clr-white font-black">
        {status === 'pending' ? (
          <div className="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          error.message
        )}
      </div>
    );
  }

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
        <div className="mb-4 space-y-4">
          {data.tasks.map(task => (
            <article
              key={task._id}
              onClick={() => setShowTaskForm(true)}
              className={`relative flex cursor-pointer items-start gap-x-6 rounded-xl ${statusInfo.get(task.status).bgColor} p-4`}
            >
              <div>
                <span className="mb-2 flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl bg-clr-white">
                  {task.icon}
                </span>
                {task.status !== 'created' && (
                  <span
                    className={`right-4 top-4 flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl ${statusInfo.get(task.status).iconColor} sm:absolute`}
                  >
                    <img
                      src={statusInfo.get(task.status).img}
                      alt={statusInfo.get(task.status).altText}
                    />
                  </span>
                )}
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
          ))}
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

export default TaskBoard;
