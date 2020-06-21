import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/defaults.css"
const axios = require('axios');
import SideMenu  from './side-menu/SideMenuComponent'
import Header from './header/HeaderComponent'
import {Link } from "react-router";
import config from '../../config'

class PlayListComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playlistArray:[]
        }
        this._getPlaylists = this._getPlaylists.bind(this)
        this._deletePlaylist = this._deletePlaylist.bind(this)
    }

    componentDidMount() {
        this._getPlaylists()
    }

    _deletePlaylist(id){
        if(confirm("Are you sure want to delete")) {
            axios.delete(config.SERVER_IP_ADDR+'/playlist/' + id)
                .then((response) => {
                    // handle success
                    if (response.status === 200) {
                        this._getPlaylists();
                    }
                }).catch((error) => {
                // handle error
                console.log(error)
            })
        }
    }

    _getPlaylists(){
        axios.get(config.SERVER_IP_ADDR+'/playlist/')
            .then((response) => {
                // handle success
                if(response.status === 200){
                    let result = response.data
                    if(result.length > 0){
                        this.setState({
                            playlistArray : result
                        })
                    }
                }
            }).catch((error) =>{
            // handle error
            console.log(error)
        })
    }

    render(){
        let _this = this.state
        let thisInstance = this
        return(
            <div>
                <SideMenu/>
                <main>
                    <Header/>
                    <div className="title plb-20">
                        <h1><strong><i className="fas fa-list"></i> Playlists...</strong></h1>
                    </div>

                    <div className=" gallery">
                        {function () {
                            if (_this.playlistArray.length > 0 ) {
                                let count = 0
                                return (
                                    _this.playlistArray.map(event => {
                                        count = count + 1
                                        const uid = "row_" + count
                                            return (
                                                <div key={uid}>
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuaPD_xhhiDt9fRlO81UXZkWyFxqMOQd75uS-9ovox_ZTmpatI&usqp=CAU" alt=""/>&nbsp;&nbsp;&nbsp;
                                                    <b><i> {event.name}</i></b>
                                                    <div className=" toplist">
                                                        <Link to={"/playlists/"+event.id}><button className="btn btn-dark "> view</button>&nbsp;&nbsp;&nbsp;</Link>
                                                        <button className="btn btn-dark " onClick={() => thisInstance._deletePlaylist(event.id)}><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </div>                                            )
                                    })
                                )
                            }else {
                                return (
                                    <div>
                                        <div className="loader">
                                            <img src="https://cdn.dribbble.com/users/3337757/screenshots/6825268/076_-loading_animated_dribbble_copy.gif" />
                                        </div>
                                    </div>
                                )
                            }
                        }()}
                    </div>

                </main>
            </div>
        )
    }
}

export default hot(module)(PlayListComponent)
