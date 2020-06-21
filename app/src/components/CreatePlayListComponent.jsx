import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/defaults.css"
const axios = require('axios');
import SideMenu  from './side-menu/SideMenuComponent'
import Header from './header/HeaderComponent'
import { browserHistory } from 'react-router';
import config from '../../config'

class CreatePlayListComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playlistInput:null
        }
        this._onChange = this._onChange.bind(this)
        this._savePlaylist = this._savePlaylist.bind(this)
    }

    componentDidMount() {
    }

    _onChange(event) {
        this.setState({playlistInput: event.target.value})
    }

    _savePlaylist(){
        let dataToPost = {
            name: this.state.playlistInput,
            songs: []
        }
        if(this.state.playlistInput) {
            axios.post(config.SERVER_IP_ADDR+'/playlist', dataToPost, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        browserHistory.push('/playlists');
                    }
                }, (error) => {
                    console.log(error)
                });
        }else {
            alert("enter playlist")
        }
    }

    render(){
        let _this = this.state
        return(
            <div>
                <SideMenu/>
                <main>
                    <Header/>
                    <div className="title plb-20">
                        <h1><strong>Create Playlist...</strong></h1>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 text-center">
                            <div className="form-group">
                                <label htmlFor="firstName">Playlist Name</label>
                                <input className="form-control text-center" type="text" placeholder="New Releases" name="playlistInput" ref="playlistInput" onChange={this._onChange} required/><br/>
                                <button type="submit" className="btn btn-primary" onClick={this._savePlaylist}>Save</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default hot(module)(CreatePlayListComponent)
