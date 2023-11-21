import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebase';
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';

function convertTimestampToDate(timestamp) {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleString(); // Adjust format as needed
}

const getAccountTypeText = (accountType) => {
  switch (accountType) {
    case 0:
      return 'Nhân viên';
    case 1:
      return 'Xét duyệt';
    case 2:
      return 'Quản lý hồ sơ';
    default:
      return 'Unknown';
  }
};

const Listuser = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userCounts, setUserCounts] = useState({
    totalCount: 0,
    employeeCount: 0,
    approverCount: 0,
    managerCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const db = firebase.firestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsersList(users);
      const counts = countUsers(users);
      setUserCounts(counts);
    });

    return () => unsubscribe();
  }, [db]);

  const handleDelete = () => {
    selectedRows.forEach((id) => {
      db.collection('users')
        .doc(id)
        .delete()
        .then(() => {
          // Handle success if needed
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    });

    updateCountAfterDelete(selectedRows);

    setSelectedRows([]);
    setShowConfirmation(false);
    navigate('/listuser');
  };

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  const handleCheckboxChange = (id) => {
    const selectedRowsCopy = [...selectedRows];

    if (selectedRowsCopy.includes(id)) {
      const index = selectedRowsCopy.indexOf(id);
      selectedRowsCopy.splice(index, 1);
    } else {
      selectedRowsCopy.push(id);
    }

    setSelectedRows(selectedRowsCopy);
  };

  const handleDeleteSelected = () => {
    setShowConfirmation(true);
  };

  const countUsers = (usersList) => {
    const totalCount = usersList.length;
    let employeeCount = 0;
    let approverCount = 0;
    let managerCount = 0;

    usersList.forEach((user) => {
      const { accountType } = user;
      switch (accountType) {
        case 0:
          employeeCount += 1;
          break;
        case 1:
          approverCount += 1;
          break;
        case 2:
          managerCount += 1;
          break;
        default:
          break;
      }
    });

    return { totalCount, employeeCount, approverCount, managerCount };
  };

  const updateCountAfterDelete = async (deletedRows) => {
    try {
      const countsToUpdate = {
        employeeCount: 0,
        approverCount: 0,
        managerCount: 0,
      };

      usersList.forEach((user) => {
        if (!deletedRows.includes(user.id)) {
          const { accountType } = user;
          switch (accountType) {
            case 0:
              countsToUpdate.employeeCount += 1;
              break;
            case 1:
              countsToUpdate.approverCount += 1;
              break;
            case 2:
              countsToUpdate.managerCount += 1;
              break;
            default:
              break;
          }
        }
      });

      const countDocRef = doc(db, 'userCounts', 'counts');
      await updateDoc(countDocRef, {
        employeeCount: increment(countsToUpdate.employeeCount - userCounts.employeeCount),
        approverCount: increment(countsToUpdate.approverCount - userCounts.approverCount),
        managerCount: increment(countsToUpdate.managerCount - userCounts.managerCount),
      });
    } catch (error) {
      console.error('Error updating user counts: ', error);
    }
  };

  const filteredUsersList = usersList.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsersList = filteredUsersList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsersList.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination" style={{ display:'flex', margin:'10px', fontWeight:'bold' }}> Page
        {pageNumbers.map((number) => (
          <li style={{ marginLeft:'10px' }}
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="Hoso">
        <div className="text-4xl font-medium">Danh sách user</div>.
        <ul className="flex justify-start alignItem-center gap-14 font-medium cursor-pointer">
          <li>
            <a>Danh sách người dùng ({userCounts.totalCount})</a>
          </li>
          <li>
            <a>Nhân viên ({userCounts.employeeCount}) </a>
          </li>
          <li>
            <a>Xét duyệt ({userCounts.approverCount})</a>
          </li>
          <li>
            <a>Quản lý hồ sơ ({userCounts.managerCount})</a>
          </li>
        </ul>
        <div className="flex justify-between items-center ">
          <div className="form-control py-4">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="flex gap-5">
            <button className="btn bg-neutral-content">
              Thoát
              <i class="fas fa-file-export"></i>
            </button>
            <button
              className="btn bg-neutral-content"
              onClick={handleDeleteSelected}
            >
              Xóa đã chọn
              <i class="fa-solid fa-trash"></i>
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
      </div>

      <div className="container">
        <div className="table-responsive ">
          <table className="table custom-table ">
            <thead style={{ fontSize: '13px' }}>
              <tr>
                <th scope="col">
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => setSelectedRows([])}
                      checked={selectedRows.length === currentUsersList.length}
                    />
                  </label>
                </th>
                <th scope="col">ID</th>
                <th scope="col">TÊN NGƯỜI DÙNG</th>
                <th scope="col">Email</th>
                <th scope="col">ẢNH</th>
                <th scope="col">LOẠI TÀI KHOẢN</th>
                <th scope="col">MẬT KHẨU</th>
                <th scope="col">THỜI GIAN</th>
                <th scope="col">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {currentUsersList.length > 0 ? (
                currentUsersList.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(item.id)}
                          checked={selectedRows.includes(item.id)}
                        />
                      </label>
                    </th>
                    <td>{item.id}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td> <img src={item.img} alt="" width={'50px'} /> </td>
                    <td>{getAccountTypeText(item.accountType)}</td>
                    <td>{item.password}</td>
                    <td>
                      {new Date(item.createdAt.toDate()).toLocaleString()}
                    </td>
                    <td>
                      <div className=" flex gap-5">
                        <NavLink
                          to={`/edituser/${item.id}`}
                          activeclassname="active"
                          className="link_SideBar"
                        >
                          <div className="text-lg text-sky-500">
                            <i class="fa-regular fa-pen-to-square cursor-pointer"></i>
                          </div>
                        </NavLink>
                        <div className="w-0.5 h-6 bg-gray-300"></div>
                        <div
                          className="text-lg text-red-400 cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i class="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredUsersList.length > itemsPerPage && (
          <div className="pagination-container">{renderPagination()}</div>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>
            Bạn có chắc chắn muốn xóa {selectedRows.length} người dùng đã chọn?
          </p>
          <button onClick={handleDelete}>Xác nhận</button>
          <button onClick={() => setShowConfirmation(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default Listuser;
