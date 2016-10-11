var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, callback) { //
  var endPoint = 'https://api.github.com/repos/'+ repoOwner + '/' + repoName + '/contributors';
  var contribOptions = {
    'url': endPoint,
    'headers': {
      'User-Agent': 'request'  //key's with hyphens must be made into strings, otherwise they don't need to be strings.
    },
    json: true //to parse the code.
  };
console.log(endPoint)
  request(contribOptions, function(_err, _response, data) { //the 3 default parameters which the request function calls.
    data.forEach(function(value, index) {  //these make it so we can pass in the below callback easily. ForEach loop goes through each object in the array.
      callback(value.avatar_url, './avatars/' + index + '.jpg'); //we can call on the .avatar_url as a key/value because it's in an object in our glob of strings.
    })
  })
}

function downloadImageByURL(url, filePath) { //downloadImageByURL becomes our callback function.
  request(url).pipe(fs.createWriteStream(filePath)) //instead of printing out, now download from URL, save to FilePath!
}

var myArgs = process.argv.slice(2);
getRepoContributors(myArgs[0], myArgs[1], downloadImageByURL);

//getRepoContributors("lighthouse-labs", "laser_shark", downloadImageByURL) //this is where we are passing in downloadImageByURL as our callback, so that our top level function can use it without needing to be redefined.

/*{ login: 'LaithAzer',
  id: 8368880,
  avatar_url: 'https://avatars.githubusercontent.com/u/8368880?v=3',
  gravatar_id: '',
  url: 'https://api.github.com/users/LaithAzer',
  html_url: 'https://github.com/LaithAzer',
  followers_url: 'https://api.github.com/users/LaithAzer/followers',
  following_url: 'https://api.github.com/users/LaithAzer/following{/other_user}',
  gists_url: 'https://api.github.com/users/LaithAzer/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/LaithAzer/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/LaithAzer/subscriptions',
  organizations_url: 'https://api.github.com/users/LaithAzer/orgs',
  repos_url: 'https://api.github.com/users/LaithAzer/repos',
  events_url: 'https://api.github.com/users/LaithAzer/events{/privacy}',
  received_events_url: 'https://api.github.com/users/LaithAzer/received_events',
  type: 'User',
  site_admin: false,
  contributions: 345 } */