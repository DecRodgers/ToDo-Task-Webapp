import React, { FC } from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { TaskData } from '../types/TaskData';
import './TaskListTable.css'; 

interface TaskListTableProps {
    tasksDataArray: TaskData[];
    onDelete: (id: number) => void;

}

const TaskListTable: FC<TaskListTableProps> = ({ tasksDataArray, onDelete }) => {


    const handleEditClick = (task: TaskData) => {

    }

    const handleUpdateTask = () => {
       
    }


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
                                    <IconButton aria-label="delete" onClick={() => onDelete(task.id!)}><DeleteIcon/>
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

         {/* Edit Task Dialog */}
       
        </>    
    );
}

export default TaskListTable;