import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  tab: {
    textTransform: 'initial',

    fontSize: '14px',
    '&.Mui-selected': {
      color: 'black',
      lineHeight: '1.2',

      fontWeight: '600',
    },
  },
  box: {
    padding: 0,
  },
});

export const LabTabs = ({ items, content }) => {
  const [value, setValue] = React.useState('0');

  const classes = useStyle();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {items &&
              items.map((item, key) => {
                return (
                  <Tab
                    className={classes.tab}
                    key={key}
                    label={item}
                    value={key.toString()}
                  />
                );
              })}
          </TabList>
        </Box>
        {content &&
          content.map((item, key) => {
            return (
              <TabPanel
                value={key.toString()}
                key={key}
                className={classes.box}
              >
                {item}
              </TabPanel>
            );
          })}
      </TabContext>
    </Box>
  );
};
