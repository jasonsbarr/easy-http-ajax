/**
 * A simple wrapper API for XMLHttpRequest to make asynchronous 
 * HTTP requests of different types
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

    /**
     * Prepare data object for POST and PUT requests to match required Content-Type
     * 
     * @private
     * @since 0.3
     * @param {Object} data 
     * @param {string} contentType 
     * @returns {string}
     */
    function prepareData(data, contentType) {
        if (contentType === 'application/json') {
            return JSON.stringify(data);
        }
    }

    /**
     * Default error function if no callback provided
     * 
     * @private
     * @since 0.3
     * @param {string} errorMsg 
     * @returns string
     */
    function processError(errorMsg) {
        return errorMsg;
    }

    const EasyHTTPAjax = {
        
        /**
         * Makes HTTP GET request
         * 
         * @since 0.1
         * @param {string} url
         * @param {getResponseCallback} callback Callback function to handle data response
         */
        get: function(url, callback, error) {
        
            // xhr.open('GET', url, true);
        
            // xhr.onload = function() {
            //     if (xhr.status === 200) {
            //         callback(xhr.responseText);
            //     } else {
            //         callback(null, `Error: ${xhr.status}`)
            //     }
            // }
        
            // xhr.send();

            this.ajax({
                method: 'GET',
                url: url,
                callback: callback,
                error: error
            });
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
         * @since 0.1
         * @param {string} url
         * @param {Object} data
         * @param {postRequestCallback} callback
         */
        post: function(url, data, callback, error, dataType) {
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
         * Makes HTTP PUT request
         * 
         * @since 0.1
         * @param {string} url
         * @param {Object} data
         * @param {postRequestCallback} callback
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
         * @since 0.1
         * @param {string} url
         * @param {deleteResponseCallback} callback Callback function to handle data response
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
        },

        /**
         * Backend Ajax handler for convenience methods
         * 
         * @since 0.3
         * @param {Object} params Object to instantiate Ajax call
         * @param {string} params.method The HTTP method of the request
         * @param {string} params.url The URL being queried
         * @param {responseCallback} params.callback Callback to process on response
         * @param {errorCallback} [params.error] Callback to process on error
         * @param {Object} [params.data] Data to process - required for POST and PUT
         * @param {string} [params.contentType=application/json] Content type header value for data being sent
         */
        ajax: function(params) {
            let error = params.error || processError;
            
            // Open AJAX connection
            xhr.open(params.method, params.url, true);

            // Process response
            xhr.onload = function() {
                if (xhr.status === 200) {
                    params.callback(xhr.responseText);
                } else {
                    error(`Error: ${xhr.status}`)
                }
            }
            
            // if (params.method === 'POST' || params.method === 'PUT') {
            //     let type = params.contentType || 'application/json'
            //     xhr.setRequestHeader('Content-Type', type)

            //     if (params.data === undefined) {
            //         error('No data specified');
            //         return;
            //     }

            //     xhr.send(prepareData(params.data, type));
            // } else {
            //     xhr.send();
            // }
            xhr.send();
        }
    }

    window.EasyHTTP = EasyHTTPAjax;
})(window);
