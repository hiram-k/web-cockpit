import * as React from "react"
import * as ReactDOM from "react-dom"
import {RootComponent} from "./view/root"

// application entry point
const rootDOM = document.getElementById('root-wrapper');
ReactDOM.render(<RootComponent />, rootDOM);
