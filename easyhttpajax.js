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
     * Check if data has been passed into method
     * 
     * @private
     * @since 0.3
     * @param {Object} data 
     * @returns {boolean}
     */
    function isData(data) {
        if (data != undefined) {
            return true;
        }

        return false;
    }

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

        return data;
    }

    /**
     * Default error function if none provided
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
         * @param {Object} params
         * @param {string} params.url
         * @param {getResponseCallback} params.callback Callback function to handle data response
         * @param {getErrorCallback} [params.error] Handle error response
         */
        get: function(params) {
            // Set error handler
            let error = params.error || processError;

            // Pass params to this.ajax()
            this.ajax({
                method: 'GET',
                url: params.url,
                callback: params.callback,
                error: error
            });
        },
        /**
         * Response callback requirements for EasyHTTP.get()
         * 
         * @callback getResponseCallback
         * @param {string} responseText HTTP Request response text
         */

         /**
         * Error callback requirements for EasyHTTP.get()
         * 
         * @callback getErrorCallback
         * @param {string} errorMessage Error message HTTP status
         */
        
        /**
         * Makes HTTP POST request
         * 
         * @since 0.1
         * @param {Object} params
         * @param {string} params.url
         * @param {Object} params.data
         * @param {postRequestCallback} params.callback
         * @param {postErrorCallback} [params.error]
         * @param {string} [params.contentType=application/json] Set value for Content-Type header
         */
        post: function(params) {
            // Set error handler
            let error = params.error || processError;
            // Check if data exists
            if (!isData(params.data)) {
                error('No data provided!');
                return;
            }

            // Pass params to this.ajax()
            this.ajax({
                method: 'POST',
                url: params.url,
                data: params.data,
                callback: params.callback,
                error: error,
                contentType: params.contentType
            });
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
            
            // Open AJAX connection
            xhr.open(params.method, params.url, true);

            // Process response
            xhr.onload = function() {
                if (xhr.status === 200 || xhr.status === 201 || xhr.status === 202) {
                    params.callback(xhr.responseText);
                } else {
                    params.error(`Error: ${xhr.status}`)
                }
            }
            
            if (params.method === 'POST' || params.method === 'PUT') {
                let type = params.contentType || 'application/json'
                xhr.setRequestHeader('Content-Type', type)

                if (params.data === undefined) {
                    error('No data specified');
                    return;
                }

                xhr.send(prepareData(params.data, type));
            } else {
                xhr.send();
            }
        }
    }

    window.EasyHTTP = EasyHTTPAjax;
})(window);
