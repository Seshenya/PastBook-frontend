import React from "react";

interface Props { }

const LoadingSpinner: React.FunctionComponent<Props> = () => {
    return (
        <div>
            <span className="spinner-grow text-primary" role="status">
            </span>
            <span className="spinner-grow text-primary" role="status">
            </span>
            <span className="spinner-grow text-primary" role="status">
            </span>
        </div>
    );
};

export default LoadingSpinner;