/**
 * A simple wrapper API for XMLHttpRequest to make asynchronous 
 * HTTP requests of different types to handle JSON data
 * 
 * @file API functions library
 * @namespace EasyHTTPAjax
 * @author Jason Barr
 * @version 0.1
 * @license MIT
 */

(function(window) {

    /**
     * Create private XMLHttpRequest object
     * 
     * @private
     * @since 0.1
     */
    xhr = new XMLHttpRequest();

    const EasyHTTPAjax = {
        
        /**
         * Makes HTTP GET request
         * 
         * @param {string} url
         * @param {getResponseCallback} callback Callback function to handle data response
         * @since 0.1
         */
        get: function(url, callback) {
        
            xhr.open('GET', url, true);
        
            xhr.onload = function() {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    callback(null, `Error: ${xhr.status}`)
                }
            }
        
            xhr.send();
        },
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
         * @since 0.1
         */
        post: function(url, data, callback) {
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onload = function() {
                callback(xhr.responseText);
            }
        
            xhr.send(JSON.stringify(data));
        },
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
         * @since 0.1
         */
        put: function(url, data, callback) {
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onload = function() {
                callback(xhr.responseText);
            }
        
            xhr.send(JSON.stringify(data));
        },
        /**
         * PUT request callback requirements for EasyHTTP.put()
         * @callback putRequestCallback
         * @param {string} responseText HTTP response text
         */
        
        /**
         * Makes HTTP DELETE request
         * 
         * @param {string} url
         * @param {deleteResponseCallback} callback Callback function to handle data response
         * @since 0.1
         */
        delete: function(url, callback) {
        
            xhr.open('DELETE', url, true);
        
            xhr.onload = function() {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    callback(null, `Error: ${xhr.status}`)
                }
            }
        
            xhr.send();
        }
    }

    window.EasyHTTP = EasyHTTPAjax;
})(window);
