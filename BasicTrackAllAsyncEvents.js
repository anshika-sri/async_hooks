var asyncHooks = require('async_hooks');
var fs = require("fs");
var hooks = {
  init: init
};

/**
  * for different lifetime events of each async operation,
  * lets track by registering(syncWrites) for each event.
  * @param options the callbacks to register
  * @return an AsyncHooks instance used for disabling and enabling hooks
 */
var asyncHook = asyncHooks.createHook(hooks);

asyncHook.enable();
console.log('#I am a TickObject. Asynchronous in nature. ');

/**
 * @param {*} asyncId 
 * @param {*} type 
 * @param {*} triggerId 
 * This init callback is probably the most interesting one — 
 * it allows you to access the current resource, and look into what caused it to trigger.
 * This means you will eventually be able to create a nice structure to figure out
 * what really goes on within your application.
 */
function init(asyncId, type, triggerId) {
  /**
   * 
   * fs.writeFileSync method performs input/output operations synchronously,
   * blocking the Node.js event loop while the file is written.
   * This may interfere with the performance of your Node.js application
   * if you overdo these synchronous writes
   * 
   * 
   * Called when a class is constructed that has the possibility to emit an asynchronous event.
   * @param asyncId a unique ID for the async resource
   * @param type the type of the async resource
   * @param triggerAsyncId the unique ID of the async resource in whose execution context this async resource was created
   * @param resource reference to the resource representing the async operation, needs to be released during destroy
   * 
   */
 fs.writeSync(1, `#info: ${JSON.stringify({type, asyncId, triggerId}, 0, 4)}\n`);
}



/**
 **********SAMPLE_OUTPUT***************
 * 
 * #info: {
    "type": "TTYWRAP",
    "asyncId": 2,
    "triggerId": 1
  }
  #info: {
    "type": "SIGNALWRAP",
    "asyncId": 3,
    "triggerId": 1
  }
  #I am a TickObject. Asynchronous in nature.
  #info: {
    "type": "TickObject",
    "asyncId": 4,
    "triggerId": 1
  }
 */
