import React from 'react'
import Logo from '../FtrLogo';
import FooterDesc from '../FtrDesc';
import FtrQuickLinks from '../FtrQuickLinks';
import FtrLanguageLinks from '../FtrLanguageLinks';
import FtrMyAccountLinks from '../FtrMyAccountLinks';
import FtrCopyrightText from '../FtrCopyrightText';

const Footer = () => {
    return (
        <>
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <Logo/>
                            <FooterDesc/>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <FtrQuickLinks/>
                        </div>                 
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <FtrMyAccountLinks/>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <FtrCopyrightText/>
                </div>
            </footer>
        </>
    )
}

export default Footer;