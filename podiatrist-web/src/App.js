import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";

export default class App extends React.Component {
    handleDrawerOpen;
    menuButton;
  render() {
    return (
        <div>
            <Drawer variant="permanent">
                <List>
                    <ListSubheader><Typography variant="title">Podiatrist App</Typography></ListSubheader>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Patients</MenuItem>
                </List>
            </Drawer>
        </div>
    );
  }
}
