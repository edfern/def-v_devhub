import { Collapse, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

export const AlertSuccessDelete = ({ nameItem, open, setOpen }) => {
  return (
    <Collapse in={open}>
      <Alert
        variant="outlined"
        severity="success"
        color="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={setOpen}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Successfully removed</AlertTitle>
        Se ha eliminado correctamente el repositorio{' '}
        <strong>
          <b>
            <i>{nameItem}</i>
          </b>
        </strong>
      </Alert>
    </Collapse>
  );
};
