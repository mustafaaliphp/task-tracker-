import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Modal, Form, Spinner } from 'react-bootstrap';

import { addTask } from '../store/task/taskAction';
import { addTaskLoading } from '../store/task/taskSelector';

export default function AddTask() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const addTaskLoadingSelector = useSelector(addTaskLoading);

  const clearState = () => {
    setTaskName('');
    setTaskStatus('pending');
  }

  const onHide = () => {
    clearState();
    setShowModal(false);
  }

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  }

  const handleRadioChange = (e) => {
    setTaskStatus(e.target.value);
  }

  const handleSubmit = async () => {
    console.log(taskName, taskStatus);
    try {
      await dispatch(addTask({
        title: taskName,
        isCompleted: taskStatus === 'completed'
      }));
      setShowModal(false);
      clearState();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 2, offset: 10 }}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i>
            Add Task
            </Button>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" noValidate>
            <Form.Group controlId="taskname">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" placeholder="Enter task name" value={taskName} onChange={handleTaskNameChange} />
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} onChange={handleRadioChange}>
                <Form.Label as="legend" column sm={2}>
                  Task Status
                 </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Pending"
                    name="taskstatus"
                    id="pending"
                    value="pending"
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    label="Completed"
                    name="taskstatus"
                    value="completed"
                    id="completed"
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => onHide()}>Cancel</Button>
          <Button variant="secondary" onClick={() => handleSubmit()}>
            Submit
            {addTaskLoadingSelector && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
