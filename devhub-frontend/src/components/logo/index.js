import { Fragment } from 'react';
import logo from '../../assets/images/logo.png';

export const Logo = () => {
  return (
    <Fragment>
      <div className="logo">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
      </div>
    </Fragment>
  );
};
