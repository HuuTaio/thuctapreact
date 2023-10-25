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
  const [isKhaoHocSubMenuOpen, setIsKhaoHocSubMenuOpen] = useState(false);
  const [isBaiVietSubMenuOpen, setIsBaiVietSubMenuOpen] = useState(false);
  const [isThanhVienSubMenuOpen, setIsThanhVienSubMenuOpen] = useState(false);
  const [isAnHienSubMenu, setIsAnHienSubMenu] = useState(
    window.innerWidth > 768
  );

  const toggleKhaoHocSubMenu = () => {
    setIsKhaoHocSubMenuOpen(!isKhaoHocSubMenuOpen);
  };

  const toggleBaiVietSubMenu = () => {
    setIsBaiVietSubMenuOpen(!isBaiVietSubMenuOpen);
  };
  const toggleThanhVienSubMenu = () => {
    setIsThanhVienSubMenuOpen(!isThanhVienSubMenuOpen);
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
            {/* Toggle visibility icon */}
          </button>
        </div>
        {isAnHienSubMenu && (
          <div className="menu-container-admin">
            <img src={"https://i.imgur.com/AB2qbqm.png"} alt="" />
            <div className="main_Menu">
              <ul>
                <div className="scroll_bar">
                  <div className="single_Menu">
                    <NavLink to="/" activeclassname="active">
                      <h1>
                        <div className="icon-menu">
                         
                        </div>
                        Trang chủ
                      </h1>
                    </NavLink>
                  </div>
                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleKhaoHocSubMenu}>
                      <div className="icon-menu">
                       
                      </div>
                      Khóa học
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isKhaoHocSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isKhaoHocSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/list-course" activeclassname="active">
                          <h2>Danh sách khóa học</h2>
                        </NavLink>
                        <NavLink to="/cate-course" activeclassname="active">
                          <h2>Danh mục</h2>
                        </NavLink>
                        <NavLink to="/list-quiz" activeclassname="active">
                          <h2>Danh sách quiz</h2>
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleBaiVietSubMenu}>
                      <div className="icon-menu">
                       
                      </div>
                      Bài viết
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isBaiVietSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isBaiVietSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/list-blog" activeclassname="active">
                          <h2>Danh sách bài viết</h2>
                        </NavLink>
                        <NavLink to="/cate-blog" activeclassname="active">
                          <h2>Danh mục bài viết</h2>
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="single_Menu">
                    <NavLink to="/order" activeclassname="active">
                      <h1>
                        <div className="icon-menu">
                         
                        </div>
                        Danh sách mua
                        <div className="number_SideBar">
                          <span>1</span>
                        </div>
                      </h1>
                    </NavLink>
                  </div>

                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleThanhVienSubMenu}>
                      <div className="icon-menu">
                       
                      </div>
                      Thành viên
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isThanhVienSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isThanhVienSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/member-user" activeclassname="active">
                          <h2>Danh sách người dùng</h2>
                        </NavLink>
                        <NavLink to="/member-admin" activeclassname="active">
                          <h2>Danh sách admin</h2>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bottom_siderbar_admin">
                  <div className="dangXuat_Admin">
                   
                  </div>
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SideBar;
