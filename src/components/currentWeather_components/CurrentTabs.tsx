import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DailyForecastTab from "../tabs_components/DailyForecastTab";
import HourlyForecastTab from "../tabs_components/HourlyForecastTab";
import WeeklyForecastTab from "../tabs_components/WeeklyForecastTab";
import MoreForecastTab from "../tabs_components/MoreForecastTab";


const CurrentTabs = (data: any) => {
  const [tabValue, setTabValue] = React.useState("daily");
  const [openDialog, setOpenDialog] = React.useState(false);

  const sxStyle = {
    box: { width: '100%', typography: 'body1', color: 'white' },
    contentBox: { borderBottom: 1, borderColor: 'divider' },
    tab: { color: '#a076b4', fontFamily: 'Baloo !important', fontSize: '16px !important' },
    tabIndicator: { style: { backgroundColor: "rgb(156, 39, 176)" } },
    tabList: { '&.css-heg063-MuiTabs-flexContainer': { justifyContent: 'center' } }
  }


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };


  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTabValue("daily");
  };
  

  return (
    <Box sx={sxStyle.box}>
      <TabContext value={tabValue}>
        <Box sx={sxStyle.contentBox}>
          <TabList onChange={handleTabChange} sx={sxStyle.tabList} textColor="secondary" indicatorColor="secondary">
            <Tab sx={sxStyle.tab} label="Hourly Forecast" value="hourly" />
            <Tab sx={sxStyle.tab} label="Daily Forecast" value="daily" />
            <Tab sx={sxStyle.tab} label="Weekly Forecast" value="weekly" />
            <Tab sx={sxStyle.tab} label="10 days..." value="more" onClick={handleClickOpenDialog} title="Forecast for 10 days"/>
          </TabList>
        </Box>
        <TabPanel value="hourly">
            <HourlyForecastTab quarterData={data.sharedData.minutely_15} />
        </TabPanel>

        <TabPanel value="daily">
          <DailyForecastTab />
        </TabPanel>

        <TabPanel value="weekly">
          <WeeklyForecastTab />
        </TabPanel>

        <TabPanel value="more">
          <MoreForecastTab openDialog={openDialog} onCloseDialog={handleCloseDialog}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CurrentTabs;
