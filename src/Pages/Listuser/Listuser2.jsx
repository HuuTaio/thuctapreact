import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

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

  const db = firebase.firestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsersList(usersList);
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
          <button className="btn bg-neutral-content" onClick={handleDeleteSelected}>
            Xóa đã chọn
            <i class="fas fa-file-export"></i>
          </button>
          {/* ... */}
        </div>
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
                      checked={selectedRows.length === usersList.length}
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
              {usersList ? (
                usersList.map((item) => (
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
<td> <img src={item.img} alt="" width={ '50px' } /> </td>

<td>{getAccountTypeText(item.accountType)}</td>

<td>{item.password}</td>

<td>{new Date(item.createdAt.toDate()).toLocaleString()}</td>

<td>
    {" "}
    <div className=" flex gap-5">
        <NavLink
          to={`/edituser/${item.id}`}
            activeclassname="active"
            className="link_SideBar"
        >
            {" "}
            <div className="text-lg text-sky-500">
                <i class="fa-regular fa-pen-to-square cursor-pointer"></i>
            </div>
        </NavLink>
        <div className="w-0.5 h-6 bg-gray-300"></div>
        <div className="text-lg text-red-400 cursor-pointer" onClick={() => handleDelete(item.id)}>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Bạn có chắc chắn muốn xóa {selectedRows.length} người dùng đã chọn?</p>
          <button onClick={handleDelete}>Xác nhận</button>
          <button onClick={() => setShowConfirmation(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default Listuser;
