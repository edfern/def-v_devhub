import { Tooltip } from '@mui/material';

export const TooltipIcon = ({ children, text }) => (
  <Tooltip
    disableFocusListener
    disableTouchListener
    title={text}
    arrow
    placement="top-start"
  >
    <i>{children}</i>
  </Tooltip>
);
