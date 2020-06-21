import React from 'react'
import {
    Router,
    Route,
    IndexRoute,
} from 'react-router'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import HomeComponent  from "./components/HomeComponent.jsx"
import PlayListComponent from './components/PlayListComponent'
import CreatePlaylistComponent from './components/CreatePlayListComponent'
import PlaylistInfoComponent from './components/PlayListInfoComponent'
import SearchSongsComponent from './components/SearchSongsComponent'

ReactDOM.render((
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={HomeComponent}/>
            <Route  path="/playlists" component={PlayListComponent}/>
            <Route  path="/createPlaylist" component={CreatePlaylistComponent}/>
            <Route  path="/playlists/:pId" component={PlaylistInfoComponent}/>
            <Route  path="/searchSongs" component={SearchSongsComponent}/>
        </div>
    </Router>
), document.getElementById("root"))
