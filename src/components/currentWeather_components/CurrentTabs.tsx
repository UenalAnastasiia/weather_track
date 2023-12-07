import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DailyForecastTab from "../tabs_components/DailyForecastTab";
import HourlyForecastTab from "../tabs_components/HourlyForecastTab";
import WeeklyForecastTab from "../tabs_components/WeeklyForecastTab";
import MoreForecastTab from "../tabs_components/MoreForecastTab";


const CurrentTabs = (data: any) => {
  const [tabValue, setTabValue] = React.useState("daily");
  const [openDialog, setOpenDialog] = React.useState(false);


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
    <Box sx={{ width: "100%", typography: "body1", color: "white" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange}>
            <Tab label="Hourly Forecast" value="hourly" />
            <Tab label="Daily Forecast" value="daily" />
            <Tab label="Weekly Forecast" value="weekly" />
            <Tab label="..." value="more_forecast" onClick={handleClickOpenDialog} />
          </TabList>
        </Box>
        <TabPanel value="hourly">
            <HourlyForecastTab
                quarterData={data.sharedData.minutely_15}
            />
        </TabPanel>

        <TabPanel value="daily">
          <DailyForecastTab />
        </TabPanel>

        <TabPanel value="weekly">
          <WeeklyForecastTab />
        </TabPanel>

        <TabPanel value="more_forecast">
          <MoreForecastTab openDialog={openDialog}
            onCloseDialog={handleCloseDialog}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CurrentTabs;
