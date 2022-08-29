const clientId = '90294498fa684cef86530dba79c7e547';
const redirectUri = 'http://localhost:3000';
let token;

export const Spotify = {
    getAccessToken() {
        if(token){
            return token;
        }

        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenMatch && expireMatch ) {
            token = tokenMatch[1];
            const expires = Number(expireMatch[1]);
            window.setTimeout(() => token = '', expires * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?q=name:${term}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(respone => {
            return respone.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    }
};