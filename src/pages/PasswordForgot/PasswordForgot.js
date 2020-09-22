import React from 'react'

function PasswordForgot() {
    return (
        <>
            <section class="teachiate_create_forum_post forgot_password">
                <div class="container">
                    <div class="teachiate_create_forum_post_area main_register">
                        <h2><span class="back_to_btn"><a href="#"></a></span>Forgot your Password?</h2>
                        <div class="register_field">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="register_field_col">
                                        <p>Email</p>
                                        <input type="email" class="register_input" name="" placeholder="Enter your Email id"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                <input type="submit" class="register_submit" value="Send" name=""/> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PasswordForgot;