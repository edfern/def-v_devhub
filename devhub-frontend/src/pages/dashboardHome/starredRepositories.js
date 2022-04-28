import { Fragment } from 'react';
import IconDefault from '../../assets/images/destacados-default.gif';

const StarredRepositories = () => {
  return (
    <Fragment>
      <div className="grid-body empty">
        <div className="grid-empty">
          <img src={IconDefault} alt="public-empty" width={100} height={100} />
          <span>Aun no tienes repositorios destacados.</span>
        </div>
      </div>
    </Fragment>
  );
};

export default StarredRepositories;
