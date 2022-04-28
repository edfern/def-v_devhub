import { Grid } from '@mui/material';
import { AvatarRepositorie } from '../avatar';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { TooltipIcon } from '../tooltip/index';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';

const ItemRepositories = ({
  name,
  nameRepo,
  statusRepo,
  description,
  creationDate,
  key,
  to,
  invite,
  username,
  onClick,
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
    return () => setState(false);
  }, []);

  return (
    <CSSTransition in={state} timeout={200} classNames="fade" unmountOnExit>
      <div className="item-repositorie" key={key}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div className="item-info">
              <AvatarRepositorie
                text={nameRepo ? nameRepo : 'No disponible'}
                to={to ? to.toLowerCase() : '#'}
              />
              <div className="item-description">
                <Link
                  to={to ? to.toLowerCase() : '#'}
                  className="title"
                  onClick={onClick}
                >
                  {invite ? username : name} /{' '}
                  <strong>{nameRepo ? nameRepo : 'No disponible'}</strong>
                </Link>
                <TooltipIcon
                  text={
                    statusRepo
                      ? 'Público: se puede acceder al repositorio sin ninguna autenticación.'
                      : 'Privado: el acceso al repositorio debe otorgarse explícitamente a cada usuario. Si este proyecto es parte de un grupo, se otorgará acceso a los miembros del grupo.'
                  }
                >
                  {statusRepo ? <PublicIcon /> : <LockIcon />}
                </TooltipIcon>
                <div className="description">
                  {description ? description : 'No disponible'}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} style={{ position: 'relative' }}>
            <div className="item-repositorie-date">
              <span>{creationDate ? creationDate : 'No disponible'}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  name: state.AuthReducer.userInfo.name,
});

export default connect(mapStateToProps, null)(ItemRepositories);
