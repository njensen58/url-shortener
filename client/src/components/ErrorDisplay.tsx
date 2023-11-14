import React from "react";

interface IProps {
    error: string;
}

const ErrorDisplay = ({ error }: IProps) => {
    return (
        <div className="bg-slate-700 mt-2 rounded">
            {error && (
                <p className="text-white text-s p-2 text-center">{error}</p>
            )}
        </div>
    )
}

export default ErrorDisplay;