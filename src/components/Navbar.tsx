import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";


export default function Navbar() {
  const styles = {
    box: {
      flexGrow: 1,
    },
    appBar: {
      background: "#0b96aa",
    },
    iconBtn: {
      mr: 2,
    },
    typography: {
      flexGrow: 1,
    },
  };

  const [currentDate, setCurrentDate] = useState(getDate());


  function getDate(): string | number {
    const today = new Date();
    const currDate = today.toLocaleDateString('en-us', { weekday: 'long', month: 'short', day: 'numeric' });    
    return `${currDate}`;
  }


  return (
    <Box sx={ styles.box }>
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
            { currentDate }
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
