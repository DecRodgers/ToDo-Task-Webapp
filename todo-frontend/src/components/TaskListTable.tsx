import React, { FC } from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    Paper
} from '@mui/material';

import { TaskData } from '../types/TaskData';
import './TaskListTable.css'; 

interface TaskListTableProps {
    tasksDataArray: TaskData[];
    onDelete: (id: number) => void;

}

const TaskListTable: FC<TaskListTableProps> = ({ tasksDataArray, onDelete }) => {

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksDataArray.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell align="left">{task.name}</TableCell>
                                <TableCell align="right">{task.priority}</TableCell>
                                <TableCell align="right">{task.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"><b>Total Tasks: {tasksDataArray.length}</b></TableCell>
                            </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
         </div>
        </>    
    );
}

export default TaskListTable;