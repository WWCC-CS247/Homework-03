import './TaskList.css';
import React from 'react';
import { Task } from '../Task';
import { TaskInput } from '../TaskInput';
import emptyTasks from '../../assets/graphics/empty-tasks.svg';

class TaskList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.timers = [];
        this.nextId = 1;
        this.state = {
            tasks: []
        }
    }

    componentWillUnmount() {
        for (const timerTracker of this.timers) {
            clearTimeout(timerTracker.timerId);
        }
    }

    handleComplete = (taskId) => {
        this.setState((state) => ({
            ...state,
            tasks: state.tasks.map((task) => {
                if (task.id !== taskId) return task;

                return {
                    ...task,
                    isComplete: true
                };
            })
        }));

        const timerId = setTimeout(() => this.handleRemove(taskId), 4000);
        this.timers.push({ timerId, taskId });
    }

    handleRemove = (taskId) => {
        this.setState((state) => ({
            ...state,
            tasks: state.tasks.filter((task) => task.id !== taskId)
        }));

        this.timers = this.timers.filter((timerTracker) => timerTracker.taskId !== taskId);
    }

    handleNewTask = (taskDescription) => {
        const newTask = {
            id: String(this.nextId++),
            description: taskDescription,
            isComplete: false
        };

        this.setState((state) => ({
            ...state,
            tasks: [newTask, ...state.tasks]
        }));
    }

    render() {
        const isEmpty = this.state.tasks.length === 0;
        
        return (
            <>
                <TaskInput onNewTask={this.handleNewTask} />

                <div className="task-list">
                    {this.state.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onRemove={this.handleRemove}
                            onComplete={this.handleComplete}
                        />
                    ))}
                </div>

                {isEmpty && (
                    <div className="empty-tasks-container">
                        <img className="empty-tasks-graphic" src={emptyTasks} alt="No tasks yet" />
                        <h4 className="empty-tasks-text">No tasks yet!</h4>
                    </div>
                )}
            </>
        );
    }
}

export { TaskList };
