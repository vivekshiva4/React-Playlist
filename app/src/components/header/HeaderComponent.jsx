import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../../css/defaults.css"

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="container-flex ptb-30 plb-20">
                    <div className=" toplist">
                        <ul className="list-inline">
                            <li>
                                <a className="btn btn-dark "># Music App</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}

export default hot(module)(HeaderComponent)
