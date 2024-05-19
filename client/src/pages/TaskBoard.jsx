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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBoard as createBoardApi,
  getBoard as getBoardApi,
  updateBoard as updateBoardApi
} from '../services/apiBoard';
import { createTask as createTaskApi } from '../services/apiTask';

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

  const getBoard = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoardApi(boardId),
    enabled: Boolean(boardId)
  });

  const createBoard = useMutation({
    mutationFn: () => createBoardApi(),
    onSuccess: board => {
      localStorage.setItem('boardId', board._id);
      navigate(`/${board._id}`, { replace: true });
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  const updateBoard = useMutation({
    mutationFn: ({ name }) => updateBoardApi(name, boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
        exact: true
      });
      toast.success('Your board name has been updated!');
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: boardId => createTaskApi(boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
        exact: true
      });
      toast.success('A new task has been created!');
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    // Verify if a boardId exist on params or localStorage.
    // If both not exist create a new board, else redirect to the one stored in localStorage
    if (!boardId && !boardIdStorage) {
      createBoard.mutate();
    } else if (!boardId && boardIdStorage) {
      navigate(`/${boardIdStorage}`, { replace: true });
    }
  }, [boardId, boardIdStorage]);

  useEffect(() => {
    // Verify if an error was returned.
    // If is an error and boardId !== boardIdStorage redirect to boardIdStorage.
    // If both are equal, delete current boardIdStorage and redirect to index page to create a new one.
    if (getBoard.error && boardId === boardIdStorage) {
      localStorage.removeItem('boardId');
      toast.error(
        "We can't find your board. We trying to create you a new one."
      );
      navigate('/', { replace: true });
    } else if (getBoard.error && boardId !== boardIdStorage) {
      navigate(`/${boardIdStorage || ''}`, { replace: true });
      toast.error(
        "This board isn't valid or doesn't exist anymore. We trying to redirect you to your own board."
      );
    }
  }, [getBoard.error, boardId, boardIdStorage]);

  function handleOpenTask(e) {
    setTaskId(e.currentTarget.dataset.id);
    setShowTaskForm(true);
  }

  async function handleCreateNewTask() {
    if (createTask.isPending) return;
    const toastId = toast.loading('Loading...');
    try {
      await createTask.mutateAsync(boardId);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleUpdateBoard() {
    if (updateBoard.isPending) return;
    const newName = prompt('Choose your new board name');
    if (!newName) return;
    const toastId = toast.loading('Loading...');
    try {
      await updateBoard.mutateAsync({ name: newName });
    } finally {
      toast.dismiss(toastId);
    }
  }

  if (getBoard.status !== 'success') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-clr-white font-black">
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
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[40rem] p-8">
      <header className="mb-10 flex items-start gap-x-3 leading-none">
        <img src={logoSVG} alt="My Task Board Logo" />
        <div>
          <h1 className="mb-4 text-[2.5rem]">
            {getBoard.data.name}
            <img
              onClick={handleUpdateBoard}
              className="ml-3 inline-block cursor-pointer align-baseline"
              src={pencilSVG}
              alt="Pencil"
            />
          </h1>
          <h2>{getBoard.data.description}</h2>
        </div>
      </header>

      <main>
        <div className="mb-4 space-y-4">
          {getBoard.data.tasks.map(task => (
            <article
              key={task._id}
              onClick={handleOpenTask}
              className={`relative flex cursor-pointer items-start gap-x-6 rounded-xl ${statusInfo.get(task.status).bgColor} p-4`}
              data-id={task._id}
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
                <h3 className="text-xl font-semibold">{task.name}</h3>
                {task.description && (
                  <div className="mt-1 font-light leading-5">
                    {task.description.split('\n').map((text, i) => (
                      <div key={i}>{text}</div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div
          onClick={handleCreateNewTask}
          className={`flex cursor-pointer items-center gap-x-6 rounded-xl bg-clr-orange-light p-4 ${createTask.isPending === true ? 'cursor-not-allowed' : ''}`}
        >
          <span className="flex aspect-square w-11 shrink-0 items-center justify-center rounded-xl bg-clr-orange-dark">
            <img src={plusSVG} alt="" />
          </span>
          <h3 className="font-semibold">Add new task</h3>
        </div>
      </main>
      {showTaskForm && (
        <TaskForm
          boardId={boardId}
          taskData={getBoard.data.tasks.find(task => task._id === taskId)}
          setShowTaskForm={setShowTaskForm}
        />
      )}
    </div>
  );
}

export default TaskBoard;
