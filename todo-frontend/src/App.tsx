import React from 'react';
import { useState, useEffect } from "react";
//import logo from './logo.svg';
import { TaskData } from './types/TaskData';
import TaskListTable from './components/TaskListTable';
import TaskEntryForm from './components/TaskEntryForm';
import axios from 'axios';
import './App.css';


const API_BASE_URL = 'https://localhost:7210/api/tasks';

function App() {
    // Link2 as reference for useState useage to populate default/updated states 
    const [taskList, setTasks] = useState<TaskData[]>([]);    

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get<TaskData[]>(API_BASE_URL);
            setTasks(response.data);
        } catch (error) {
            console.error('AXIOS: Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (newTask: TaskData) => {
        try {
            await axios.post(API_BASE_URL, newTask);
            fetchTasks();
        } catch (error) {
            console.error('AXIOS: Error adding task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('AXIOS: Error deleting task:', error);
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: TaskData) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, updatedTask);
            fetchTasks();
        } catch (error) {
            console.error('AXIOS: Error updating task:', error);
        }
    };

    return (
        <div className="container">
            <header className="App-header">Task Management Application </header>
            {/*TaskForm Component here*/}
            <TaskEntryForm onAdd={handleAddTask}></TaskEntryForm>
            <div></div>
            {/*TaskListTable Component here*/}
            <TaskListTable tasksDataArray={taskList} onDelete={handleDeleteTask} onUpdate={handleUpdateTask}></TaskListTable>            
            <footer className="App-footer">Project for Barclays 2023</footer>
        </div>
    );

}

export default App;
