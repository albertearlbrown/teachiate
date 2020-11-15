import React, {useState} from 'react'
import { Auth } from 'aws-amplify'
import { Redirect } from "react-router-dom";

function PasswordForgot() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false)
  const onRequestResetPassword = e => {
    e.preventDefault()
    setEmail(email)
    Auth.forgotPassword(email)
          .then(user => {
            setStep(1)
          })
          .catch(err => {
            console.log(err);
          });
  };

  const onResetPassword = e=>{
    e.preventDefault()
    Auth.forgotPasswordSubmit(email, code, password)
      .then(() => {
        Auth.signIn(email, password).then(()=>{
          setRedirect(true)
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
    return (
        <>
        {redirect && <Redirect to="/" />}
            <section class="teachiate_create_forum_post forgot_password">
                <div class="container">
                  {step === 0 &&
                    <div class="teachiate_create_forum_post_area main_register">
                        <h2><span class="back_to_btn"><a href="#"></a></span>Forgot your Password?</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Email</p>
                                        <input onChange={e=>setEmail(e.target.value)} type="email" class="register_input" name="" placeholder="Enter your Email id"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                <input onClick={e=>onRequestResetPassword(e)} type="submit" class="register_submit" value="Send" name=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                  }
                  { step === 1 &&
                    <div class="teachiate_create_forum_post_area main_register">
                        <h2><span class="back_to_btn"><a href="#"></a></span>Enter your confirmation code!</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Code</p>
                                        <input onChange={e=>setCode(e.target.value)} type="text" class="register_input" name="" placeholder="Enter your code"/>
                                    </div>
                                    <div className="register_field_col">
                                        <p>Create Password</p>
                                        <input type="password" className="register_input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="register_field_col">
                                        <p>Confirm Password</p>
                                        <input type="password" className="register_input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                <input onClick={e=>onResetPassword(e)} type="submit" class="register_submit" value="Send" name=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                  }
                </div>
            </section>
        </>
    );
}

export default PasswordForgot;
