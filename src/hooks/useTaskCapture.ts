import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export const useTaskCapture = () => {
  const { completeTask, updateXP, tasks } = useAppContext();
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastResult, setLastResult] = useState<{ taskTitle: string; xpEarned: number } | null>(null);

  const captureAndSubmit = useCallback((taskId: string) => {
    setIsCapturing(true);

    const task = tasks.find(t => t.id === taskId);
    const xpReward = task?.xpReward || 50;

    // Simulate a brief capture delay, then complete
    setTimeout(() => {
      completeTask(taskId);
      updateXP(xpReward);
      setLastResult({ taskTitle: task?.title || 'Task', xpEarned: xpReward });
      setIsCapturing(false);
    }, 600);
  }, [tasks, completeTask, updateXP]);

  const clearResult = useCallback(() => setLastResult(null), []);

  return { captureAndSubmit, isCapturing, lastResult, clearResult };
};
