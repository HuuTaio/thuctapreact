import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import firebase from "firebase/app";
import "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';
import { alpha } from "@mui/system";
// Thay đổi các thông tin của bạn tại đây
import { db } from '../../firebase/firebase';
import Modal from '@mui/material/Modal';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
const profileCollection = collection(db, 'profile');

const headCells = [
  { id: "ProfileName", numeric: false, disablePadding: true, label: "Tên hồ sơ" },
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Thời gian' },
  { id: 'ProfileStatus', numeric: false, disablePadding: false, label: 'Trạng thái' },
  // { id: 'Operation', numeric: false, disablePadding: false, label: 'Operation' },
  { id: 'Comment', numeric: false, disablePadding: false, label: 'Bình luận' },
  { id: 'Utilities', numeric: false, disablePadding: false, label: 'Thao tác' },
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
            indeterminate={numSelected > 0 && numSelected < rowCount}
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

function EnhancedTableToolbar(props) {
  const { numSelected, handleDeleteSelected } = props; // Thêm handleDeleteSelected vào đây

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
          {numSelected} lựa chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Bảng danh sách hồ sơ
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelected}>
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

const Hoso = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ProfileName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const countEditing = data.filter(row => row.ProfileStatus === 0).length;
  const countReviewPending = data.filter(row => row.ProfileStatus === 1).length;
  const countManagerReviewPending = data.filter(row => row.ProfileStatus === 2).length;
  const countSuccess = data.filter(row => row.ProfileStatus === 3).length;
  const countReturned = data.filter(row => row.ProfileStatus === 4).length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(profileCollection);
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          // Chuyển đổi timestamp
          const timestamp = docData.timestamp ?
            new Date(docData.timestamp.seconds * 1000).toLocaleString() :
            '';
          return { id: doc.id, ...docData, timestamp };
        });
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleCommentClick = (event, rowId) => {
    event.stopPropagation();
    const commentRow = data.find(row => row.id === rowId);
    if (commentRow) {
      setSelectedComment(commentRow.Comment);
      setOpenModal(true);
    }
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // Chọn tất cả hồ sơ có ProfileStatus là 0 hoặc 4
      const newSelected = data
        .filter(row => row.ProfileStatus === 0 || row.ProfileStatus === 4)
        .map(n => n.id);
      setSelected(newSelected);
    } else {
      // Bỏ chọn tất cả các hồ sơ
      setSelected([]);
    }
  };



  const handleClick = (event, id, profileStatus) => {
    if (profileStatus !== 0 && profileStatus !== 4) {
      alert("Không thể chọn vì hồ sơ đã được gửi đi");
      // Nếu trạng thái không phải là 0 hoặc 4, không cho phép chọn
      return;
    }
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
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = stableSort(data, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  const getProfileStatusDescription = (status) => {
    switch (status) {
      case 0:
        return `Chưa gửi`;
      case 1:
        return 'Đã gửi chờ xét duyệt';
      case 2:
        return 'Đã xét duyệt đang chờ quản lý';
      case 3:
        return 'Thành công';
      case 4:
        return 'Trả về';
      default:
        return 'Không xác định';
    }
  };


  const handleEdit = (event, rowId) => {
    event.stopPropagation(); // Ngăn sự kiện lan tỏa
    const row = data.find(r => r.id === rowId);
    if (row) {
      sessionStorage.setItem('profileData', JSON.stringify(row));
      window.location.href = `/edit-profile/${row.id}`;
    } else {
      console.error("Không tìm thấy hàng với ID:", rowId);
    }
  };


  const handleDeleteSelected = async () => {
    if (selected.length === 0) {
      alert('Không có hồ sơ nào được chọn.');
      return;
    }

    const selectedProfiles = data.filter(row => selected.includes(row.id));
    const selectedNames = selectedProfiles.map(row => row.ProfileName).join(' \n ');
    const isConfirmed = window.confirm(`Bạn có muốn xóa các hồ sơ sau không?\n ${selectedNames}\n (Tổng cộng: ${selectedProfiles.length})\n`);

    if (isConfirmed) {
      // Xóa các hồ sơ đã chọn từ Firestore
      const deletePromises = selectedProfiles.map(profile => {
        const docRef = doc(db, "profile", profile.id);
        return deleteDoc(docRef);
      });

      try {
        await Promise.all(deletePromises);
        alert('Đã xóa hồ sơ thành công');
        // Cập nhật state sau khi xóa
        const newData = data.filter(row => !selected.includes(row.id));
        setData(newData);
        setSelected([]);
      } catch (error) {
        console.error("Lỗi khi xóa hồ sơ:", error);
        alert('Lỗi khi xóa hồ sơ');
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredData = data.filter(row =>
    row.ProfileName.toLowerCase().includes(searchTerm) ||
    getProfileStatusDescription(row.ProfileStatus).toLowerCase().includes(searchTerm)
  );

  const handleView = (event, rowId) => {
    event.stopPropagation();
    const row = data.find(r => r.id === rowId);
    if (row) {
      sessionStorage.setItem('profileContent', row.ProfileContent);
      sessionStorage.setItem('profileName', row.ProfileName);
      window.location.href = '/view-profile';
    } else {
      console.error("Không tìm thấy hàng với ID:", rowId);
    }
  };


  const handleSendProfiles = async () => {
    if (selected.length === 0) {
      alert('Không có hồ sơ nào được chọn.');
      return;
    }

    const selectedProfiles = data.filter(row =>
      selected.includes(row.id) &&
      (row.ProfileStatus === 0 || row.ProfileStatus === 4)
    );

    if (selectedProfiles.length === 0) {
      alert('Không có hồ sơ nào có thể gửi.');
      return;
    }

    try {
      const updatePromises = selectedProfiles.map(profile => {
        const docRef = doc(db, "profile", profile.id);
        return updateDoc(docRef, {
          ProfileStatus: 1,
          // Cập nhật các trường khác nếu cần
        });
      });

      await Promise.all(updatePromises);
      alert('Đã gửi hồ sơ thành công');

      // Cập nhật dữ liệu hiển thị
      const updatedData = data.map(row => {
        if (selected.includes(row.id)) {
          return { ...row, ProfileStatus: 1 };
        }
        return row;
      });
      setData(updatedData);
      setSelected([]); // Bỏ chọn sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gửi hồ sơ:", error);
      alert('Lỗi khi gửi hồ sơ');
    }
  };

  return (
    <div>
      <div className="Hoso">
        <div className="text-4xl font-bold text-lime-600">Hồ sơ</div>.{" "}
        <ul className="flex alignItem-center gap-5 font-medium cursor-pointer overflow-auto w-full">
                <li>
                    <a>Đang chỉnh sửa ({countEditing})</a>
                </li>
                <li>
                    <a>Đang chờ xét duyệt ({countReviewPending})</a>
                </li>
                <li>
                    <a>Đang chờ quản lý duyệt ({countManagerReviewPending})</a>
                </li>
                <li>
                    <a>Hồ sơ thành công ({countSuccess})</a>
                </li>
                <li>
                    <a>Hồ sơ trả về ({countReturned})</a>
                </li>
            </ul>
        <div className="flex justify-between items-center bg-white px-5 rounded-md mt-5 relative">
          {/* input */}
          <div className="form-control py-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                onChange={handleSearchChange}
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
          <div className="flex gap-5 absolute top-1/2 translate-y-[-50%] right-2 bg-white p-3">
            <button onClick={handleSendProfiles} className="btn bg-neutral-content">
              Gửi hồ sơ đi
              <i className="fas fa-file-export"></i>
            </button>
            <Link to="/add-profile">
              <button
                style={{
                  backgroundColor: "#5D87FF",
                  color: "#ffff",
                }}
                className="btn "
              >
                + Thêm hồ sơ
              </button>
            </Link>
          </div>
        </div>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteSelected={handleDeleteSelected}
          className="bg-white"
        />
        <TableContainer className="bg-white">
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
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const canEdit = row.ProfileStatus === 0 || row.ProfileStatus === 4;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id, row.ProfileStatus)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" id={labelId}>
                        {row.ProfileName}
                      </TableCell>
                      <TableCell align="center">{row.timestamp}</TableCell>
                      <TableCell align="center">
                        {getProfileStatusDescription(row.ProfileStatus)}
                      </TableCell>
                      {/* <TableCell align="center">{row.Operation}</TableCell> */}
                      <TableCell align="center">
                        <IconButton onClick={(event) => handleCommentClick(event, row.id)}>
                          <CommentIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        {canEdit && (
                          <IconButton onClick={(event) => handleEdit(event, row.id)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {/* Icon Xem */}
                        <IconButton onClick={(event) => handleView(event, row.id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                      {/* Thêm các TableCell khác nếu cần */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="bg-white"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Thu gọn độ rộng hàng"
        />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedComment}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Hoso;
