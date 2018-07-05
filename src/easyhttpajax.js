/**
 * A simple wrapper API for XMLHttpRequest to make asynchronous 
 * HTTP requests of different types. Should be compatible with IE 9+.
 * 
 * @file API functions library
 * @author Jason Barr <jason@jasonsbarr.com>
 * @version 0.4.1
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
     * HTTP Error to be handled by user
     * 
     * @since 0.4.1
     * @constructor
     * @extends Error
     * @param {string} errorMessage
     */
    function HTTPError(errorMessage) {
        this.name = 'HTTPError';
        this.message = errorMessage;
    }

    HTTPError.prototype = Object.create(Error.prototype);
    HTTPError.prototype.constructor = HTTPError;
    HTTPError.prototype.name = 'HTTPError';

    /**
     * Error - Lacks required input data/data is malformed, to be handled by user
     * 
     * @since 0.4.1
     * @constructor
     * @extends Error
     * @param {string} errorMessage
     */
    function InvalidInputError(errorMessage) {
        this.name = 'InvalidInputError';
        this.message = errorMessage;
    }

    InvalidInputError.prototype = Object.create(Error.prototype);
    InvalidInputError.prototype.constructor = InvalidInputError;
    InvalidInputError.prototype.name = 'InvalidInputError';


    const EasyHTTP = {
        /**
         * @namespace EasyHTTP
         */
        
        /**
         * Makes HTTP GET request
         * 
         * @since 0.1
         * @param {Object} params
         * @param {string} params.url
         * @param {getSuccessCallback} params.success Success function to handle data response
         */
        get: function(params) {
            // Pass params to this.send()
            this.send({
                method: 'GET',
                url: params.url,
                success: params.success
            });
        },
        /**
         * Success callback requirements for EasyHTTP.get()
         * 
         * @callback getSuccessCallback
         * @param {string} responseText HTTP Request response text
         */
        
        /**
         * Makes HTTP POST request
         * 
         * @since 0.1
         * @param {Object} params
         * @param {string} params.url
         * @param {Object} params.data
         * @param {postRequestSuccess} params.success Handle success response
         * @param {string} [params.contentType=application/json] Set value for Content-Type header
         */
        post: function(params) {
            // Check if data exists
            if (!isData(params.data)) {
                throw new InvalidInputError('No data provided!');
                return;
            }

            // Pass params to this.send()
            this.send({
                method: 'POST',
                url: params.url,
                data: params.data,
                success: params.success,
                contentType: params.contentType
            });
        },
        /**
         * POST request callback requirements for EasyHTTP.post()
         * @callback postSuccessCallback
         * @param {string} responseText HTTP response text
         */

        /**
         * Makes HTTP PUT request
         * 
         * @since 0.1
         * @param {Object} params
         * @param {string} params.url
         * @param {Object} params.data
         * @param {postSuccessCallback} params.success
         * @param {string} [params.contentType=application/json] Set value for Content-Type header
         */
        put: function(params) {
            // Check if data exists
            if (!isData(params.data)) {
                throw new InvalidInputError('No data provided!');
                return;
            }

            // Pass params to this.send()
            this.send({
                method: 'PUT',
                url: params.url,
                data: params.data,
                success: params.success,
                contentType: params.contentType
            });
        },
        /**
         * PUT request success callback requirements for EasyHTTP.put()
         * @callback putSuccessCallback
         * @param {string} responseText HTTP response text
         */

        /**
         * Makes HTTP DELETE request
         * 
         * @since 0.1
         * @param {Object} params
         * @param {string} params.url
         * @param {deleteSuccessCallback} params.success Callback function to handle success response
         */
        delete: function(params) {
            // Pass params to this.send()
            this.send({
                method: 'DELETE',
                url: params.url,
                success: params.success
            });
        },
        /**
         * DELETE success callback requirements for EasyHTTP.delete()
         * @callback deleteSuccessCallback
         * @param {string} responseText HTTP response
         */

        /**
         * Backend Ajax handler for convenience methods
         * 
         * @since 0.3
         * @param {Object} params Object to instantiate Ajax call
         * @param {string} params.method The HTTP method of the request
         * @param {string} params.url The URL being queried
         * @param {successCallback} params.success Callback to process on response
         * @param {Object} [params.data] Data to process - required for POST and PUT
         * @param {string} [params.contentType=application/json] Content type header value for data being sent
         */
        send: function(params) {
            
            // Open AJAX connection
            xhr.open(params.method, params.url, true);

            // Process response
            xhr.onload = function() {
                if (xhr.status === 200 || xhr.status === 201 || xhr.status === 202) {
                    params.success(xhr.responseText);
                } else {
                    throw new HTTPError(`Error: ${xhr.status}`);
                }
            }
            
            if (params.method === 'POST' || params.method === 'PUT') {
                let type = params.contentType || 'application/json'
                xhr.setRequestHeader('Content-Type', type)

                xhr.send(prepareData(params.data, type));
            } else {
                xhr.send();
            }
        }
         /** Success callback requirements for EasyHTTP.send()
         * @callback sendSuccessCallback
         * @param {string} responseText HTTP response text
         */

    }

    window.EasyHTTP = EasyHTTP;
})(window);