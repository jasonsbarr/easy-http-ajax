# EasyHTTP Ajax

A simple vanilla JavaScript library to abstract HTTP methods to a common API.

Uses XMLHttpRequest to process requests and responses.

If you don't need to support Internet Explorer and/or you can use Babel you should probably [check out the Fetch version](https://github.com/jasonsbarr/easy-http-fetch)

## Public methods

### Convenience methods to handle specific HTTP verbs
- get()
- post()
- put()
- delete()

### Backend handler for convenience methods
- send()

## How it works
Convenience methods pass a params object to EasyHTTP.send(), which handles the XMLHttpRequest object accordingly.

The .send() method is also public if convenience methods aren't sufficient, though functionality is currently limited at this point.

## Example

```js
let http = EasyHTTP;

// Get posts from external API
http.get({
  url: 'https://api.example.com/posts',
  callback: function(posts) {
    // code to process posts response
  },
  error: function(err) {
    // code to process error message
  }
});
```

See [here](https://github.com/jasonsbarr/easy-http-ajax/blob/81c3cc033254e62154ec7600d1d6d6a76603286d/src/easyhttpajax.js#L199-L210) for allowable params to .send()

Thanks to the [jQuery](https://jquery.com) team for the idea to pass params through a backend method.
