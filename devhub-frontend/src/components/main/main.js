import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './styles.css';

export const MainLogin = ({ children }) => (
  <div className="main">
    {children}
    <div className="bubble-one"></div>
    <div className="bubble-two"></div>
    <div className="bubble-three"></div>
    <div className="bubble-four"></div>
  </div>
);

export const Main = ({ children, active, limit, back }) => {
  const [state, setState] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setState(true);
    return () => setState(false);
  }, []);

  const handleChangeHistory = () => {
    history.goBack();
  };
  return (
    <CSSTransition in={state} classNames="fade" timeout={500} unmountOnExit>
      <div
        className={`main-container ${active ? '' : 'active'} position ${limit}`}
      >
        {back && (
          <Fragment>
            <div className="nav-back" onClick={handleChangeHistory}>
              <div className="icon">
                <ArrowBackIosIcon />
                <h3>Regresar</h3>
              </div>
            </div>
          </Fragment>
        )}
        {children}
      </div>
    </CSSTransition>
  );
};
