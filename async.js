//
// Asynchronouse Javascript
//
//  Description:    File demo's how javascript asynchronouse programming works.
//                  We start with callbacks, then on to promises and then 
//                  async await.
//
//                  The function doesnt do anything special. It just prints a
//                  message in the return, after a specified time period.
//                  We then call these functions in different ways.
//


// A callback based function
function do_thing_callback(timer, callback){
    
    setTimeout( () => {

        if(it_works){

            callback(null, 'CALLBACKS: do a thing completed!');

        } else {

            callback( new Error('callback failed'));

        }

    },timer);
}


// A promis based function
function do_thing_promise(timer){

    // this lets us set of the function works, or fails. Used to demo
    // how error handling works. Flick it to false to fail. 
    var it_works = true;

    return new Promise(function(resolve, reject){

        if(it_works){

            setTimeout( () => {
                resolve('PROMISE: do a thing completed! :-)');
            },timer);

        } else {

            setTimeout( () => {
                reject('PROMISE: do a thing failed! :-(');
            },timer);

        }

    });
}

/////////////////////////////////////////////////////////////////////
//
// Calling handlers 
//
//  Now, we are going to use our demo functions. 
//      1 - As a traditional javascript callback call
//      2 - As a promise based call.
//      3 - as an async await based call
//
/////////////////////////////////////////////////////////////////////

// normal callback call
function callbacks(){
    do_thing_callback(300, (error, value) => {
        if(error)
        {
            console.log(error.message);
        } else {
            console.log(value)
        }
        
    });
}

// using a promis, in the traditional way
function promises(){

    do_thing_promise(3000).then( (value) => {
        // resolved handling
        console.log(value);
    }).catch( (value) => {
        // rejected handling
        console.log(value);
    }).finally( ()=> {
        // always after handling
        console.log("PROMISE: Thats all folks!");
    });
}

// using a promis, but in the async await way
async function async_await(){

    // async await is basically a different way to call functions that return a promis.
    // they look more like normal procedural coding.

    // To use async await, you need the keyword async before the function

    try {

        let response = await do_thing_promise(300);

        let response2 = await do_thing_promise(200);

        // Normally, the console.log() would execure before the async calls have completed. but,
        // were in an async function, and have used the keyword await before the call. This will
        // block execution untill they are done.

        console.log(response);
        console.log(response2);

    } catch (error){

        // async await errors are handled with a normal try/catch block
        console.log(error);

    }
}
    
/////////////////////////////////////////////////////////////////////
//
//  This bit just runs our code. Its a switch, so we can toggle which
//  functions we want to run.
//
/////////////////////////////////////////////////////////////////////


// options = callback, promise
var toRun = 'async_await'

switch(toRun){
    case 'callback': callbacks();
    break;
    case 'promise': promises();
    break
    case 'async_await' : async_await()
    break;
}


