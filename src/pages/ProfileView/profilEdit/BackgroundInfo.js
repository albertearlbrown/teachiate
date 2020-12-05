import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
  formControl: {
    background: 'white',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const BackgroundInfo = ({curretUser}) => {
  const classes = useStyles();
  return (
    <div
      id="background_info"
      className="item2 active"
      data-title="Background Info"
    >
      <div className="item-content2">
      <Formik
         initialValues={{ jobTitle: '', organization: '', website: '' }}
         validate={values => {
           const errors = {};
           if (!values.email) {
             errors.email = 'Required';
           } else if (
             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           ) {
             errors.email = 'Invalid email address';
           }
           return errors;
         }}
         onSubmit={values=>console.log(values)}
       >
         {({
           values,
           errors,
           touched,
           handleChange,
           handleBlur,
           handleSubmit,
           isSubmitting,
           /* and other goodies */
         }) => (
          <form onSubmit={(e)=>{
            e.preventDefault()
            console.log(values)
          }}>
            <div className="profile_edit_area">
              <div className="profile_edit_col">
                <div className="profile_edit_field only_name">
                  <p>Job Title</p>
                  <div className="only_field">
                    <input
                      type="text"
                      className="profile_edit_input"
                      placeholder
                      name='jobTitle'
                      onChange={handleChange}
                      value={values.jobTitle}
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
                      name='organization'
                      onChange={handleChange}
                      value={values.organization}
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
                      name='website'
                      onChange={handleChange}
                      value={values.webSite}
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
          </form>
        )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {curretUser: state.users.currentUser}
}
export default connect(mapStateToProps)(BackgroundInfo);
