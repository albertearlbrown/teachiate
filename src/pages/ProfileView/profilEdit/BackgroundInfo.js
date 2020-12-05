import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';


const urlRegExp = /(http:\/\/)|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const useStyles = makeStyles((theme) => ({
  formControl: {
    background: 'white',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const schema = Yup.object().shape({
  jobTitle: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too Long'),
  organization: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too Long'),
  website: Yup.string().matches(urlRegExp, 'url not valide')
})

const BackgroundInfo = ({curretUser}) => {
  const classes = useStyles();
  const initialValues ={
    ...curretUser
  }
  const onSubmit = values => {
    console.log(values);
  }
  return (
    <div
      id="background_info"
      className="item2 active"
      data-title="Background Info"
    >
      <div className="item-content2">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
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
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.jobTitle}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.jobTitle}
                      className="profile_edit_input"
                      name='jobTitle'
                      onChange={handleChange}
                      value={values.jobTitle}
                      helperText={errors.jobTitle}
                      />
                  </FormControl>
                </div>
              </div>
              <div className="profile_edit_col">
                <div className="profile_edit_field">
                  <p>Organization/School</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.organization}
                    >
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
                    {errors.organization && <FormHelperText>Error</FormHelperText>}
                  </FormControl>
                </div>
              </div>
              <div className="profile_edit_col">
                <div className="profile_edit_field only_name">
                  <p>Website</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.website}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.website}
                      name='website'
                      className="profile_edit_input"
                      onChange={handleChange}
                      helperText={errors.website}
                      value={values.webSite}
                      />
                  </FormControl>
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
