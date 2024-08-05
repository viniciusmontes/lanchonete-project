import './styles.css';

import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

type MenuKeys = "home" | "dashboard" | "config" | "account";

export default function SidebarBootstrap() {

  const [openMenus, setOpenMenus] = useState<Record<MenuKeys, boolean>>({
    home: false,
    dashboard: false,
    config: false,
    account: false,
  });

  function toggleMenu(menu : MenuKeys) {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  }

  return (
    <div className="flex-shrink-0 p-3 bg-white sidebar-container">
      <a
        href="/admin/home"
        className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        
        <div className="sidebar-title-container">
          <h1>Admin</h1>
        </div>
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className={`btn align-items-center rounded ${
              openMenus.home ? "collapsed" : ""
            }`}
            onClick={() => toggleMenu("home")}
            aria-expanded={openMenus.home ? true : false}
          >
            {openMenus.home ? <FaChevronDown /> : <FaChevronRight />} Menu
          </button>
          <div
            className={openMenus.home ? "collapse show" : "collapse"}
            id="home-collapse"
          >
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="/admin/products" className="link-dark rounded">
                  Produtos
                </a>
              </li>
              <li></li>
              <li>
                <a href="/admin/orders" className="link-dark rounded">
                  Pedidos
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className={`btn align-items-center rounded ${
              openMenus.dashboard ? "collapsed" : ""
            }`}
            onClick={() => toggleMenu("dashboard")}
            aria-expanded={openMenus.dashboard ? true : false}
          >
            {openMenus.dashboard ? <FaChevronDown /> : <FaChevronRight />}{" "}
            Dashboard
          </button>
          <div
            className={openMenus.dashboard ? "collapse show" : "collapse"}
            id="dashboard-collapse"
          >
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className={`btn align-items-center rounded ${
              openMenus.config ? "collapsed" : ""
            }`}
            onClick={() => toggleMenu("config")}
            aria-expanded={openMenus.config ? true : false}
          >
            {openMenus.config ? <FaChevronDown /> : <FaChevronRight />} Config
          </button>
          <div
            className={openMenus.config ? "collapse show" : "collapse"}
            id="config-collapse"
          >
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button
            className={`btn align-items-center rounded ${
              openMenus.account ? "collapsed" : ""
            }`}
            onClick={() => toggleMenu("account")}
            aria-expanded={openMenus.account ? true : false}
          >
            {openMenus.account ? <FaChevronDown /> : <FaChevronRight />} Account
          </button>
          <div
            className={openMenus.account ? "collapse show" : "collapse"}
            id="account-collapse"
          >
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  New...
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
