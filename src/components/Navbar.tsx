import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    box: {
      flexGrow: 1,
    },
    appBar: {
      background: "linear-gradient(to right, #9796f0, #fbc7d4)"
    },
    iconBtn: {
      mr: 2,
    },
    typography: {
      flexGrow: 1,
    },
  };

  const getCurrentDate = (): string | number => {
    const today = new Date();
    const currDate = today.toLocaleDateString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    return `${currDate}`;
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  return (
    <Box sx={styles.box}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={styles.iconBtn}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={styles.typography}>
            {currentDate}
          </Typography>
          <Link to="/today">Today</Link>
          <Link to="/current">Current</Link>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
