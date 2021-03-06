let YOUR_CLIENT_ID = '386760170314-pghm3r6r269odhbvemgh1mkb9mth2erc.apps.googleusercontent.com'
let YOUR_REDIRECT_URI = 'https://wonderful-toffee-0e4d6e.netlify.app/'
let fragmentString = location.hash.substring(1)

// Parse query string to see if page request is coming from OAuth 2.0 server.
let params = {}
let regex = /([^&=]+)=([^&]*)/g,
    m
while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}
if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params))
    const pElement = document.querySelector('p')
    pElement.textContent = '登入成功'
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

    // Create element to open OAuth 2.0 endpoint in new window.
    let form = document.createElement('form')
    form.setAttribute('method', 'GET') // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint)

    // Parameters to pass to OAuth 2.0 endpoint.
    let params = {
        client_id: YOUR_CLIENT_ID,
        redirect_uri: YOUR_REDIRECT_URI,
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        state: 'try_sample_request',
        include_granted_scopes: 'true',
        response_type: 'token',
    }

    // Add form parameters as hidden input values.
    for (let p in params) {
        let input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form)
    form.submit()
}
