import { Fragment, useState } from 'react';
import { Button } from '../button';
import { Dropzone } from '../dropzone';

export const FormFiles = ({ onChange, onSubmit, loading }) => {
  const [files, setFiles] = useState([]);
  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e, files)}>
        <Dropzone onFiles={setFiles}>
          <Button
            type="submit-form"
            text="Subir archivos"
            variant="contained"
            color="primary"
            action="submit"
            size="small"
            onSubmit={(e) => onSubmit(e, files)}
            loading={loading}
          />
        </Dropzone>
      </form>
    </Fragment>
  );
};
