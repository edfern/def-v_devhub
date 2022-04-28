import { Collapse, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

export const AlertSuccess = ({ description, open, setOpen }) => {
  return (
    <Collapse in={open}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Success</AlertTitle>
        {description}
      </Alert>
    </Collapse>
  );
};
