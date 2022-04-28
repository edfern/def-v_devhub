import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AvatarUser } from '../avatar/index';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouteMatch } from 'react-router-dom';
import { Button } from '../button';

const CardInfoUser = ({ userInfo }) => {
  const { url } = useRouteMatch();
  return (
    <Fragment>
      <div className="jumbotron">
        <div className="info-user">
          <div className="info-header">
            <AvatarUser type="body-profile" />
            <span className="info-name">{userInfo.name}</span>
          </div>
          <div className="info-body">
            <span className="info-body-date">
              @{userInfo.username} - Miembro desde {userInfo.registrationDate}
            </span>
            <span className="info-body-location">
              <LocationOnIcon /> GTM
            </span>
          </div>
          <div className="info-footer">
            <div className="info-nav">
              <nav>
                <ul>
                  <li>
                    <Button
                      type="nav-home"
                      to={url}
                      text="Overview"
                      activeClass="active-link"
                    />
                  </li>
                  <li>
                    <Button
                      type="nav-home"
                      to={`${url}/repositories`}
                      text="Repositorios"
                      activeClass="active-link"
                    />
                  </li>
                  <li>
                    <Button
                      type="nav-home"
                      to={`${url}/projects`}
                      text="Proyectos"
                    />
                  </li>
                  <li>
                    <Button
                      type="nav-home"
                      to={`${url}/packages`}
                      text="Packages"
                    />
                  </li>
                  <li>
                    <Button
                      type="nav-home"
                      to={`${url}/activity`}
                      text="Actividad"
                    />
                  </li>
                </ul>
              </nav>
            </div>
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
  ...dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(CardInfoUser);
