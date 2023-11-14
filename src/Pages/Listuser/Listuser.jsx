import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { getAll_users, delete_users } from '../reduxtool/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot, collection } from 'firebase/firestore';

function convertTimestampToDate(timestamp) {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleString(); // Adjust format as needed
}

const ListUser = () => {
    const [usersList, setusersList] = useState([]);

    const dispatch = useDispatch();
    const db = firebase.firestore();
    const navigate = useNavigate();
    const users = useSelector(state => state.usersReducer);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const users_List = [];
            snapshot.forEach((doc) => {
                users_List.push({ id: doc.id, ...doc.data() });
            });
            setusersList(users_List);
        });


        return () => unsubscribe();
    }, []);

    const handleDelete = id => {
        db.collection('users')
            .doc(id)
            .delete()
            .then(() => {
                dispatch(delete_users(id));
                navigate('/listuser');
            });
    };

    const handleEdit = id => {
        navigate('/edituser/' + id);
    };
console.log(usersList)
console.log(users)


    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                        <th>Loại tài khoản</th>
                        <th>Hình ảnh</th>
                        <th>Thời gian</th>
                        <th width="30px" className="text-center">
                            Sửa
                        </th>
                        <th width="30px" className="text-center">
                            Xóa
                        </th>
                    </tr>
                </thead>

                <tbody>
    {usersList ? (
        usersList.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.accountType}</td>
                <td>{item.img}</td>
                <td>{convertTimestampToDate(item.createdAt)}</td>
                <td>
                    <button className="btn" onClick={() => handleEdit(item.id)}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
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
    );
};

export default ListUser;
