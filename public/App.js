class App extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            data: [],
            page: ''
        }
    }

    authenticateUser = (username, password) => {
        callApi(
            'POST',
            '/api/authenticate',
            {'Content-Type':'application/json'}, 
            JSON.stringify({username: username, password: password}), 
            (err, data) => {
            if (err) {
                console.log(err)
                alert(err.response)
            } else {
                // alert('Login successful')
                this.setState({page: 'main'})
            }
        })
    }

    render () {
        if (this.state.page === '') {
            return (
                <div className="container-fluid">
                    <Login authenticateUser={this.authenticateUser}></Login>
                </div>
            )
        } else {
            return (
                <h1>lobby!</h1>
            )
        }
        
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

function callApi (method, path, headers, body, cb) {
	var request = new XMLHttpRequest()
	var path = path
    request.open(method, path, true)
    for (var field in headers) {
        request.setRequestHeader(field, headers[field]);    
    }
    if (method.toLowerCase() === 'get') {
        request.send(null)
    } else {
        request.send(body)
    }
    
	request.onreadystatechange = function() {
		if (request.readyState === 4)  {
			if (request.status == 200) {
				cb(null, request.responseText);
			} else {
				cb({
                    statusCode: request.status,
                    response: request.responseText ? request.responseText : false
                }, null);
			}			
		}
	};
}