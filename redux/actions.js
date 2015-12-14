import $ from 'jquery'

const testSongs = [
  {
    title: 'Intro',
    album: 'This Is All Yours',
    artist: 'Alt-J',
    itunes_id: 'some_itunes_string',
    album_art: 'http://is2.mzstatic.com/image/thumb/Music2/v4/09/26/76/092676ce-d446-9406-e1c6-79aecce2d0d7/source/100x100bb.jpg',
    album_art_size: 10000
  },
  {
    title: 'Stairway to Heaven',
    album: 'Led Zeppelin IV',
    artist: 'Led Zeppelin',
    itunes_id: 'another_itunes_string',
    album_art: 'http://is2.mzstatic.com/image/thumb/Music1/v4/b0/43/4d/b0434dcd-2cef-1a9d-a35d-486b8dbe2f2c/source/100x100bb.jpg',
    album_art_size: 10000
  }
]

export function addLink(link) {
  return {
    type: 'ADD_LINK',
    link: link
  }
}

export function clearResults() {
  return {
    type: 'CLEAR_RESULTS'
  }
}

export function createLink(song) {
  return (dispatch, getState) => {
    dispatch(toggleLoadingLink(true))
    $.ajax({
      url: 'create',
      method: 'POST',
      data: JSON.stringify(song),
      contentType: 'application/json',
      cache: false,
      error: err => {
        console.error(err)
        dispatch(toggleLoadingLink(false))
      },
      success: res => {
        console.log('received res from /create', res)
        dispatch(addLink({
          url: res,
          artist: song.artist,
          title: song.title
        }))
        dispatch(toggleLoadingLink(false))
      }
    })

    // Mimicking res from '/create with song.album_art url'
    // setTimeout( () => {
    //   dispatch(addLink(song.itunes_id))
    //   dispatch(toggleLoadingLink(false))
    // }, 1000)
  }
}

export function search(text) {
  return (dispatch, getState) => {
    dispatch(clearResults())
    dispatch(toggleLoadingSearch(true))
    $.ajax({
      url: 'search',
      data: {
        search: text
      },
      cache: false,
      error: err => {
        console.error(err)
        dispatch(toggleLoadingSearch(false))
      },
      success: res => {
        const songs = res.map(song => {
          return {
            title: song.title,
            album_title: song.album_title,
            artist: song.artist,
            itunes_id: song.itunes_id,
            album_art: song.album_art,
            album_art_size: song.album_art_size,
            track_length: song.track_length,
            itunes_app_uri: song.itunes_app_uri
          }
        })
        console.log('received res from /search:', songs)
        dispatch(toggleLoadingSearch(false))
        dispatch(updateResults(songs))
      }
    })

    // Mimicking res from '/search'
    // setTimeout(() => {
    //   dispatch(toggleLoadingSearch(false))
    //   dispatch(updateResults(testSongs))
    // }, 1000)

  }
}

export function submitPreference(preference) {
  return dispatch => {
    dispatch(toggleLoadingPreference(true))

    // Mimicking res from '/preference'
    setTimeout(() => {
      dispatch(toggleLoadingPreference(false))
      dispatch(updatePreference(preference))
    }, 1300)
  }
}

export function toggleLoadingLink(isLoading) {
  return {
    type: 'TOGGLE_LOADING_LINK',
    isLoading: isLoading
  }
}

export function toggleLoadingPreference(isLoading) {
  return {
    type: 'TOGGLE_LOADING_PREFERENCE',
    isLoading: isLoading
  }
}

export function toggleLoadingSearch(isLoading) {
  return {
    type: 'TOGGLE_LOADING_SEARCH',
    isLoading: isLoading
  }
}

export function updatePreference(preference) {
  return {
    type: 'UPDATE_PREFERENCE',
    preference: preference
  }
}

export function updateResults(results) {
  return {
    type: 'UPDATE_RESULTS',
    results: results
  }
}
