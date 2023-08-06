import React, { useState, FC, FormEvent} from 'react';
import { TaskData } from '../types/TaskData';
import {
    Button,
    TextField,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material'
import './TaskEntryForm.css';

interface TaskFormProps {
    onAdd: (task: TaskData) => void;
}

const TaskForm: FC<TaskFormProps> = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskStatus, setTaskStatus] = useState('Not Started');
    const [priorityError, setPriorityError] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        //Submission Check
        e.preventDefault();

        if (!taskPriority || isNaN(parseInt(taskPriority)) || parseInt(taskPriority) < 1 || parseInt(taskPriority) > 5) {
            setPriorityError(true);
            return;
        }

        onAdd({ name: taskName, priority: parseInt(taskPriority), status: taskStatus });
        setTaskName('');
        setTaskPriority('');
        setTaskPriority('Not Started');
        setPriorityError(false);
    };

    return (
        <form className="entry-form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4} sm={6}>
                    <InputLabel>Name</InputLabel>
                    <TextField                        
                        fullWidth
                        value={taskName}
                        onChange={(i) => setTaskName(i.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <InputLabel>Priority</InputLabel>
                    <TextField                        
                        type="number"
                        fullWidth
                        value={taskPriority}
                        onChange={(i) => setTaskPriority(i.target.value)}
                        required
                        error={priorityError}
                        helperText={priorityError ? 'Priority must be a positive number between 1 and 5' :''}
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <InputLabel>Status</InputLabel>
                    <FormControl fullWidth required>                        
                        <Select value={taskStatus} onChange={(i) => setTaskStatus(i.target.value as string)}>                            
                            <MenuItem value="Not Started">Not Started</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>                        
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default TaskForm;