import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, TableSortLabel, Dialog, DialogTitle, DialogContent, TextField, Button, TextareaAutosize, Select, MenuItem
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-reveal';

const headCells = [
    { id: 'name', label: 'Achievement' },
    { id: 'category', label: 'Achievement Category' },
    { id: 'Date', label: 'Date' },
];

const categories = ['Sport', 'Education', 'Music', 'Art', 'Science']; // add this line

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                )
                )
                }
            </TableRow>
        </TableHead>

    );
};


const MyAchievements = () => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [achievements, setAchievements] = useState(
       [
        {
            name : "Loading data...",
            category : "Loading data...",
            date : "Loading data..."
        }
       ]
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleOpenPopup = () =>{
        setOpenPopup(true);
    }

    const handleClosePopup = () =>{
        setOpenPopup(false);
    }

    useEffect(() => {
        const fetchAchievementData = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/achievement');
                setAchievements(response?.data);
            }catch(error){
                console.error("Error fetching user data : ", error);
            }
        };

        fetchAchievementData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const postAchievements = async () => {
            try{
                const response = await axios.post('http://localhost:5000/achievement', {
                    name, category
                });
                handleClosePopup();
                console.log("response of post : ", response);
                window.location.reload();
            }catch(error){
                console.error("Error fetching user data : ", error);
            }
    }

    const deleteAchievement = async () => {
        try{
            const id = selectedRow._id;
            const response = await axios.delete(`http://localhost:5000/achievement/${id}`);
            //handleClosePopup();
            console.log("response of post : ", response);
            handleCloseDetailsPopup();
            window.location.reload();
        }catch(error){
            console.error("Error fetching user data : ", error);
        }
    }

    const updateAchievement = async () => {
        try {
            const id = selectedRow._id;
            const response = await axios.put(`http://localhost:5000/achievement/${id}`, {
                name: selectedRow.name,
                category: selectedRow.category
            });
            handleCloseDetailsPopup();
            console.log("response of update : ", response);
            window.location.reload();
        } catch (error) {
            console.error("Error updating achievement : ", error);
        }
    }

    const handleRowClick = (row) =>{
        console.log("console logging **************** : ", row);
        setSelectedRow(row);
        setOpenDetailsPopup(true);
        console.log("console logging selectedRow **************** : ", selectedRow);
    }

    const handleOpenDetailsPopup = () =>{
        setOpenDetailsPopup(true);
    }

    const handleCloseDetailsPopup = () =>{
        setOpenDetailsPopup(false);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, achievements?.length - page*rowsPerPage);

    return (
        <Zoom>
        <Paper>
            {/* Add achievement popup */}
            <Dialog open={openPopup}>
                <DialogTitle>Add an Achievement</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        label="Achievement Title"
                        margin = "dense"
                        type="text"
                        fullWidth
                        value={name}
                        name="Achievement Title" 
                        placeholder="Title of the achievement" 
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        >

                        </TextField>
                        <Select  //from here
                        value={category}
                        placeholder='Select Category'
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select> 
                    {/* //to here */}
                    <Button onClick={postAchievements}>Add Achievement</Button>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                </DialogContent>
            </Dialog>
            <Dialog open={openDetailsPopup}>
                <DialogTitle>{selectedRow?.name}</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        label="Achievement Title"
                        margin = "dense"
                        type="text"
                        fullWidth
                        value={selectedRow?.name}
                        name="Achievement Title" 
                        placeholder="Title of the achievement" 
                        //id="name"
                        onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
                        >

                        </TextField>
                        <Select
                            placeholder='Select Category'
                            value={selectedRow?.category}
                            onChange={(e) => setSelectedRow({ ...selectedRow, category: e.target.value })}
                            fullWidth
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                        <TextField 
                        autoFocus
                        label="Date"
                        margin = "dense"
                        type="text"
                        fullWidth
                        value={selectedRow?.date}
                        disabled
                        // name="Achievement Title" 
                        // placeholder="Title of the achievement" 
                        //id="name"
                        //onChange={(e) => setName(e.target.value)}
                        >

                        </TextField>
                    
                    <Button onClick={updateAchievement}>Edit Achievement</Button>
                    <Button onClick={deleteAchievement} >Delete Achievement</Button>
                    <Button onClick={handleCloseDetailsPopup}>Cancel</Button>
                </DialogContent>
            </Dialog>
            <TableContainer>
                <Table>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                        { (rowsPerPage > 0 ? achievements?.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage) : achievements).map((row) => (
                            <TableRow key={row.name} onClick={()=> handleRowClick(row)} style={{cursor : 'pointer'}}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.date}</TableCell>
                            </TableRow>
                        )
                        )
                        }
                        {
                            emptyRows > 0 && (
                                <TableRow style={{height : 53 * emptyRows}}>
                                    <TableCell colSpan={3} />
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="outlined" sx={{backgroundColor : 'purple', color : 'white', '&:hover' : {backgroundColor : 'pink', color : 'purple'}}} onClick={handleOpenPopup}>Add Achievement</Button>
            <TablePagination
                rowsPerPageOptions={[5,10,25]}
                component="div"
                count={achievements?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />       
        </Paper>
        </Zoom>
    );
};

export default MyAchievements;