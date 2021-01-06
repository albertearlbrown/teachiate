import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import profilActions from '../../../redux/profil/actions'

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
  organisation: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too Long'),
  website: Yup.string().url('url not valid'),
})

const BackgroundInfo = ({currentUser, dispatch, setLoading, loading, setOpenNotification, openNotification}) => {
  const classes = useStyles();
  const initialValues ={
    jobTitle: currentUser?.jobTitle || '',
    organisation: currentUser?.organisation || '',
    website: currentUser?.website || ''
  }
  const onSubmit = values => {
    dispatch({
      type: profilActions.UPDATE_BACKGROUND_INFO,
      payload: values
    })
  }

  useEffect(()=>{
    setLoading(true)
  },[])

  useEffect(()=>{
    if (openNotification) {
      setOpenNotification(openNotification)
      dispatch({
        type: profilActions.SET_STATE,
        payload: {openNotification: false}
      })
    }
  }, [openNotification])

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
          <form onSubmit={handleSubmit}>
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
                      error={errors.jobTitle ? true : false}
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
                    error={errors.organisation}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.organisation ? true : false}
                      className="profile_edit_input"
                      name='organisation'
                      onChange={handleChange}
                      value={values.organisation}
                      helperText={errors.organisation}
                      />
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
                      error={errors.website ? true : false}
                      name='website'
                      className="profile_edit_input"
                      onChange={handleChange}
                      helperText={errors.website}
                      value={values.website}
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
  return {
    currentUser: state.users.currentUser,
    loading: state.profil.loading,
    openNotification: state.profil.openNotification
  }
}
export default connect(mapStateToProps)(BackgroundInfo);
