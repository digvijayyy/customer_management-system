import React from "react";

// Simple Loading component renders while data is being fetched
function Loading(props) {
    return (
        <div className="loading d-flex justify-content-center">
            <div
                className="spinner-border"
                style={{ width: "5rem", height: "5rem" }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
