# EasyHTTP Ajax

A simple vanilla JavaScript library to abstract HTTP methods to a common API.

Uses XMLHttpRequest to process requests and responses. Doesn't use ES6+ syntax, so it should be compatible with IE 9+.

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

## Installation
Currently the only method of installation is to include the source file in your project, e.g.:

```html
<script src="src/easyhttpajax.js"></script>
```

If you're using a task runner like Grunt or Gulp you can include the file in your scripts path so it's compiled into your application.

## Example

```js
let http = EasyHTTP;

// Get posts from external API
try {
  http.get({
    url: 'https://api.example.com/posts',
    callback: function(posts) {
      // code to process posts response
    }
  });
} catch (e) {
  if (e instanceof HTTPError) {
    // Handle HTTPError
  } else {
    // Handle other error(s)
  }
}
```

See [here](https://github.com/jasonsbarr/easy-http-ajax/blob/0e4183d0f0c5570a0687f6caeb6ad6ebc5a018f5/src/easyhttpajax.js#L203-L213) for allowable params to .send()

Thanks to the [jQuery](https://jquery.com) team for the idea to pass params through a backend method.
