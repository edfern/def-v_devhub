import { Grid } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormNewRepo from '../../components/form/form-new-repositorie';
import { Main } from '../../components/main/main';

const NewRepositories = ({ match }) => {
  return (
    <Main>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="info-new-repositorie">
            <div className="info-body">
              <video autoPlay loop={true} muted>
                <source src="https://drawer.design/wp-content/uploads/2021/05/Cutie-Pack-Note.mp4" />
              </video>
              <span className="title">Crear proyecto en blanco</span>
              <p>
                Cree un proyecto en blanco para almacenar sus archivos,
                planificar su trabajo y colaborar en el código, entre otras
                cosas.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="body-new-repositorie">
            <div className="new-repositorie-header">
              <ul>
                <li>Nuevo proyecto</li>
                <span>
                  <ArrowForwardIosIcon
                    style={{
                      width: '0.75rem',
                      height: 'auto',
                      display: 'inline-flex',
                    }}
                  />
                </span>
                <li>Crear proyecto blanco</li>
              </ul>
            </div>
            <div className="new-repositories-body">
              <FormNewRepo match={match} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Main>
  );
};

export default NewRepositories;
