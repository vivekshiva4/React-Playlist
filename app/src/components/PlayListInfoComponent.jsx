import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/defaults.css"
const axios = require('axios');
import SideMenu  from './side-menu/SideMenuComponent'
import Header from './header/HeaderComponent'
import {browserHistory, Link} from 'react-router';
import config from '../../config'

class PlayListInfoComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playListInfoData:{},
            songsObj:[],
            songsArray:[],
            visible: 5,
            successMessage:null
        }
        this._getPlaylistById = this._getPlaylistById.bind(this)
        this._saveSongtoPlaylist = this._saveSongtoPlaylist.bind(this)
        this._loadMore = this._loadMore.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        this._getPlaylistById();
        let songs = JSON.parse(localStorage.getItem('songs'))
        this.setState({
            songsObj:songs
        })
    }


    _loadMore() {
        this.setState((prev) => {
            return {visible: prev.visible + 5};
        });
    }

    _getPlaylistById(){
        axios.get(config.SERVER_IP_ADDR+'/playlist/'+this.props.params.pId)
            .then((response) => {
                // handle success
                if(response.status === 200){
                    let result = response.data
                        this.setState({
                            playListInfoData : result,
                            songsArray:result.songs.length
                        })
                }
            }).catch((error) =>{
            // handle error
            console.log(error)
        })
    }

    _saveSongtoPlaylist(id){
        let songsArray = this.state.playListInfoData.songs
            if(!songsArray.includes(id)){
                songsArray.push(id)
                let dataToPost = {
                    name: this.state.playListInfoData.name,
                    songs: songsArray
                }
                axios.post(config.SERVER_IP_ADDR+'/playlist/'+this.state.playListInfoData.id, dataToPost,{
                    headers: {
                        'Content-Type': 'application/json',
                    }})
                    .then((response) => {
                        if(response.status === 200){
                            this._getPlaylistById();
                            alert("Added to Playlist")
                        }
                    }, (error) => {
                        console.log(error)
                    });
            }else{
                alert("Already in Playlist")
            }

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
                        <h1><strong><i className="fas fa-play"></i> {_this.playListInfoData.name }.</strong></h1>
                        <br/>
                        <h3><Link to="/playlists"><i className="fas fa-arrow-left">Playlists</i></Link></h3>
                    </div>

                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Song Name</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Album</th>
                            <th scope="col">Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {function () {
                            if (_this.songsArray > 0   ) {
                                let count = 0
                                if(_this.playListInfoData.songs !== "[]"){
                                    return (
                                        _this.playListInfoData.songs.map(event => {
                                            let song = _this.songsObj[event]
                                            count = count + 1
                                            const unid = "row_" + count
                                            return (<tr key={unid}>
                                                <th scope="row">{count}</th>
                                                <td>{song.title}</td>
                                                <td>{song.artist}</td>
                                                <td>{song.album}</td>
                                                <td>{song.duration} sec</td>
                                            </tr>)
                                        })
                                    )
                                }else {
                                    return (
                                        <tr> No Songs found! </tr>
                                    )
                                }
                            }else {
                                return (
                                    <tr> No Songs found! </tr>
                                )
                            }
                        }()}
                        </tbody>
                    </table>

                    <div className="title plb-20">
                        <h1><strong>Add Songs to Playlist.</strong></h1>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Song Name</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Album</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Add to playlist</th>
                        </tr>
                        </thead>
                        <tbody>
                        {function () {
                            if (_this.songsObj) {
                                let count = 0
                                return (
                                    _this.songsObj.slice(0, _this.visible).map(event => {

                                        let song = event
                                        count = count + 1
                                        const unid = "row_" + count
                                        return (<tr key={unid}>
                                            <th scope="row">{count}</th>
                                            <td>{song.title}</td>
                                            <td>{song.artist}</td>
                                            <td>{song.album}</td>
                                            <td>{song.duration} sec</td>
                                            <td>
                                                <button type="button" className="btn btn-primary" onClick={() => thisInstance._saveSongtoPlaylist(song.id)}>
                                                    <i className="fas fa-plus"></i></button>
                                            </td>
                                        </tr>)
                                    })
                                )
                            }else {
                                return (
                                    <tr> No Songs found! </tr>
                                )
                            }
                        }()}
                        </tbody>
                    </table>
                    <div className="container-flex ptb-30 plb-20">
                        <div className=" toplist">
                            <button onClick={this._loadMore} type="button" className="btn btn-primary">Load more</button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default hot(module)(PlayListInfoComponent)
