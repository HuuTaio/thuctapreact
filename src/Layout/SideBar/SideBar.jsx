import { useState, useEffect } from "react";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faXmark, // Add FontAwesome icons for hiding and showing the menu
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom"; // Thêm import này


const SideBar = () => {
    const [isHoSoSubMenuOpen, setIsHoSoSubMenuOpen] = useState(true);
    const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(true);
    const [isAnHienSubMenu, setIsAnHienSubMenu] = useState(
        window.innerWidth > 768
    );

    const toggleHoSoSubMenu = () => {
        setIsHoSoSubMenuOpen(!isHoSoSubMenuOpen);
    };

    const toggleUserSubMenu = () => {
        setIsUserSubMenuOpen(!isUserSubMenuOpen);
    };


    const toggleAnHienSubMenu = () => {
        setIsAnHienSubMenu(!isAnHienSubMenu);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsAnHienSubMenu(window.innerWidth > 768);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <div className="container-admin">
                <div className="nutanhien_menu">
                    <button onClick={toggleAnHienSubMenu}>
                        <FontAwesomeIcon icon={isAnHienSubMenu ? faXmark : faBars} />{" "}
                    
                    </button>
                </div>
                {isAnHienSubMenu && (
                    <div className="menu-container-admin">
                        <img src={"https://i.imgur.com/AB2qbqm.png"} alt="" />
                        <div className="main_Menu">
                               
                                <div className="scroll_bar">
                                <p className="title">HOME</p>
                                    <div className="single_Menu single_Menu_child">
                                        <NavLink to="/" activeclassname="active" className="link_SideBar">
                                            <h1>
                                                <div className="icon-menu">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="custom-svg">
                                                        <path d="M10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3ZM9 9H5V5H9V9ZM14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11ZM15 5H19V9H15V5ZM3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20ZM5 15H9V19H5V15ZM13 20C13 20.2652 13.1054 20.5196 13.2929 20.7071C13.4804 20.8946 13.7348 21 14 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V20ZM15 15H19V19H15V15Z" />
                                                    </svg>
                                                </div>
                                                Trang chủ
                                            </h1>
                                        </NavLink>
                                    </div>
                                    <p className="title">HỒ SƠ</p>
                                    <div className="single_Menu dropdow_Focus">
                                        <h1 onClick={toggleHoSoSubMenu}>
                                            <div className="icon-menu">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="custom-svg">
                                                    <path d="M0.80998 5.805L0.74998 4.5C0.74998 3.70435 1.06605 2.94129 1.62866 2.37868C2.19127 1.81607 2.95433 1.5 3.74998 1.5H9.25798C10.0536 1.50017 10.8165 1.81635 11.379 2.379L12.621 3.621C13.1835 4.18365 13.9464 4.49983 14.742 4.5H20.715C21.1319 4.49996 21.5442 4.5868 21.9256 4.75499C22.3071 4.92317 22.6493 5.16902 22.9304 5.47683C23.2116 5.78465 23.4255 6.14768 23.5585 6.54276C23.6915 6.93785 23.7407 7.35633 23.703 7.7715L22.7475 18.2715C22.6797 19.0169 22.3358 19.71 21.7833 20.2148C21.2307 20.7197 20.5094 20.9997 19.761 21H4.23898C3.49054 20.9997 2.76923 20.7197 2.21668 20.2148C1.66412 19.71 1.32021 19.0169 1.25248 18.2715L0.29698 7.7715C0.233059 7.07667 0.414571 6.38141 0.80998 5.8065V5.805ZM3.28498 6C3.07661 5.99999 2.87052 6.04339 2.67985 6.12744C2.48918 6.21149 2.31812 6.33434 2.17756 6.48816C2.037 6.64199 1.93003 6.82341 1.86348 7.02086C1.79692 7.21832 1.77223 7.42747 1.79098 7.635L2.74648 18.135C2.78016 18.5077 2.95193 18.8543 3.22807 19.1069C3.5042 19.3594 3.86477 19.4996 4.23898 19.5H19.761C20.1352 19.4996 20.4958 19.3594 20.7719 19.1069C21.048 18.8543 21.2198 18.5077 21.2535 18.135L22.209 7.635C22.2277 7.42747 22.203 7.21832 22.1365 7.02086C22.0699 6.82341 21.963 6.64199 21.8224 6.48816C21.6818 6.33434 21.5108 6.21149 21.3201 6.12744C21.1294 6.04339 20.9234 5.99999 20.715 6H3.28498ZM10.32 3.4395C10.1805 3.30002 10.015 3.18941 9.83274 3.114C9.65051 3.03858 9.4552 2.99984 9.25798 3H3.74998C3.35704 2.99993 2.97977 3.15405 2.69927 3.42922C2.41877 3.70439 2.25745 4.07864 2.24998 4.4715L2.25898 4.68C2.57998 4.563 2.92498 4.5 3.28498 4.5H11.379L10.32 3.4395Z" />
                                                </svg>
                                            </div>
                                            Quản lý hồ sơ
                                            <FontAwesomeIcon
                                                className="faChevronIcon"
                                                icon={
                                                    isHoSoSubMenuOpen ? faChevronUp : faChevronDown
                                                }
                                            />
                                        </h1>
                                        {isHoSoSubMenuOpen && (
                                            <div className="single_Menu_1">
                                                <div className="mini_Menu">
                                                <NavLink to="/list-course" activeclassname="active" className="link_SideBar">
                                                    
                                                    <div className="icon-menu">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="custom-svg">
                                                            <path d="M1.875 2.25C1.25156 2.25 0.75 2.75156 0.75 3.375V5.625C0.75 6.24844 1.25156 6.75 1.875 6.75H4.125C4.74844 6.75 5.25 6.24844 5.25 5.625V3.375C5.25 2.75156 4.74844 2.25 4.125 2.25H1.875ZM9 3C8.17031 3 7.5 3.67031 7.5 4.5C7.5 5.32969 8.17031 6 9 6H22.5C23.3297 6 24 5.32969 24 4.5C24 3.67031 23.3297 3 22.5 3H9ZM9 10.5C8.17031 10.5 7.5 11.1703 7.5 12C7.5 12.8297 8.17031 13.5 9 13.5H22.5C23.3297 13.5 24 12.8297 24 12C24 11.1703 23.3297 10.5 22.5 10.5H9ZM9 18C8.17031 18 7.5 18.6703 7.5 19.5C7.5 20.3297 8.17031 21 9 21H22.5C23.3297 21 24 20.3297 24 19.5C24 18.6703 23.3297 18 22.5 18H9ZM0.75 10.875V13.125C0.75 13.7484 1.25156 14.25 1.875 14.25H4.125C4.74844 14.25 5.25 13.7484 5.25 13.125V10.875C5.25 10.2516 4.74844 9.75 4.125 9.75H1.875C1.25156 9.75 0.75 10.2516 0.75 10.875ZM1.875 17.25C1.25156 17.25 0.75 17.7516 0.75 18.375V20.625C0.75 21.2484 1.25156 21.75 1.875 21.75H4.125C4.74844 21.75 5.25 21.2484 5.25 20.625V18.375C5.25 17.7516 4.74844 17.25 4.125 17.25H1.875Z" />
                                                        </svg>
                                                    </div>
                                                    <h2>Danh sách hồ sơ</h2>
                                                  
                                                </NavLink>
                                                </div>
                                                <div className="mini_Menu">
                                                <NavLink to="/cate-course" activeclassname="active" className="link_SideBar">
                                              
                                                    <div className="icon-menu">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="custom-svg">
                                                            <path d="M7.71071 3.96069L5.24996 6.42219L4.28921 5.45994L3.20996 6.53994L4.70996 8.03994L5.24921 8.55519L5.78846 8.03994L8.78846 5.03994L7.71071 3.96069ZM11.25 5.24994V6.74994H21V5.24994H11.25ZM7.71071 9.96069L5.24996 12.4214L4.28921 11.4614L3.21071 12.5392L4.71071 14.0392L5.24996 14.5544L5.78921 14.0392L8.78921 11.0392L7.71071 9.96069ZM11.25 11.2499V12.7499H21V11.2499H11.25ZM7.71071 15.9607L5.24996 18.4222L4.28921 17.4599L3.20996 18.5399L4.70996 20.0399L5.24921 20.5552L5.78846 20.0399L8.78846 17.0399L7.71071 15.9607ZM11.25 17.2499V18.7499H21V17.2499H11.25Z" />
                                                        </svg>
                                                    </div>
                                                    <h2>Xét duyệt hồ sơ</h2>
                                                  
                                                </NavLink>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="title">USER</p>
                                    <div className="single_Menu dropdow_Focus">
                                        <h1 onClick={toggleUserSubMenu}>
                                            <div className="icon-menu">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none" className="custom-svg">
                                                    <path d="M0.80998 4.805L0.74998 3.5C0.74998 2.70435 1.06605 1.94129 1.62866 1.37868C2.19127 0.816071 2.95433 0.5 3.74998 0.5H9.25798C10.0536 0.50017 10.8165 0.816352 11.379 1.379L12.621 2.621C13.1835 3.18365 13.9464 3.49983 14.742 3.5H20.715C21.1319 3.49996 21.5442 3.5868 21.9256 3.75499C22.3071 3.92317 22.6493 4.16902 22.9304 4.47683C23.2116 4.78465 23.4255 5.14768 23.5585 5.54276C23.6915 5.93785 23.7407 6.35633 23.703 6.7715L22.7475 17.2715C22.6797 18.0169 22.3358 18.71 21.7833 19.2148C21.2307 19.7197 20.5094 19.9997 19.761 20H4.23898C3.49054 19.9997 2.76923 19.7197 2.21668 19.2148C1.66412 18.71 1.32021 18.0169 1.25248 17.2715L0.29698 6.7715C0.233059 6.07667 0.414571 5.38141 0.80998 4.8065V4.805ZM3.28498 5C3.07661 4.99999 2.87052 5.04339 2.67985 5.12744C2.48918 5.21149 2.31812 5.33434 2.17756 5.48816C2.037 5.64199 1.93003 5.82341 1.86348 6.02086C1.79692 6.21832 1.77223 6.42747 1.79098 6.635L2.74648 17.135C2.78016 17.5077 2.95193 17.8543 3.22807 18.1069C3.5042 18.3594 3.86477 18.4996 4.23898 18.5H19.761C20.1352 18.4996 20.4958 18.3594 20.7719 18.1069C21.048 17.8543 21.2198 17.5077 21.2535 17.135L22.209 6.635C22.2277 6.42747 22.203 6.21832 22.1365 6.02086C22.0699 5.82341 21.963 5.64199 21.8224 5.48816C21.6818 5.33434 21.5108 5.21149 21.3201 5.12744C21.1294 5.04339 20.9234 4.99999 20.715 5H3.28498ZM10.32 2.4395C10.1805 2.30002 10.015 2.18941 9.83274 2.114C9.65051 2.03858 9.4552 1.99984 9.25798 2H3.74998C3.35704 1.99993 2.97977 2.15405 2.69927 2.42922C2.41877 2.70439 2.25745 3.07864 2.24998 3.4715L2.25898 3.68C2.57998 3.563 2.92498 3.5 3.28498 3.5H11.379L10.32 2.4395Z" />
                                                </svg>
                                            </div>
                                            Quản lý user
                                            <FontAwesomeIcon
                                                className="faChevronIcon"
                                                icon={
                                                    isUserSubMenuOpen ? faChevronUp : faChevronDown
                                                }
                                            />
                                        </h1>
                                        {isUserSubMenuOpen && (
                                            <div className="single_Menu_1">
                                                 <div className="mini_Menu">
                                                <NavLink to="/list-blog" activeclassname="active" className="link_SideBar">
                                               
                                                    <div className="icon-menu">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="custom-svg">
                                                            <path d="M1.875 2.25C1.25156 2.25 0.75 2.75156 0.75 3.375V5.625C0.75 6.24844 1.25156 6.75 1.875 6.75H4.125C4.74844 6.75 5.25 6.24844 5.25 5.625V3.375C5.25 2.75156 4.74844 2.25 4.125 2.25H1.875ZM9 3C8.17031 3 7.5 3.67031 7.5 4.5C7.5 5.32969 8.17031 6 9 6H22.5C23.3297 6 24 5.32969 24 4.5C24 3.67031 23.3297 3 22.5 3H9ZM9 10.5C8.17031 10.5 7.5 11.1703 7.5 12C7.5 12.8297 8.17031 13.5 9 13.5H22.5C23.3297 13.5 24 12.8297 24 12C24 11.1703 23.3297 10.5 22.5 10.5H9ZM9 18C8.17031 18 7.5 18.6703 7.5 19.5C7.5 20.3297 8.17031 21 9 21H22.5C23.3297 21 24 20.3297 24 19.5C24 18.6703 23.3297 18 22.5 18H9ZM0.75 10.875V13.125C0.75 13.7484 1.25156 14.25 1.875 14.25H4.125C4.74844 14.25 5.25 13.7484 5.25 13.125V10.875C5.25 10.2516 4.74844 9.75 4.125 9.75H1.875C1.25156 9.75 0.75 10.2516 0.75 10.875ZM1.875 17.25C1.25156 17.25 0.75 17.7516 0.75 18.375V20.625C0.75 21.2484 1.25156 21.75 1.875 21.75H4.125C4.74844 21.75 5.25 21.2484 5.25 20.625V18.375C5.25 17.7516 4.74844 17.25 4.125 17.25H1.875Z" />
                                                        </svg>
                                                    </div>
                                                    <h2>Danh sách user</h2>
                                                   
                                                </NavLink>
                                                </div>
                                            </div>
                                        )}
                                    </div>



                                </div>
                                <div className="bottom_siderbar_admin">
                                    <div className="dangXuat_Admin">
                                            <button>Đăng Xuất</button>
                                    </div>
                                </div>
                          
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SideBar;
