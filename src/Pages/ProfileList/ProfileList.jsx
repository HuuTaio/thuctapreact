import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const ProfileList = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [selectedForDeletion, setSelectedForDeletion] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [profiles, setProfiles] = useState([]);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [headCells] = useState([
        { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'tienich', numeric: false, disablePadding: false, label: 'Tiện ích' },
    ]);
    const navigate = useNavigate();

    const handleViewClick = (profile) => {
        navigate('/view-profile', { state: { data: profile } });
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
            : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    useEffect(() => {
        axios.get('http://localhost:3002/profiles')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setProfiles(response.data);
                }
            })
            .catch(error => {
                console.error('Error loading data:', error);
            });
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = profiles.map((profile) => profile.id);
    
            // Cập nhật cả hai biến selected và selectedForDeletion
            setSelected(newSelected);
            setSelectedForDeletion(newSelected);
        } else {
            setSelected([]);
            setSelectedForDeletion([]);
        }
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        const newSelected = [...selected];
        
        if (selectedIndex === -1) {
            newSelected.push(id);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
    
        // Cập nhật cả hai biến selected và selectedForDeletion
        setSelected(newSelected);
        setSelectedForDeletion(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, profiles.length - page * rowsPerPage);

    const visibleProfiles = stableSort(profiles, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const deleteProfileById = (id) => {
        // Thực hiện xóa hồ sơ dựa trên id bằng cách gửi yêu cầu HTTP DELETE đến API
        axios.delete(`http://localhost:3002/profiles/${id}`)
            .then(response => {
                // Xử lý thành công (ví dụ: cập nhật danh sách profiles)
                const updatedProfiles = profiles.filter((profile) => profile.id !== id);
                setProfiles(updatedProfiles);
            })
            .catch(error => {
                console.error('Error deleting profile:', error);
            });
    };
    const handleDeleteClick = () => {
        if (selectedForDeletion.length > 0) {
            setDeleteDialogOpen(!isDeleteDialogOpen);
        }
    };
    const deleteSelectedProfiles = () => {
        selectedForDeletion.forEach((id) => {
            // Gọi hàm xóa hồ sơ dựa trên ID (đảm bảo bạn đã cài đặt nó)
            deleteProfileById(id);
        });
 // Đặt lại danh sách đã chọn và đóng hộp thoại
 setSelected([]);
 setSelectedForDeletion([]);
 setDeleteDialogOpen(false); // Đảm bảo đóng hộp thoại sau khi xóa.
    };


    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} handleDeleteClick={handleDeleteClick} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={profiles.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {visibleProfiles.map((profile) => {
                                    const isItemSelected = isSelected(profile.id);
                                    const labelId = `enhanced-table-checkbox-${profile.id}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, profile.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={profile.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}

                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isSelected(profile.id)}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">{profile.id}</TableCell>
                                            <TableCell align="center">{profile.name}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="Xem"
                                                    onClick={() => handleViewClick(profile)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="Sửa">
                                                    <EditIcon />
                                                </IconButton>
                                                {/* <IconButton aria-label="Xóa">
                                                    <DeleteIcon />
                                                </IconButton> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={profiles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>
            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                fullWidth
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa {selectedForDeletion.length} hồ sơ đã chọn?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={deleteSelectedProfiles} color="primary">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const EnhancedTableHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, handleDeleteClick } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Danh sách hồ sơ
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Thêm hồ sơ">
                    <DialogActions>
                        <Button>Thêm hồ sơ</Button>
                    </DialogActions>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export default ProfileList;
