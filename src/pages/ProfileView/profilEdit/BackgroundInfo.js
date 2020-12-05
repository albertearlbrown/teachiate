import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    background: 'white',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const BackgroundInfo = (props) => {
  const classes = useStyles();
  return (
    <div
      id="background_info"
      className="item2 active"
      data-title="Background Info"
    >
      <div className="item-content2">
        <div className="profile_edit_area">
          <div className="profile_edit_col">
            <div className="profile_edit_field only_name">
              <p>Job Title</p>
              <div className="only_field">
                <input
                  type="text"
                  className="profile_edit_input"
                  placeholder
                  name
                />
              </div>
            </div>
          </div>
          <div className="profile_edit_col">
            <div className="profile_edit_field">
              <p>Organization/School</p>
              <FormControl variant="outlined" className={classes.formControl+" only_field"}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Parent'}>Parent</MenuItem>
                  <MenuItem value={'Teacher'}>Teacher</MenuItem>
                  <MenuItem value={'Student'}>Student</MenuItem>
                  <MenuItem value={'General Educator'}>General Educator</MenuItem>
                </Select>
              </FormControl>
              <div className="only_field">
                <div className="custom-select">
                  <select style={{ display: "none" }}>
                    <option value={1}>Parent</option>
                    <option value={2}>Teacher</option>
                    <option value={3}>Student</option>
                    <option value={3}>General Educator</option>
                  </select>
                  <div
                    className="custom-select-active"
                    data-select-index="custom-select13"
                  >
                    Parent
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="profile_edit_col">
            <div className="profile_edit_field only_name">
              <p>Website</p>
              <div className="only_field">
                <input
                  type="text"
                  className="profile_edit_input"
                  placeholder
                  name
                />
              </div>
            </div>
          </div>
          <div className="profile_edit_col settings_form_col">
            <input
              type="submit"
              defaultValue="Save Changes"
              className="btn btn-primary"
            />
          </div>
        </div>
      </div>
      <div className="custom-select-options is-active" data-select-head="custom-select13" >
        <ul>
          <li data-value={1} className="is-highlighted">Parent</li>
          <li data-value={2}>Teacher</li>
          <li data-value={3}>Student</li>
          <li data-value={3}>General Educator</li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps)(BackgroundInfo);
