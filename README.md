This is a CrossMint assignment written by Marina Ganopolsky

# Description: 

This is a very interesting assignment and I truly enjoyed working through this. 

Currently, the code is designed as follows:

## Setup

After downloading the repo, install the necessary packages using `yarn`:

``` yarn install ```

Once this completes, spin up the `Express Server` using 

``` yarn start```

Use `curl` or apps like `Postman` to make the calls described below.

### Endpoints 

An express server spins up on port 3000, and the available endpoints are:

1. `makeX` - this will create the X needed for phase 1
2. `clear` - this will clear the 30X30 base needed for phase 2
3. `makePhase2` - this will create the Phase 2 map .

The application uses asyncronous `fetch` calls to interact with the CrossMint API.
After working on this for phase 2 (but not phase 1), it was quickly obvious that the API has limited capacity and will very quickly get overloaded with hundreds of calls to the various endpoints to create the various space entities.

Therefor, it was necessary to come up with a way to space out the calls so that the server will not get overloaded. 

A simple way to implement this was to use a method that literally waits for a specified amount of time to place the next call; 
A `delay` option can also be used on the `fetch` methods - but this came back with varying results.

Currently, the code is written with sequential `async/await` calls to the CrossMint API, and the end points wait for all these to return in order to print out the result of each call.

Some faultt-tolerance is also built-in, and each call will retry up to 5 times if it at first does not succeed. 

## Possible Optimizations:

In the interests of brevity I wrote this quickly, but several optimizations can and should be made were this to be created as a production system.

1. Testing suites 
2. Using TypeSript vs JavaScript 
3. API endpoints will return asyncronously as opposed to waiting for the entire batch to complete. 
   1. Results from each call can be published to a data store / queue somewhere
   2. A polling thread can check on the status of the calls
   3. Another round of calls can check on the queue and check on the progress of the system.

### Easter Egg

