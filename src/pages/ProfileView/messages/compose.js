import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import profilActions from '../../../redux/profil/actions'

import * as Yup from 'yup';


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
  receiver: Yup.string().required('Required field')
    .min(2, 'Too short')
    .max(50, 'Too Long'),
  subject: Yup.string().required('Required field')
    .min(2, 'Too short')
    .max(250, 'Too Long'),
  body: Yup.string()
  .required('Required field')
    .min(2, 'Too short')
    .max(1000, 'Too Long'),
})

const ComposeMessage = ({profil, currentUser, dispatch}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const initialValues ={
    receiver: null,
    subject: '',
    body: ''
  }
  const onSubmit = values => {
    dispatch({
      type: profilActions.SEND_MESSAGE,
      payload: {
        ...values, receiver: value._id
      }
    })
  }

  useEffect(()=>{
    dispatch({
      type: profilActions.LOAD_ALL_USERS,
    })
  },[])

  const options = profil.sendToList.map((option) => {
    return {
      isFriend: !!currentUser.friends.find(a=> option._id === a),
      ...option,
    };
  });

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
           setFieldValue
           /* and other goodies */
         }) => (
          <form onSubmit={handleSubmit}>
            <div className="profile_edit_area">
              <div className="profile_edit_col">
                <div className="profile_edit_field only_name">
                  <p>Send To (username or friend's name)</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.receiver}
                    >
                    <Autocomplete
                      id="grouped-demo"
                      options={options.sort((a, b) => a.isFriend > b.isFriend)}
                      groupBy={(option) => option.isFriend}
                      getOptionLabel={(option) => {
                        return `${option.fullName} (${option.email})`;
                      }}
                      blurOnSelect
                      onChange={(event, newValue) => {
                        setValue(newValue);
                        setFieldValue('receiver', newValue?.fullName)
                      }}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          className="profile_edit_input"
                          id="outlined-basic"
                          variant="outlined"
                          name='receiver'
                          onChange={handleChange}
                          value={values.receiver}
                          helperText={errors.receiver}
                          error={errors.receiver ? true : false}
                        />
                      }
                    />
                  </FormControl>
                </div>
              </div>
              <div className="profile_edit_col">
                <div className="profile_edit_field">
                  <p>Subject</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.subject}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.subject ? true : false}
                      className="profile_edit_input"
                      name='subject'
                      onChange={handleChange}
                      value={values.subject}
                      helperText={errors.subject}
                      />
                  </FormControl>
                </div>
              </div>
              <div className="profile_edit_col">
                <div className="profile_edit_field only_name">
                  <p>Message</p>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl+" only_field"}
                    error={errors.body}
                    >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      error={errors.body ? true : false}
                      className="profile_edit_input"
                      name='body'
                      multiline
                      rows={4}
                      onChange={handleChange}
                      value={values.body}
                      helperText={errors.body}
                      />
                  </FormControl>
                </div>
              </div>
              <div className="profile_edit_col settings_form_col">
                <input
                  type="submit"
                  value="Send"
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


export default ComposeMessage;
