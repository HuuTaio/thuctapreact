import React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { NavLink } from "react-router-dom";

function createData(
    id,
    tennguoidung,
    anh,
    loaitaikhoan,
    matkhau,
    thoigian,
    thaotac
) {
    return {
        id,
        tennguoidung,
        anh,
        loaitaikhoan,
        matkhau,
        thoigian,
        thaotac,
    };
}

const rows = [
    createData(
        1,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023"
    ),
    createData(
        2,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023"
    ),
    createData(
        3,
        "Buihuutai123",
        "Hình ảnh",
        "Xét duyệt",
        "12345",
        "12/07/2023"
    ),
    createData(
        4,
        "Buihuutai123",
        "Hình ảnh",
        "Xét duyệt",
        "12345",
        "12/07/2023"
    ),
    createData(
        5,
        "Buihuutai123",
        "Hình ảnh",
        "Xét duyệt",
        "12345",
        "12/07/2023"
    ),
    createData(6, "Buihuutai123", "Hình ảnh", "Quản lí", "12345", "12/07/2023"),
    createData(7, "Buihuutai123", "Hình ảnh", "Quản lí", "12345", "12/07/2023"),
    createData(
        8,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023",
        2.0
    ),
    createData(
        9,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023",
        2.0
    ),
    createData(
        10,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023"
    ),
    createData(
        11,
        "Buihuutai123",
        "Hình ảnh",
        "Nhân viên",
        "12345",
        "12/07/2023",
        2.0
    ),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
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

const headCells = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "ID",
    },
    {
        id: "tennguoidung",
        numeric: false,
        disablePadding: true,
        label: "Tên người dùng",
    },
    {
        id: "anh",
        numeric: true,
        disablePadding: false,
        label: "Ảnh",
    },
    {
        id: "loaitaikhoan",
        numeric: true,
        disablePadding: false,
        label: "Loại tài khoản",
    },
    {
        id: "matkhau",
        numeric: true,
        disablePadding: false,
        label: "Mật khẩu ",
    },
    {
        id: "thoigian",
        numeric: true,
        disablePadding: false,
        label: "Thời gian",
    },
    {
        id: "thaotac",
        numeric: true,
        disablePadding: false,
        label: "Thao tác",
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow align="center">
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Danh sách user
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
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
const Hoso = () => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("namnguoidung");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
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
                selected.slice(selectedIndex + 1)
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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );
    return (
        <div>
            <div className="Hoso">
                <div className="text-4xl font-medium">Danh sách user</div>.{" "}
                <ul className="flex justify-start alignItem-center gap-14 font-medium cursor-pointer">
                    <li>
                        <a>Danh sách người dùng (68)</a>
                    </li>
                    <li>
                        <a>Nhân viên (22) </a>
                    </li>
                    <li>
                        <a>Xét duyệt (12)</a>
                    </li>
                    <li>
                        <a>Quản lý hồ sơ (17)</a>
                    </li>
                </ul>
                <div className="flex justify-between items-center ">
                    {/* input */}
                    <div className="form-control py-4">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="input input-bordered"
                            />
                            <button className="btn btn-square">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* end */}
                    {/* button */}
                    <div className="flex gap-5">
                        <button className="btn bg-neutral-content">
                            Thoát
                            <i class="fas fa-file-export"></i>
                        </button>
                        <NavLink
                            to="/adduser"
                            activeclassname="active"
                            className="link_SideBar"
                        >
                            <button
                                style={{
                                    backgroundColor: "#5D87FF",
                                    color: "#ffff",
                                }}
                                className="btn "
                            >
                                + Add user
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="table_history">
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ width: "100%", mb: 2 }}>
                            <EnhancedTableToolbar
                                numSelected={selected.length}
                            />
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? "small" : "medium"}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {visibleRows.map((row, index) => {
                                            const isItemSelected = isSelected(
                                                row.id
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row.id
                                                        )
                                                    }
                                                    role="checkbox"
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby":
                                                                    labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.tennguoidung}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.anh}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.loaitaikhoan}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.matkhau}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.thoigian}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div className="flex gap-3 justify-center items-center">
                                                            <NavLink
                                                                to="/edituser"
                                                                activeclassname="active"
                                                                className="link_SideBar"
                                                            >
                                                                <i className="fa-regular fa-pen-to-square text-blue-500 text-xl">
                                                                    {
                                                                        row.thaotac
                                                                    }
                                                                </i>
                                                            </NavLink>

                                                            <div className="w-0.5 h-5 bg-gray-300"></div>
                                                            <i className="fa-regular fa-trash-can text-red-500 text-xl">
                                                                {row.thaotac}
                                                            </i>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height:
                                                        (dense ? 33 : 53) *
                                                        emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
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
                            control={
                                <Switch
                                    checked={dense}
                                    onChange={handleChangeDense}
                                />
                            }
                            label="Dense padding"
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Hoso;
