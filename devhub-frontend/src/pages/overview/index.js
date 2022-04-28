import { Grid } from '@mui/material';
import {} from '@mui/material/styles';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Main } from '../../components/main/main';

export const OverViewPage = (props) => {
  let { url } = useRouteMatch();
  return (
    <Main>
      <Grid container spacing={4} columns={16}>
        <Grid item xs={8}>
          <div className="grid-section">
            <div className="grid-section-header">
              <span className="section-title">Repositorios recientes</span>
              <Link to={`${url}/repositories`}>
                <span>Ver todos</span>
              </Link>
            </div>
          </div>
          <div className="grid-body empty">
            <div className="grid-empty">
              <video autoPlay loop={true} muted>
                <source src="https://drawer.design/wp-content/uploads/2020/10/theo-computer.mp4" />
              </video>
              <span>Aun no tienes repositorios.</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="grid-section">
            <div className="grid-section-header">
              <span className="section-title">Actividad</span>
              <Link to={`${url}/repositories`}>
                <span>Ver todos</span>
              </Link>
            </div>
          </div>
          <div className="grid-body empty">
            <div className="grid-empty">
              <video autoPlay loop={true} muted>
                <source src="https://drawer.design/wp-content/uploads/2020/10/theo-document.mp4" />
              </video>
              <span>Aun no hay alguna actividad.</span>
            </div>
          </div>
        </Grid>
      </Grid>
    </Main>
  );
};
