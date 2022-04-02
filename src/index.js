import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import 'antd/dist/antd.min.css';
import 'rc-banner-anim/assets/index.css';

ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    , document.querySelector("#root")
);
