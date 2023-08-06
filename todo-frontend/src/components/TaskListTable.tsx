import React, { FC, useState } from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskData } from '../types/TaskData';
import './TaskListTable.css'; 

interface TaskListTableProps {
    tasksDataArray: TaskData[];
    onDelete: (id: number) => void;
    onUpdate: (id: number, updatedTask: TaskData) => void;
};

const TaskListTable: FC<TaskListTableProps> = ({ tasksDataArray, onDelete, onUpdate }) => {
    const [editTask, setEditTask] = useState<TaskData | null>(null);
    const [deleteTask, setDeleteTask] = useState<TaskData | null>(null);
    const [taskStatus, setTaskStatus] = useState<string>(''); 
    const [priorityError, setPriorityError] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleEditClick = (task: TaskData) => {
        setEditTask(task);
        setTaskStatus(task.status); 
    };

    const handleUpdateTask = () => {
        if (editTask) {
            if (isNaN(editTask?.priority) || editTask?.priority < 1 || editTask?.priority > 5) {
                setPriorityError(true);
                return;
            }
            onUpdate(editTask.id!, { ...editTask, status: taskStatus }); 
            setEditTask(null);
        }
    };

    const handleDeleteClick = (task: TaskData) => {
        setDeleteTask(task);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = () => {
        if (deleteTask) {
            onDelete(deleteTask.id!);        
            setShowDeleteConfirmation(false);
        }
    };

    return (
        <>
        <div className="Table-container">
            <TableContainer>
                    <Table aria-label="task list table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Priority</b></TableCell>
                            <TableCell align="right"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksDataArray.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell align="left">{task.name}</TableCell>
                                <TableCell align="right">{task.priority}</TableCell>
                                <TableCell align="right">{task.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(task)}><EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(task)}><DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right"><b>Total Tasks: {tasksDataArray.length}</b></TableCell>
                            </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this task?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
                <Button onClick={handleDeleteConfirmation} color="error">Delete</Button>
            </DialogActions>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={Boolean(editTask)} onClose={() => setEditTask(null)}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent >
                <TextField margin="dense" 
                    fullWidth
                    label="Name"
                    value={editTask?.name || ''}
                    onChange={(i) => setEditTask({ ...editTask!, name: i.target.value })}
                />
                <TextField margin="dense"
                    fullWidth
                    label="Priority"
                    type="number"
                    helperText={priorityError ? 'Priority must be a positive number between 1 and 5' : ''}
                    value={editTask?.priority || ''}
                    onChange={(i) => setEditTask({ ...editTask!, priority: parseInt(i.target.value) })}
                />
                <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={taskStatus} // Set the value to taskStatus state
                        onChange={(i) => setTaskStatus(i.target.value as string)} // Set the selected value to taskStatus state
                    >
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setEditTask(null)}>Cancel</Button>
                <Button onClick={handleUpdateTask}>Update</Button>
            </DialogActions>
        </Dialog>
        </>    
    );
}

export default TaskListTable;