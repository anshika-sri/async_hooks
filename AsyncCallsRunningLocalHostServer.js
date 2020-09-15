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

var http = require('http');
asyncHook.enable();
console.log('#I am a TickObject. Asynchronous in nature. ');

http.createServer(function (req, res) {
  res.end('hello qts')
}).listen(8079)

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
 *****SAMPLE_OUTPUT*********

  #info: {
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
  #info: {
      "type": "TCPSERVERWRAP",
      "asyncId": 5,
      "triggerId": 1
  }
  #info: {
      "type": "TickObject",
      "asyncId": 6,
      "triggerId": 5
  }

  //below are also async events when refresh localhost:8079

  #info: {
      "type": "TCPWRAP",
      "asyncId": 7,
      "triggerId": 5
  }
  #info: {
      "type": "Timeout",
      "asyncId": 8,
      "triggerId": 7
  }
  #info: {
      "type": "HTTPINCOMINGMESSAGE",
      "asyncId": 9,
      "triggerId": 7
  }
  #info: {
      "type": "Timeout",
      "asyncId": 10,
      "triggerId": 7
  }
  #info: {
      "type": "TickObject",
      "asyncId": 11,
      "triggerId": 7
  }
  #info: {
      "type": "TCPWRAP",
      "asyncId": 12,
      "triggerId": 5
  }
  #info: {
      "type": "Timeout",
      "asyncId": 13,
      "triggerId": 12
  }
  #info: {
      "type": "HTTPINCOMINGMESSAGE",
      "asyncId": 14,
      "triggerId": 12
  }
  #info: {
      "type": "TickObject",
      "asyncId": 15,
      "triggerId": 12
  }
  #info: {
      "type": "TickObject",
      "asyncId": 16,
      "triggerId": 9
  }
  #info: {
      "type": "TickObject",
      "asyncId": 17,
      "triggerId": 9
  }
  #info: {
      "type": "TickObject",
      "asyncId": 18,
      "triggerId": 16
  }
  #info: {
      "type": "TickObject",
      "asyncId": 19,
      "triggerId": 16
  }
  #info: {
      "type": "Timeout",
      "asyncId": 20,
      "triggerId": 16
  }
  #info: {
      "type": "TickObject",
      "asyncId": 21,
      "triggerId": 17
  }
  #info: {
      "type": "TickObject",
      "asyncId": 22,
      "triggerId": 18
  }
  #info: {
      "type": "TickObject",
      "asyncId": 23,
      "triggerId": 18
  }
  #info: {
      "type": "TickObject",
      "asyncId": 24,
      "triggerId": 18
  }
  #info: {
      "type": "Timeout",
      "asyncId": 25,
      "triggerId": 9
  }
  #info: {
      "type": "TickObject",
      "asyncId": 26,
      "triggerId": 9
  }
  #info: {
      "type": "TickObject",
      "asyncId": 27,
      "triggerId": 9
  }
  #info: {
      "type": "TickObject",
      "asyncId": 28,
      "triggerId": 26
  }
  #info: {
      "type": "TickObject",
      "asyncId": 29,
      "triggerId": 26
  }
  #info: {
      "type": "Timeout",
      "asyncId": 30,
      "triggerId": 26
  }
  #info: {
      "type": "TickObject",
      "asyncId": 31,
      "triggerId": 27
  }
  #info: {
      "type": "TickObject",
      "asyncId": 32,
      "triggerId": 28
  }
  #info: {
      "type": "TickObject",
      "asyncId": 33,
      "triggerId": 28
  }
  #info: {
      "type": "TickObject",
      "asyncId": 34,
      "triggerId": 28
  }
  #info: {
      "type": "TTYWRAP",
      "asyncId": 35,
      "triggerId": 30
  }
  #info: {
      "type": "TickObject",
      "asyncId": 36,
      "triggerId": 30
  }
  #info: {
      "type": "TickObject",
      "asyncId": 37,
      "triggerId": 12
  }
  #info: {
      "type": "TickObject",
      "asyncId": 38,
      "triggerId": 12
  }
  #info: {
      "type": "TickObject",
      "asyncId": 39,
      "triggerId": 37
  }
  #info: {
      "type": "SHUTDOWNWRAP",
      "asyncId": 40,
      "triggerId": 12
  }
  #info: {
      "type": "TickObject",
      "asyncId": 41,
      "triggerId": 40
  }
 */

