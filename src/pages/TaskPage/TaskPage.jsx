import './TaskPage.css';

import React from 'react';
import { TaskList } from '../../components/TaskList';

class TaskPage extends React.PureComponent {
    render() {
        return (
            <div>
                <h1 className="task-header">Task List</h1>

                <TaskList />
            </div>
        );
    }
}

export { TaskPage };
