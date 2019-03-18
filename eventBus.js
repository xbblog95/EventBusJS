(
    function(fun){
       window.eventBus = new fun();
    }
)(function(){
    function isFunction(input) {
        return typeof( input ) === 'function'
    }
   var eventPool = {

   };
    this.bind = function (eventName, callback) {
        var eventList = eventPool[eventName] ;
        if(eventList)
        {
            eventList.push(callback);
        }
        else
        {
            eventList = [];
            eventList.push(callback);
            eventPool[eventName] = eventList;
        }
        return this;
    }
    this.unbind = function (eventName) {
        var eventList = eventPool[eventName];
        if(eventList)
        {
            eventList = undefined;
        }
        return this;
    }
    this.call = function (eventName, ...args) {
        var eventList = eventPool[eventName];
        if(eventList)
        {
            var result = [];
            for(var i = 0; i < eventList.length; i++)
            {
                if(isFunction(eventList[i]))
                {

                    result.push(eventList[i].apply(eventList[i], args));
                }
            }
            return result;
        }
        else
        {
            return undefined;
        }
    }
});