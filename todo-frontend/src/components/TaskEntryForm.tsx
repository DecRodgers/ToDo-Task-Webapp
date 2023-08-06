import React, { useState, FC, FormEvent} from 'react';
import { TaskData } from '../types/TaskData';
import {
    Button,
    TextField,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material'

interface TaskFormProps {
    onAdd: (task: TaskData) => void;
}

const TaskForm: FC<TaskFormProps> = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskStatus, setTaskStatus] = useState('Not Started');
    const [priorityError, setPriorityError] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        //Submission Checks
        e.preventDefault();

        if (!taskPriority || isNaN(parseInt(taskPriority)) || parseInt(taskPriority) < 1 || parseInt(taskPriority) > 5) {
            setPriorityError(true);
            return;
        }

        onAdd({ name: taskName, priority: parseInt(taskPriority), status: taskStatus });
        setTaskName('');
        setTaskPriority('Not Started');
        setPriorityError(false);
    };

    return (
        <div>
        </div>   
    );
}