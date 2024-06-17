import './styles.css';

import { BiAddToQueue } from 'react-icons/bi';
import { FcList } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-container">
        <nav>
          <h1 className="sidebar-title">Menus</h1>
          <ul>
            <NavLink to="/admin/insert">
              <li>
                Inserir <BiAddToQueue />{" "}
              </li>
            </NavLink>
            <NavLink to="/admin/list">
              <li>
                Listagem <FcList />
              </li>
            </NavLink>
          </ul>
        </nav>
        
      </div>
    </>
  );
}
