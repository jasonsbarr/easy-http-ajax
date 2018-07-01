# EasyHTTPAjax

A simple vanilla JavaScript library to abstract HTTP methods to a common API.

Uses XMLHttpRequest to process requests and responses

## Public methods

### Convenience methods to handle specific HTTP verbs
- get()
- post()
- put()
- delete()

### Backend handler for convenience methods
- ajax()

## How it works
Convenience methods pass a params object to EasyHTTPAjax.ajax(), which handles the XMLHttpRequest object accordingly.

The .ajax() method is also public if convenience methods aren't sufficient, though functionality is currently limited at this point.

## Example

```js
let http = EasyHTTPAjax;

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

See [here](https://github.com/jasonsbarr/easy-http-ajax/blob/fb6a0e02ff4d456829c48204cee245e9d24e6a9e/easyhttpajax.js#L212-L223) for allowable params to .ajax()

Thanks to the [jQuery](https://jquery.com) team for the idea to pass params through an .ajax() method.
