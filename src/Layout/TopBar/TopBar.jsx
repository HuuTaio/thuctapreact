import React, { useState } from 'react';

import './TopBar.css';

const TopBar = () => {
    const [isUser_AdminOpen, setIsUser_AdminOpen] = useState(false);
    const [isThongbaoOpen, setIsThongbaoOpen] = useState(false);

    const toggleUserAdminSubMenu = () => {
        setIsUser_AdminOpen(!isUser_AdminOpen);
        setIsThongbaoOpen(false);
    };

  

    const toggleThongbaoSubMenu = () => {
        setIsThongbaoOpen(!isThongbaoOpen);
        setIsUser_AdminOpen(false);
    };
    return (
        <div className='topbar'>
            <div className='topbar_Right'>
                <div className='icon_Utilities float_Left'>
                    <div className='Notification' onClick={toggleThongbaoSubMenu}>
                        <div className='icon_Notification'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 38 38" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.75 30.0834C23.7503 30.8823 23.4485 31.6518 22.9053 32.2376C22.3621 32.8234 21.6175 33.1822 20.8208 33.2422L20.5833 33.2501H17.4167C16.6178 33.2503 15.8483 32.9486 15.2625 32.4054C14.6767 31.8622 14.3178 31.1176 14.2579 30.3209L14.25 30.0834H23.75ZM19 3.16675C21.8737 3.1667 24.6351 4.28283 26.7017 6.2797C28.7683 8.27657 29.9785 10.9981 30.077 13.8701L30.0833 14.2501V20.2097L32.9682 25.9794C33.0941 26.2312 33.1571 26.5097 33.1518 26.7911C33.1465 27.0725 33.0731 27.3485 32.9379 27.5953C32.8026 27.8422 32.6095 28.0526 32.3752 28.2085C32.1408 28.3644 31.8722 28.4612 31.5923 28.4906L31.4102 28.5001H6.58984C6.30826 28.5002 6.03087 28.432 5.78142 28.3014C5.53197 28.1708 5.31791 27.9816 5.15758 27.7501C4.99725 27.5187 4.89543 27.2518 4.86084 26.9723C4.82626 26.6929 4.85994 26.4092 4.959 26.1457L5.03184 25.9794L7.91667 20.2097V14.2501C7.91667 11.3106 9.08438 8.49151 11.1629 6.41298C13.2414 4.33445 16.0605 3.16675 19 3.16675ZM19 6.33341C16.9599 6.33353 14.9987 7.12119 13.5252 8.53213C12.0517 9.94306 11.1798 11.8684 11.0913 13.9065L11.0833 14.2501V20.2097C11.0834 20.6024 11.0103 20.9917 10.868 21.3577L10.7493 21.6268L8.89675 25.3334H29.1048L27.2523 21.6252C27.0766 21.2742 26.9676 20.8935 26.9309 20.5027L26.9167 20.2097V14.2501C26.9167 12.1505 26.0826 10.1368 24.5979 8.65215C23.1133 7.16749 21.0996 6.33341 19 6.33341Z" fill="#5C5C5C"/>
</svg>  
<span>20</span>
                        </div>
                        {isThongbaoOpen && (
                        <div className='content_Notification'>
                            <h1>THÔNG BÁO</h1>
                            <div className='box_content_Notification'>
                                <p>Đạt fix lỗi</p>
                        </div>
                        </div>
                        )}
                    </div>
                </div>
                <div className='User float_Left'>
                    {/* hình ảnh này là hình mặc định */}
                    <div className='avatar_User' onClick={toggleUserAdminSubMenu}>
                        <img src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png" alt="" />
                    </div>
                    {isUser_AdminOpen && (
                    <div className='content_User'>
                        <div className='box_content_User'>
                            <h2>Phạm Trường Đạt</h2>
                            <i>Admin</i>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;