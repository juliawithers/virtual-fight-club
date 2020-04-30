export default fetchMethods = {
    postLogin: function () {
        fetch(config.API_LOGIN_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                this.setState({
                    login: data.login,
                    user_id: data.user.id,
                    username: data.user.username,
                    auth: data.user.auth,
                    character: this.getCharacter(this.login, this.user.id),
                    characters: this.getCharactersList(this.login, this.user.id)
                })
            })
            .catch(error => this.setState({ error }))
    },
    postUser: function () {
        fetch(config.API_USERS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(user_object),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(user => {
                console.log(user)
                this.setState({
                    auth: user.auth,
                    user_id: user.id,
                    username: user.username
                })
            })
            .catch(error => this.setState({ error }))
    },
    postCharacter: function () {
        fetch(config.API_CHARACTERS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(character),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .catch(error => this.setState({ error }))

        // must update character and characters 
        if (reason === 'fight') {
            //  get characters and character
            this.setState({
                character: this.getCharacter(this.state.login, this.state.user_id),
                charcters: this.getCharactersList(this.state.login, this.state.user_id)
            })
        } else if (reason === 'attributes') {
            //  get only character back
            this.setState({
                character: this.getCharacter(this.state.login, this.state.user_id)
            })
        } else if (reason === 'create') {
            this.setState({
                login: true,
                character: this.getCharacter(this.state.login, this.state.user_id),
                charcters: this.getCharactersList(this.state.login, this.state.user_id)
            })
        }
    },
    getCharacterById:,
    getCharacters:

}