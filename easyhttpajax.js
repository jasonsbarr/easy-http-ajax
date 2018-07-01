/**
 * A simple wrapper API for XMLHttpRequest to make asynchronous 
 * HTTP requests of different types to handle JSON data
 * 
 * @file API functions library
 * @author Jason Barr
 * @version 0.1
 * @license MIT
 */

/**
 * Instantiates EasyHTTP library
 * @constructor
 * @property {XMLHttpRequest} http Request object this class wraps around
 */
let EasyHTTP = function() {
    this.http = new XMLHttpRequest();
}

/**
 * Makes HTTP GET request
 * 
 * @param {string} url
 * @param {getResponseCallback} callback Callback function to handle data response
 */
EasyHTTP.prototype.get = function(url, callback) {
    let self = this;

    this.http.open('GET', url, true);

    this.http.onload = function() {
        if (self.http.status === 200) {
            callback(self.http.responseText);
        } else {
            callback(null, `Error: ${self.http.status}`)
        }
    }

    this.http.send();
}
/**
 * Response callback requirements for EasyHTTP.get()
 * 
 * @callback getResponseCallback
 * @param {string} responseText HTTP Request response text
 * @param {string} [errorMessage] Error message HTTP status
 */

/**
 * Makes HTTP POST request
 * 
 * @param {string} url
 * @param {Object} data
 * @param {postRequestCallback} callback
 */
EasyHTTP.prototype.post = function(url, data, callback) {
    let self = this;
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-Type', 'application/json');

    this.http.onload = function() {
        callback(self.http.responseText);
    }

    this.http.send(JSON.stringify(data));
}
/**
 * POST request callback requirements for EasyHTTP.post()
 * @callback postRequestCallback
 * @param {string} responseText HTTP response text
 */

/**
 * Makes HTTP POST request
 * 
 * @param {string} url
 * @param {Object} data
 * @param {postRequestCallback} callback
 */
EasyHTTP.prototype.put = function(url, data, callback) {
    let self = this;
    this.http.open('PUT', url, true);
    this.http.setRequestHeader('Content-Type', 'application/json');

    this.http.onload = function() {
        callback(self.http.responseText);
    }

    this.http.send(JSON.stringify(data));
}
/**
 * PUT request callback requirements for EasyHTTP.put()
 * @callback putRequestCallback
 * @param {string} responseText HTTP response text
 */

/**
 * Makes HTTP DELETE request
 */
EasyHTTP.prototype.delete = function() {

}