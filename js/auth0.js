var lock = new Auth0Lock('DjMFFsfZnXlzquSnIlo6DeOoWCpBEOSz', 'pcsm.auth0.com');

var loginButton = document.getElementById('btn-login');
loginButton.addEventListener('click', function() {
    lock.show({ authParams: { scope: 'openid nickname email_verified email' } });
});

var hash = lock.parseHash(window.location.hash);
if (hash) {
    if (hash.error) {
        console.log("There was an error logging in", hash.error);
        alert('There was an error: ' + hash.error + '\n' + hash.error_description);
    } else {
        //save the token in the session:
        localStorage.setItem('id_token', hash.id_token);
    }
}

var id_token = localStorage.getItem('id_token');
if (id_token) {
    lock.getProfile(id_token, function (err, profile) {
        if (err) {
            return alert('There was an error geting the profile: ' + err.message);
        }
        document.getElementById('welcome').textContent = 'Welcome ' + profile.name + '!';
        document.getElementById('intro-text').style.visibility='visible';
    });
}