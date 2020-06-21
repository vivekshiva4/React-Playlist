import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/defaults.css"
const axios = require('axios');
import SideMenu  from './side-menu/SideMenuComponent'
import Header from './header/HeaderComponent'
import config from '../../config'

class HomeComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            songsArray:[],
            visible: 50
        }
        this._getSongsFromLibrary = this._getSongsFromLibrary.bind(this)
        this._loadMore = this._loadMore.bind(this);
    }

    componentDidMount() {
        this._getSongsFromLibrary()
    }

    _loadMore() {
        this.setState((prev) => {
            return {visible: prev.visible + 50};
        });
    }

    _getSongsFromLibrary(){
        axios.get(config.SERVER_IP_ADDR+'/library/')
            .then((response) => {
                // handle success
                if(response.status === 200){
                    let result = response.data
                    if(result.length > 0){
                        this.setState({
                            songsArray : result
                        })
                        localStorage.setItem('songs', JSON.stringify(result))
                    }
                }
            }).catch((error) =>{
            // handle error
            console.log(error)
        })
    }

    render(){
        let _this = this.state
        let _thisInstance = this
        return(
            <div>
                <SideMenu/>
                <main>
                    <Header/>
                    <div className="title plb-20">
                        <h1><strong><i className="fas fa-music"></i> Music Library...</strong></h1>
                    </div>
                    <div className="gallery">
                        {function () {
                            if (_this.songsArray.length > 0 ) {
                                let count = 0
                                return (
                                    _this.songsArray.slice(0, _this.visible).map(event => {
                                        count = count + 1
                                        const uid = "row_" + count
                                            return (
                                                <div key={uid}>
                                                        <img src="https://cdn2.vectorstock.com/i/1000x1000/91/56/music-note-icon-on-black-background-black-flat-vector-26849156.jpg" alt=""/>
                                                    <b>Song:</b><i> {event.title}</i><br/>
                                                    <b>Album: </b><i>{event.album}</i>
                                                </div>
                                            )
                                    })
                                )
                            }else{
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
                    <br/><br/><br/>
                    {this.state.visible < _this.songsArray.length &&
                    <div className="container-flex ptb-30 plb-20">
                        <div className=" toplist">
                            <ul className="list-inline">
                                <li>
                                    <button onClick={this._loadMore} type="button" className="btn btn-dark">Load more</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    }
                </main>

            </div>
        )
    }
}

export default hot(module)(HomeComponent)
