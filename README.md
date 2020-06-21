# Music App
==========================

> React Js playlists from a library of
> songs!

To install and start the web server:

```bash
cd app
npm install
npm start
opens at http://localhost:3000/
```

Included in this folder is a Node.js web server which includes an API and a
skeleton for your browser-based playlist application.

To install and start the node server:

```bash
npm install
npm start
```


API
-------------------------------

Everything from `/public/` is served at http://localhost:5000/.

The API provides the following methods:


`GET /library/`
---------------

Returns a JSON array of songs.

Request:

```bash
curl http://localhost:5000/library/
```

Response:

```json
[
    {
        "id": 0,
        "artist": "The Black Keys",
        "album": "Brothers",
        "title": "Everlasting Light",
        "length": 203,
        "track": 1
    },
    {
        "id": 1,
        "artist": "The Black Keys",
        "album": "Brothers",
        "title": "Next Girl",
        "length": 198,
        "track": 2
    },
    ...
]
```

`GET /library/:id/`
---------------------

Returns a JSON object for a song with given `id`.

Request:

```bash
curl http://localhost:5000/library/200/
```

Response:

```json
{
  "album": "Nothing But The Beat",
  "duration": 196,
  "title": "Sweat (Snoop Dogg vs. David Guetta) [Remix]",
  "id": 200,
  "artist": "David Guetta"
}
```

`GET /playlist/`
---------------------

Returns a JSON array of playlists.

Request:

```bash
curl http://localhost:5000/playlist/
```

Response:

```json
[
  {
    "id": 0,
    "name": "Ryan's Megamix",
    "songs": [
      20,
      21,
      56,
      80,
      99
    ]
  },
  {
    "id": 1,
    "name": "Ryan's Megamix 2",
    "songs": [
      20,
      21,
      56,
      80,
      99
    ]
  },
  ...
]
```

`GET /playlist/:id/`
---------------------

Returns a JSON object with the playlist with given `id`.

Request:

```bash
curl http://localhost:5000/playlist/0/
```

Response:

```json
{
    "id": 0,
    "name": "Ryan's Megamix",
    "songs": [
        20,
        21,
        56,
        80,
        99
    ]
}
```

`POST /playlist/` or `POST /playlist/:id/`
-------------------------------------------

Saves a playlist and returns the id. May create a new playlist or override an
old one.

Request:

```bash
curl http://localhost:5000/playlist/ -X POST -d '{ "name": "Hi", "songs": [1,2,3,4]}' -H "Content-Type: application/json"
```


Response:

```json
{
    "id": 100
}
```


`DELETE /playlist/:id`
-------------------------

Deletes a playlist.

Request:

```bash
curl http://localhost:5000/playlist/10/ -X DELETE
```

Response:

```json
{}
```
