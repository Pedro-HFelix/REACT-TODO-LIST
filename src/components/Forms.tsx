import styles from './Forms.module.css';
import svg from "../assets/plus.svg";
import clipboard from '../assets/clipboard.png';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { v4 as uuid } from 'uuid';
import {Task, ITasks } from './Tasks';

export function Form()
{
    const [Tasks, setTasks] = useState<ITasks[]>([]);;
    const [newtTask, setNewTask] = useState('');
    
    const totalTasks     = Tasks.length;
    const completedTasks = Tasks.reduce((count, task) => {
        return task.isConcluded ? count +1 : count;
    }, 0);
    const isTaskEmpty = newtTask.length === 0;

    function handleNewTask(event : FormEvent){
        event.preventDefault()

        const newtTaskToSave :ITasks = {
            id: uuid(),
            content: newtTask,
            isConcluded: false
        };
        setTasks([...Tasks, newtTaskToSave]);
        setNewTask(''); 
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setNewTask(event.target.value);
    }

    function handleNewInvalidTask(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('This field is required, it cannot be empty!');
    }

    function deleteTask(idTask:string) {
        const tasksWithoutDeleteOne = Tasks.filter(Tasks => {
            return Tasks.id != idTask;
        })

        setTasks(tasksWithoutDeleteOne);
    }

    function toggleTask({ id, value }: { id: string; value: boolean }) {
        const updatedTasks = Tasks.map((task) => {
          if (task.id == id) {
            return { ...task, isConcluded: value }
          }
    
          return { ...task }
        });

        setTasks(updatedTasks);
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleNewTask}>
                <input type="text"
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewTaskChange}
                    value={newtTask}
                    onInvalid={handleNewInvalidTask}
                    required
                    className={styles.input}
                />


                <div>
                    <button type="submit" className={styles.contentButton}>
                        Criar <img src={svg} alt="plus icon" />
                    </button>
                </div>
            </form>

            <div>

            </div>

            <div className={styles.task}>
                <div className={styles.taskInfo}>
                    <p>
                        Tarefas criadas <span>{totalTasks}</span> 
                    </p>
                    <p>
                    Concluídas <span>{completedTasks}</span>
                    </p>
                </div>
                {
                    totalTasks == 0 ? (
                        <div className={styles.empty}>
                            <img src={clipboard} alt="clipboard for empty task" />
                            <div>
                                <p> 
                                    <strong>Você ainda não tem tarefas cadastradas</strong><br/>
                                    Crie tarefas e organize seus itens a fazer</p>
                            </div>
                        </div>
                        ) : (
                        <div>
                            {
                                Tasks.map(task => (
                                <Task
                                key={task.id}
                                task={task}
                                toggleTaskStatus={toggleTask} 
                                deleteTask={deleteTask}
                                totalTasks={totalTasks}
                                completedTasks={completedTasks}
                                />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            
    </div>
                 
    )
}