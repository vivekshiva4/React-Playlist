import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../../css/defaults.css"
import {Link } from "react-router";

class SideMenuComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <aside className="sidenav">
                    <div className="logo">
                        <a href="#"><img className="pb-50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUhtc9M6F7a_Y5jeWbQxH9RTw-nBpkfHjkIWgNM7LCIxXFkNEF&usqp=CAU" alt=""/></a>
                    </div>

                    <div className="menulink">
                        <span><Link to='/'><i className="fas fa-music"></i>Songs</Link></span>
                        <span><Link to="/searchSongs"><i className="fas fa-search"></i>Search Songs</Link></span>
                        <span><Link to="/playlists"><i className="fas fa-list"></i>Playlists</Link></span>
                    </div>
                    <br/>
                    <div className="buttons">
                        <Link to="/createPlaylist">
                            <button type="button" className="btn btn-dark "><i className="fas fa-plus"></i>New Playlist</button>
                        </Link>
                    </div>
                </aside>
            </div>
        )
    };
}

export default hot(module)(SideMenuComponent)
