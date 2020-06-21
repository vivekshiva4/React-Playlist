import React, { Component} from "react"
import {hot} from "react-hot-loader"
import "../css/defaults.css"
const axios = require('axios');
import SideMenu  from './side-menu/SideMenuComponent'
import Header from './header/HeaderComponent'
import {Link } from "react-router";

class SearchSongsComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            songsObj: [],
            searchInput: null
        }
        this._onChange = this._onChange.bind(this)
        // this._sortBy = this._sortBy.bind(this)
    }

    componentDidMount() {
        let songs = JSON.parse(localStorage.getItem('songs'))
        this.setState({
            songsObj:songs
        })
    }


    _onChange(event) {
        this.setState({searchInput: event.target.value})
    }


    // _sortBy(e){
    //     console.log(e.target.value)
    // }



    render(){
        let _this = this.state
        let _thisInstance = this
        return(
            <div>
                <SideMenu/>
                <main>
                    <Header/>
                    <div className="title plb-20">
                        <h1><strong> Search Songs...</strong></h1>
                    </div>

                        <div className="row">
                        <div className="col-md-6 col-md-offset-3 text-center">
                            <div className="form-group">
                                <input className="form-control text-center" type="text" placeholder="Search for songs" name="searchInput" ref="searchInput" onChange={this._onChange}/><br/>
                                {/*<select className="btn btn-dark"  onChange={_thisInstance._sortBy}>*/}
                                {/*    <option value="" selected>Sort By</option>*/}
                                {/*    <option value="artist">Artist</option>*/}
                                {/*    <option value="album">Album</option>*/}
                                {/*    <option value="title">Title</option>*/}
                                {/*    <option value="duration">Duration</option>*/}
                                {/*</select>*/}
                            </div>


                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Song Name</th>
                                    <th scope="col">Album</th>
                                    <th scope="col">Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {function () {
                                    if (_this.searchInput   ) {
                                        let count = 0
                                            return (
                                                _this.songsObj.filter(song => song.title.toLowerCase().includes(_this.searchInput.toLowerCase())).map(event => {
                                                    let song = event
                                                    count = count + 1
                                                    const unid = "row_" + count
                                                    return (<tr key={unid}>
                                                        <th scope="row">{count}</th>
                                                        <td>{song.title}</td>
                                                        <td>{song.album}</td>
                                                        <td>{song.duration} sec</td>
                                                    </tr>)
                                                })
                                            )

                                    }else {
                                        return (
                                            <tr>  </tr>
                                        )
                                    }
                                }()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        )
    }
}

export default hot(module)(SearchSongsComponent)
