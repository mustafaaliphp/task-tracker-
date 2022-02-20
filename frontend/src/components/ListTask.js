import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

import { getTask, deleteTask, updateTask } from '../store/task/taskAction';
import { taskList, getTaskLoading, deleteTaskLoading, updateTaskLoading } from '../store/task/taskSelector';

export default function ListTask() {
  const dispatch = useDispatch();
  const taskListSelector = useSelector(taskList);
  const getTaskLoadingSelector = useSelector(getTaskLoading);
  const deleteTaskLoadingSelector = useSelector(deleteTaskLoading);
  const updateTaskLoadingSelector = useSelector(updateTaskLoading);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [updateTaskId, setUpdateTaskId] = useState(null);

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = () => {
    dispatch(getTask());
  }

  const removeTask = (task) => {
    setDeleteTaskId(task._id);
    dispatch(deleteTask(task._id));
  }

  const updateTaskStatus = (task) => {
    setUpdateTaskId(task._id);
    dispatch(updateTask({
      ...task,
      isCompleted: true
    }))
  }

  return (
    <Container>
      {!getTaskLoadingSelector && (taskListSelector.length === 0) && <h1>Task List Empty</h1>}
      {getTaskLoadingSelector && <Spinner animation="border" className="page-loader" />}
      <Row className="justify-content-center" className="mt-5">
        <Col>
          <ul className="list-group">
            {taskListSelector.map(task => (
              <li className={`${task.isCompleted ? 'task-completed' : 'task-pending'} list-group-item d-flex justify-content-between align-items-center`} key={task._id}>
                <span>{task.title}</span>
                <div>
                  {
                    !task.isCompleted && (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateTaskStatus(task)}>
                        <i className="fas fa-check"></i>
                        {updateTaskLoadingSelector && (task._id === updateTaskId) && <Spinner animation="border" size="sm" />}
                      </Button>
                    )
                  }
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => removeTask(task)}
                    className="ml-2">
                    <i className="fas fa-trash"></i>
                    {deleteTaskLoadingSelector && (task._id === deleteTaskId) && <Spinner animation="border" size="sm" />}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
