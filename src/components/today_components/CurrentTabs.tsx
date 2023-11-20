import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DailyForecastTab from "./DailyForecastTab";
import HourlyForecastTab from "./HourlyForecastTab";

const CurrentTabs = (data: any) => {
  const [value, setValue] = React.useState("daily");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", color: "white" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Daily Forecast" value="daily" />
            <Tab label="Hourly Forecast" value="hourly" />
            <Tab label="Weekly Forecast" value="weekly" />
          </TabList>
        </Box>
        <TabPanel value="daily">
          <DailyForecastTab
            time={data.sharedData.hourly.time}
            code={data.sharedData.hourly.weather_code}
            temp={data.sharedData.hourly.temperature_2m}
          />
        </TabPanel>
        <TabPanel value="hourly">
            <HourlyForecastTab
                quarterData={data.sharedData.minutely_15}
            />
          </TabPanel>
        <TabPanel value="weekly">Weekly Forecast</TabPanel>
      </TabContext>
    </Box>
  );
};

export default CurrentTabs;
