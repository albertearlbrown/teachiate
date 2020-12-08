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
  about: Yup.string()
    .min(2, 'Too short')
    .max(500, 'Too Long')
})

const AboutInfo = ({currentUser, dispatch, setLoading, loading, setOpenNotification, openNotification}) => {
  const classes = useStyles();
  const initialValues ={
    about: currentUser?.about || '',
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
                  <p>Get to know me...</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.about}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.about ? true : false}
                      className="profile_edit_input"
                      name='about'
                      multiline
                      rows={4}
                      onChange={handleChange}
                      value={values.about}
                      helperText={errors.about}
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
export default connect(mapStateToProps)(AboutInfo);
