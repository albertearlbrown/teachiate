import React from 'react'

const PageTitle = (props) => {
    return (
        <>
        <section className="innder_page people">
            <div className="container">
                <div className="inner_title">
                    <h2>{props.title}</h2>
                    <img src="/assets/img/title-divaider.png" alt=""/>
                </div>
            </div>
        </section>        
        </>
    )
}

export default PageTitle;
