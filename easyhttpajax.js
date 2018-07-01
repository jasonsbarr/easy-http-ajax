/**
 * @file    A simple wrapper API for XMLHttpRequest to make 
 *          HTTP requests of different types
 * 
 * @author Jason Barr
 * @version 0.1
 * @license MIT
 */

/**
 * Instantiates EasyHTTP library
 * @constructor
 * @property {XMLHttpRequest} http    Request object this class wraps around
 */
let EasyHTTP = function() {
    this.http = new XMLHttpRequest();
}

/**
 * Makes HTTP GET request
 */
EasyHTTP.prototype.get = function() {

}

/**
 * Makes HTTP POST request
 */
EasyHTTP.prototype.post = function() {

}

/**
 * Makes HTTP PUT request
 */
EasyHTTP.prototype.put = function() {

}

/**
 * Makes HTTP DELETE request
 */
EasyHTTP.prototype.delete = function() {
    
}