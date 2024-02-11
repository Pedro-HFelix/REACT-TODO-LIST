import styles from './Tasks.module.css';
import { Trash, Check } from '@phosphor-icons/react'

export interface ITasks {
    id: string;
    content: string;
    isConcluded: boolean;
}

interface TaskProps {
    task: ITasks;
    deleteTask: (id: string) => void
    toggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void;
    totalTasks: number;
    completedTasks: number;
  }

export function Task({task, deleteTask, toggleTaskStatus, totalTasks, completedTasks } : TaskProps){
    function handleTaskToggle() {
        toggleTaskStatus({ id: task.id, value: !task.isConcluded})
    }

    function handleRemove() {
        deleteTask(task.id)
    }
    

    const taskCompleted = task.isConcluded ? 'checked' : 'unchecked'
    
    return (
        <div className={styles.lineTask}>
            
            <button onClick={handleTaskToggle}>
                <input readOnly type="checkbox" checked={task.isConcluded} />

                <span className={`${styles.taskCompleted} ${styles[taskCompleted]}`} >
                    {task.isConcluded && <Check size={12} />}
                </span>

                <p className={`${styles.taskCompleted} ${styles[taskCompleted]}`}>
                    {task.content}
                </p>

            </button>

            <button onClick={handleRemove}>
                <Trash size={16} color="#808080" />
            </button>

        </div>
    )
}