import { Fragment, useRef, useState } from 'react';
import logo from '../../assets/images/logo-white.svg';
import { Button } from '../button';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import { ButtonSearch } from '../button/index';
import { ButtonAvatar } from '../button/buttonAvatar';
import { connect } from 'react-redux';
import { signOut } from '../../Auth/actions/auth.actions';
import { Link } from 'react-router-dom';
import { ItemsSubMenuHeader } from '../../util/itemsNavHeader';
import { useEventListner } from '../../hooks/useAddEventListener';
import { useHistory } from 'react-router-dom';

const Header = ({ userInfo, signOut, onClick }) => {
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const ref = useRef();
  const subMenuRef = useRef();

  const handleActive = (e) => {
    if (!ref.current.contains(e.target)) {
      setActive(false);
    }
  };

  const handleShowSubMenu = (e) => {
    if (!subMenuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };
  useEventListner(handleShowSubMenu);
  useEventListner(handleActive);

  return (
    <Fragment>
      <div className="header">
        <div className="nav-left">
          <div className="logo">
            <div className="logo-container">
              <img
                src={logo}
                alt="logo"
                className="logo-img"
                onClick={() => history.push('/')}
              />
            </div>
          </div>
          <div className="submenu-modal" ref={subMenuRef}>
            <Button
              type="menu"
              text="Menu"
              icon={<MenuIcon />}
              size="small"
              active={showMenu}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
            {showMenu && (
              <Card>
                <div className="submenu-container">
                  <ul>
                    {ItemsSubMenuHeader &&
                      ItemsSubMenuHeader.map((item, key) => (
                        <li key={key} onClick={() => setShowMenu(false)}>
                          <Link to={`${item.path}`}>
                            {item.icon}
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-right-search">
            <ButtonSearch size="small" label="Buscar repositorios" />
          </div>
          <div className="submenu-modal" ref={ref}>
            <ButtonAvatar active={active} onClick={() => setActive(!active)} />
            {active && (
              <Card style={{ transform: 'translate(-80px)' }}>
                <div className="nav-right-modal">
                  <Link
                    to={`/${userInfo.username}/profile`}
                    onClick={() => setActive(false)}
                  >
                    <div className="settings-header">
                      <strong>{userInfo.name}</strong>
                      <span>@{userInfo.username}</span>
                    </div>
                  </Link>
                  <div className="settings-body">
                    <span onClick={() => setActive(false)}>Editar perfile</span>
                    <span onClick={() => setActive(false)}>
                      Establecer estado
                    </span>
                    <span onClick={() => setActive(false)}>Preferencias</span>
                  </div>
                  <div className="settings-footer" onClick={signOut}>
                    <span>Cerrar sesión</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.AuthReducer.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
