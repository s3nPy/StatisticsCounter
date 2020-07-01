import React from 'react';


export const AboutPage = () => {
    return (
        <div>
            <h3>About</h3>
            <div className="divider"></div>
            <h5>Project</h5>
            <p>This project allows you to create your own counters with beautiful graph</p>
            <h5>Technologies</h5>
            <p>Project completed using the MERN <i>(MongoDB, ExpressJS, ReactJS, NodeJS)</i> stack</p>
            <p>Materializecss is used as a css library</p>

            <div className="divider"></div>
            <p>This project is for educational purposes only</p>
            <p>
                <a href="https://github.com/s3nPy/StatisticsCounter">
                    <i className="fa fa-github" style={{fontSize: '2rem'}}>&nbsp;StatisticsCounter</i>
                </a>
            </p>
        </div>
    )
};