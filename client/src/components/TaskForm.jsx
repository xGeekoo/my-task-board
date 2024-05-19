import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi
} from '../services/apiTask';
import orangeCrossSVG from '../assets/close_ring_duotone-1.svg';
import clockSVG from '../assets/Time_atack_duotone.svg';
import checkmarkSVG from '../assets/Done_round_duotone.svg';
import crossSVG from '../assets/close_ring_duotone.svg';
import trashSVG from '../assets/Trash.svg';
import aloneCheckmarkSVG from '../assets/Done_round.svg';
import toast from 'react-hot-toast';

const LABEL_CSS = 'mb-1 text-sm font-medium text-clr-gray-dark';
const ICONS = ['👨‍💻', '💬', '☕', '🏋️', '📚', '⏰'];
const STATUS = [
  {
    color: 'bg-clr-orange-dark',
    img: clockSVG,
    message: 'In Progress',
    value: 'in-progress'
  },
  {
    color: 'bg-clr-green-dark',
    img: checkmarkSVG,
    message: 'Completed',
    value: 'completed'
  },
  {
    color: 'bg-clr-red-dark',
    img: crossSVG,
    message: "Won't do",
    value: 'wont-do'
  }
];

function TaskForm({ boardId, taskData, setShowTaskForm }) {
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: taskData?.name,
      description: taskData?.description,
      icon: taskData?.icon,
      status: taskData?.status
    }
  });

  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationFn: updatedTask =>
      updateTaskApi(updatedTask, taskData._id, boardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
        exact: true
      });
      toast.success('Your task has been updated!');
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  const deleteTask = useMutation({
    mutationFn: () => deleteTaskApi(boardId, taskData._id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
        exact: true
      });
      toast.success('Your task has been deleted!');
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  async function onSubmit(data) {
    const toastId = toast.loading('Loading...');
    try {
      await updateTask.mutateAsync(data);
      setShowTaskForm(false);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleDelete() {
    if (confirm('Are you sure you want delete this task ?')) {
      const toastId = toast.loading('Loading...');
      try {
        await deleteTask.mutateAsync();
        setShowTaskForm(false);
      } finally {
        toast.dismiss(toastId);
      }
    }
  }

  function handleOutsideClick(e) {
    if (e.target === e.currentTarget) setShowTaskForm(false);
  }

  useEffect(() => {
    function closeTaskForm(e) {
      if (e.code === 'Escape') setShowTaskForm(false);
    }

    addEventListener('keydown', closeTaskForm);

    return () => removeEventListener('keydown', closeTaskForm);
  }, [setShowTaskForm]);

  return createPortal(
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-10 overflow-auto bg-clr-gray-medium p-4"
    >
      <div className="max-w-[38rem] rounded-xl bg-clr-white px-7 py-5">
        <header className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-semibold">Task details</h3>
          <img
            onClick={() => setShowTaskForm(false)}
            className="cursor-pointer rounded-xl border-2 border-clr-gray-light p-2"
            src={orangeCrossSVG}
            alt="Orange X"
          />
        </header>
        <main className="mb-14">
          <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting} className="mb-4">
              <label className={LABEL_CSS} htmlFor="name">
                Task name
              </label>
              <input
                className="w-full rounded-xl border border-clr-gray-medium bg-clr-white px-4 py-2"
                type="text"
                id="name"
                {...register('name', {
                  required: 'Please provide a task name.'
                })}
              />
              {errors.name && (
                <p className="font-medium text-clr-red-dark">
                  {errors.name.message}
                </p>
              )}
            </fieldset>
            <fieldset disabled={isSubmitting} className="mb-4">
              <label className={LABEL_CSS} htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full rounded-xl border border-clr-gray-medium bg-clr-white px-4 py-2 placeholder:text-clr-gray-dark"
                id="description"
                rows="5"
                placeholder="Enter a short description"
                {...register('description')}
              ></textarea>
            </fieldset>
            <div className="mb-4">
              <label className={LABEL_CSS}>Icon</label>
              <fieldset
                disabled={isSubmitting}
                className="flex flex-wrap gap-4 text-xl [&:disabled_label]:cursor-not-allowed"
              >
                {ICONS.map(icon => (
                  <React.Fragment key={icon}>
                    <input
                      className="hidden [&:checked+label]:bg-clr-yellow"
                      type="radio"
                      value={icon}
                      id={icon}
                      {...register('icon', {
                        required: 'Please provide an icon.'
                      })}
                    />
                    <label
                      className="cursor-pointer rounded-xl bg-clr-gray-light p-4"
                      htmlFor={icon}
                    >
                      {icon}
                    </label>
                  </React.Fragment>
                ))}
              </fieldset>
              {errors.icon && (
                <p className="font-medium text-clr-red-dark">
                  {errors.icon.message}
                </p>
              )}
            </div>
            <div>
              <label className={LABEL_CSS}>Status</label>
              <fieldset
                disabled={isSubmitting}
                className="grid gap-x-4 gap-y-2 sm:grid-cols-2 [&:disabled_label]:cursor-not-allowed"
              >
                {STATUS.map(status => (
                  <React.Fragment key={status.value}>
                    <input
                      className="hidden [&:checked+label]:ring-2 [&:checked+label]:ring-clr-blue"
                      type="radio"
                      value={status.value}
                      id={status.value}
                      {...register('status', {
                        required: 'Please provide a status.'
                      })}
                    />
                    <label
                      className="flex cursor-pointer items-center gap-x-4 rounded-xl border-2 p-1 font-medium"
                      htmlFor={status.value}
                    >
                      <img
                        className={`rounded-xl p-4 ${status.color}`}
                        src={status.img}
                        alt={status.message}
                      />
                      <h4>{status.message}</h4>
                    </label>
                  </React.Fragment>
                ))}
              </fieldset>
              {errors.status && (
                <p className="font-medium text-clr-red-dark">
                  {errors.status.message}
                </p>
              )}
            </div>
          </form>
        </main>
        <footer className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
          <button
            className="flex items-center gap-x-2 rounded-full bg-clr-gray-dark px-7 py-1.5 text-clr-white disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            Delete <img src={trashSVG} alt="Delete" />
          </button>
          <button
            className="flex items-center gap-x-2 rounded-full bg-clr-blue px-7 py-1.5 text-clr-white disabled:cursor-not-allowed"
            type="submit"
            form="task-form"
            disabled={isSubmitting}
          >
            Save <img src={aloneCheckmarkSVG} alt="Save" />
          </button>
        </footer>
      </div>
      {/* <DevTool control={control} /> */}
    </div>,
    document.body
  );
}

export default TaskForm;
