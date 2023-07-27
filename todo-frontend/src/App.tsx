import React from 'react';
import { useState, useEffect } from "react";
//import logo from './logo.svg';
import { TaskData } from './types/TaskData';
import axios from 'axios';
import './App.css';


const API_BASE_URL = 'https://localhost:7210/api/tasks';

function App() {
    // Link2 as reference for useState useage to populate array
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
            <header className="App-header">TODO Application </header>
            {/*TaskListTable Component here*/}
            {/*TaskForm Component here*/}
            <footer className="App-footer">Application by Declan Rodgers</footer>
        </div>
    );

}

export default App;
