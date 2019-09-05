'use strict';
class Helper {
    /**
     * Determine value is string
     * @param {*} value
     * @return {bool} 
     */
    isString (value) {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Determine value is integer
     * @param {*} value
     * @return {bool} 
     */
    isInteger(value) {
        return Number.isInteger(value);
    }

    /**
     * Determine value is boolean
     * @param {*} value
     * @return {bool} 
     */
    isBoolean(value) {
        // return typeof variable === "boolean" || value instanceof Boolean;
        return typeof value === 'boolean' || (typeof value === 'object' && value !== null && typeof value.valueOf() === 'boolean');
    }

    /**
     * Determine value is array
     * @param {*} value 
     * @return {bool}
     */
    isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * Determine value is object
     * @param {*} value 
     * @return {bool}
     */
    isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Determine value is empty
     * @param {var} value
     * @return {bool} 
     */
    isEmpty(value) {
        return (value === undefined || value === null || value === '');
    }

    /**
     * Determine value is empty and array
     * @param {*} value 
     * @return {bool}
     */
    isEmptyArray(value) {
        return (!Array.isArray(value) || !value.length);
    }

    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */
    isEmptyObject(value) {
        for(var key in value) {
            if(value.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}

module.exports = Helper;