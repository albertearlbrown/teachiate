import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Chip, Avatar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// adminComponents
import PageTitle from "../../adminComponents/PageTitle/PageTitle";
import Widget from "../../adminComponents/Widget/Widget";

import { getGroups } from '../../adminHelper/fetchData'

import useStyles from "./styles";

const options = {
  filter: true,
  filterType: "dropdown",
};

const roleColor = {
  'Admin': 'warning',
  'Teacher': 'secondary',
  'Parent': 'success',
  'Student': 'primary',
  'General Educator': 'info',
}

export default function Group() {
  const classes = useStyles();
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [perPageCount, setPerPageCount] = useState(10)
  const [groupList, setGroupList] = useState([])
  const [openLoader, setOpenLoader] = useState(false)

  const datatableColums = [
    {
      name: "GroupName",
      Label: "GroupName"
    },
    {
      name: "Location",
      Label: "Location",
    },
    {
      name: "Members",
      Label: "Members"
    },
    {
      name: "UpdateDate",
      Label: "UpdateDate"
    },
    {
      name: "Privacy",
      Label: "Privacy",
    },
    {
      name: "Action",
      options: {
        filter: false,
        sort: false,
        empty: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button color="primary" variant="contained" onClick={handleEditDialogOpen}>
              Edit
            </Button>
          );
        }
      }
    }
  ];

  const fetchGroup = async () => {
    setOpenLoader(true)
    const payload = {
      page: 1,
      name: '',
    }
    const res = await getGroups(payload)
    setGroupList(res.groups)
    setOpenLoader(false)
  }

  useEffect(() => {
    fetchGroup()
  }, [])

  const handleEditDialogOpen = () => setOpenEditDialog(true)

  const handleClose = () => setOpenEditDialog(false)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={openLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <Dialog open={openEditDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <PageTitle title="Groups" />
      <MUIDataTable
        title="You can see group list"
        data={groupList.map((group, index) => {
          return [
            group.groupName,
            group.location,
            group.members.length,
            group.updateDate,
            group.privacy
          ] 
        })}
        columns={datatableColums}
        options={options}
      />
    </div>
  );
}
