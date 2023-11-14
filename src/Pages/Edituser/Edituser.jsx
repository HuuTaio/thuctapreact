// Edituser.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../reduxtool/userSlice';
import firebase from '../firebase/firebase';

const Edituser = () => {
    const { id } = useParams();
    const db = firebase.firestore();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');
    const [accountType, setAccountType] = useState('');

    useEffect(() => {
        db.collection('users')
            .doc(id)
            .get()
            .then(response => {
                setUserName(response.data().userName);
                setEmail(response.data().email);
                setPassword(response.data().password);
                setImg(response.data().img);
                setAccountType(response.data().accountType);
            });
    }, [id, db]);

    const handleUpdate = () => {
        db.collection('users')
            .doc(id)
            .update({
                userName,
                email,
                password,
                img,
                accountType
            })
            .then(() => navigate('/listuser'));
    };

    return (
        <div className="Hoso">
            <div className="text-4xl font-medium">Sửa user</div>
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
            <div className="flex justify-between items-center">
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
                <div className="flex gap-5">
                    <button className="btn bg-neutral-content">
                        Thoát <i className="fas fa-file-export"></i>
                    </button>
                    <button
                        style={{
                            backgroundColor: "#5D87FF",
                            color: "#ffff",
                        }}
                        className="btn "
                        onClick={handleUpdate}
                    >
                        + Cập nhật
                    </button>
                </div>
            </div>
            <div
                className="bg-white rounded-lg py-8"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text font-medium">
                            Tên user
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên user..."
                        className="input input-bordered w-full max-w-full bg-gray-100"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text font-medium">Mật khẩu</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập mật khẩu user..."
                        className="input input-bordered w-full max-w-full bg-gray-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text font-medium">
                            Loại tài khoản
                        </span>
                    </label>
                    <select
                        className="select select-bordered bg-gray-100"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option disabled selected>
                            Chọn loại tài khoản ?
                        </option>
                        <option>Nhân viên</option>
                        <option>Xét duyệt </option>
                        <option>Quản lý hồ sơ</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Edituser;
