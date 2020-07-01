import React from 'react';

const loaders = {
    'progress': ( 
        <div className="progress deep-purple lighten-4">
            <div className="indeterminate deep-purple lighten-2"></div>
        </div>
    ),

    'circle': (
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
        </div>
    ),

    'default': (
        <div>
            <p>No such loader check <strong>types</strong></p>
        </div>
    )
};

export const Loader = ({type}) => {
    const loader = loaders[type] || loaders['default'];
    return (
        <div className="center">
            {loader}
        </div>
    );
};