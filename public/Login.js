class Login extends React.Component {
    constructor(props) {
        super(props)
        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }

    handleLogin = event => {
        this.props.authenticateUser(this.usernameInput.current.value, this.passwordInput.current.value)
    }

    render () {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input ref={this.usernameInput} type="Username" className="form-control" id="usernameInput" aria-describedby="UsernameHelp" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input ref={this.passwordInput} type="password" className="form-control" id="passwordInput" placeholder="Password"/>
                </div>
                <button onClick={this.handleLogin} className="btn btn-primary">Login</button>
            </div>

        )
    }
}
