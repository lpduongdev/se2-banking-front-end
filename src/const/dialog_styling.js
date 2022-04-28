import AnimatedPage from "../utils/AnimatedPage";
import React from "react";
import "./dialog_styling.css"

export const OK_CANCEL = {
    render: (message, onConfirm, onCancel) => {
        return (
            <AnimatedPage>
                <div className="dialog-container">
                    <h1> Alert </h1>
                    <h3> {message} </h3>
                    <div className="btn-container">
                        <button className="btnOk" onClick={onConfirm}>Yes</button>
                        <button className="btnCancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </AnimatedPage>
        );
    }
};

export const OK_ONLY = {
    render: (message, onConfirm, onCancel) => {
        return (
            <AnimatedPage>
                <div className="dialog-container">
                    <h1> Notification </h1>
                    <h3> {message} </h3>
                    <div className="btn-container">
                        <button className="btnOk" onClick={onConfirm}>Okay</button>
                    </div>
                </div>
            </AnimatedPage>
        );
    }
};

export const AUTO_CLOSE_DIALOG = {
    render: (message, onConfirm, onCancel) => {

        return (
            <AnimatedPage>
                {setTimeout(onConfirm, 3000) &&
                <div className="dialog-container">
                    <h1> Notification </h1>
                    <h3 style={{paddingBottom: "60px"}}> {message} </h3>
                </div>
                }
            </AnimatedPage>
        );
    }
};