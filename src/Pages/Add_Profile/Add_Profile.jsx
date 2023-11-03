import React, { useState, useEffect } from 'react';
import "./Add_Profile.css";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';

const AddProfile = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [headCells, setHeadCells] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [tableTitle, setTableTitle] = useState('');
  const [columns, setColumns] = useState([]); // Danh sách cột
  const [rows, setRows] = useState([]); // Danh sách hàng

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Hàm khởi tạo cột mẫu
  const initializeSampleColumns = () => {
    const sampleColumns = [
      { id: 'name', label: 'Tên' },
      { id: 'age', label: 'Tuổi' },
      // Thêm các cột khác ở đây
    ];
    setColumns(sampleColumns);
  };

  // Hàm thêm cột mới
  const addColumn = () => {
    const newColumn = { id: `column-${columns.length + 1}`, label: 'Cột mới' };
    setColumns([...columns, newColumn]);
    // Cập nhật giá trị mặc định của các ô input cho cột mới
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => ({
        id: row.id,
        cells: [...row.cells, { id: newColumn.id, value: '' }],
      }));
      return updatedRows;
    });
  };

  // Hàm xóa cột
  const deleteColumn = (columnId) => {
    setColumns((prevColumns) => prevColumns.filter((column) => column.id !== columnId));
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => ({
        id: row.id,
        cells: row.cells.filter((cell) => cell.id !== columnId),
      }));
      return updatedRows;
    });
  };

  // Hàm thêm hàng mới
  const addRow = () => {
    const newRow = {
      id: `row-${rows.length + 1}`,
      cells: columns.map((column) => ({ id: column.id, value: '' })),
    };
    setRows([...rows, newRow]);
  };

  // Hàm xóa hàng
  const deleteRow = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  // Hàm cập nhật nội dung của ô input
  const handleCellChange = (rowId, columnId, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === rowId) {
          const updatedCells = row.cells.map((cell) => {
            if (cell.id === columnId) {
              return { ...cell, value: value };
            }
            return cell;
          });
          return { ...row, cells: updatedCells };
        }
        return row;
      });
      return updatedRows;
    });
  };

  useEffect(() => {
    initializeSampleColumns();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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

  const emptyRows = data.length > 0
    ? page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0
    : 0;

  const visibleRows = React.useMemo(() => {
    if (data.length === 0) return [];
    return stableSort(data, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, data]);

  function stableSort(array, comparator) {
    if (!array) return [];
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleColumnLabelChange = (columnId, newLabel) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, label: newLabel } : column
      )
    );
  };

  const handleRowCellChange = (rowId, columnId, value) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.id === rowId) {
          return {
            id: row.id,
            cells: row.cells.map((cell) =>
              cell.id === columnId ? { ...cell, value: value } : cell
            ),
          };
        }
        return row;
      });
    });
  };

  return (
    <div>
      <div className='Home'>
        <div className='table_history'>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
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
                    rowCount={rows.length}
                    headCells={columns}
                    addColumn={addColumn}
                    deleteColumn={deleteColumn}
                    onColumnLabelChange={handleColumnLabelChange}
                  />
                  <TableBody>
                    {visibleRows.map((row, rowIndex) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${rowIndex}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          {columns.map((column) => (
                            <TableCell key={column.id} align="left" padding="normal">
                              <TextField
                                value={row.cells.find((cell) => cell.id === column.id).value}
                                onChange={(e) =>
                                  handleRowCellChange(row.id, column.id, e.target.value)
                                }
                              />
                            </TableCell>
                          ))}
                          <TableCell>
                            <button onClick={() => deleteRow(row.id)}>Xóa Hàng</button>
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
                        <TableCell colSpan={columns.length + 1} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
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
        </div>
      </div>
      <button onClick={addRow}>Thêm Dòng</button>
    </div>
  );
};

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    addColumn,
    deleteColumn,
    onColumnLabelChange,
  } = props;

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
          <TableCell key={headCell.id} align="left" padding="normal">
            <TextField
              value={headCell.label}
              onChange={(e) => onColumnLabelChange(headCell.id, e.target.value)}
            />
          </TableCell>
        ))}
        <TableCell>
          <button onClick={addColumn}>Thêm Cột</button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, tableTitle } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette
.primary.main, theme.palette.action.activatedOpacity),
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
          {tableTitle ? tableTitle : 'Lịch sử thống kê'}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableTitle: PropTypes.string, // Bổ sung vào đây
};

export default AddProfile;

