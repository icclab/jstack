/*
The MIT License

Copyright (c) 2012 Universidad Politecnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// JStack Glance Module
// ------------------

// This module provides Glance API functions. 
JSTACK.Glance = (function(JS, undefined) {

    // This modules stores the `url`to which it will send every
    // request.
    var params = {
        url     : undefined,
        state   : undefined
    }
    
    // Private functions
    // -----------------
    
    // Function `_check` internally confirms that Keystone module is 
    // authenticated and it has the URL of the Glance service.
    var _check = function() {
        if(JS.Keystone != undefined && JS.Keystone.params.currentstate == JS.Keystone.STATES.AUTHENTICATED) {
            var service = JS.Keystone.getservice("image");
            params.url = service.endpoints[0].adminURL;
            return true;
        } else {
            return false;
        }
    }
    
    // Public functions
    // ----------------
    //
    // **Image Operations**
    
    //
    // This operation provides a list of images associated with the account. In 
    // [Requesting a List of Public VM Images](http://docs.openstack.org/cactus/openstack-compute/admin/content/requesting-vm-list.html)
    // there is more information about the JSON object that is returned.
    var getimagelist = function(detailed, callback) {
        if(!_check())
            return;
        var url = params.url + '/images';
        if(detailed != undefined & detailed) {
            url += '/detail';
        }
        
        var _onOK = function(result) {
            if(callback != undefined)
                callback(result);
        }
        var _onError = function(message) {
            throw Error(message);
        }

        JS.Comm.get(url, JS.Keystone.params.token, _onOK, _onError);
    }
    
    // Public Functions and Variables
    // ------------------------------
    // This is the list of available public functions and variables
    return {
        
        // Functions: 
        getimagelist            : getimagelist
    }

})(JSTACK);