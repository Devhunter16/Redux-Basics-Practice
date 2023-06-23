// Importing third-party npm package redux 
const redux = require('redux');

// Core redux concepts: Central Data (State) Store --> Components --> Action -->
// Reducer Function --> Back around to beginning

// Reducer function. A reducer function's goal is to spit out state snapshot initially
// and also whenever an action reaches it. It always recieves two parameters, the old
// or existing state, and the action that was dispatched. It's output is the new state
// object. This should be a "pure" function, meaning that the same inputs should always
// produce the same output. In other words, there should be no side-effects. We give
// the state parameter a default value becuase the first time counterReducer runs, there
// is not existing or current state, so we need to define a current state.
const counterReducer = (currentState = { counter: 0 }, action) => {
    // if the type of action is 'INCREMENT', then return the incremented new state.
    if (action.type === 'INCREMENT') {
        // Returning the new state.
        return {
            counter: currentState.counter + 1
        };
    };
    if (action.type === 'DECREMENT') {
        return {
            counter: currentState.counter - 1
        };
    };

    // Otherwise we return the unchanged state.
    return currentState;
};

// Creating the central data store. We pass our reducer to this createStore() function.
// We do this because the store needs to know which reducer function is responsible for
// changing it.
const store = redux.createStore(counterReducer);

// A subscriber is a function which does not take any parameters. Inside of the function
// we reach out to the store with store.getState(). .getState() is a method which is
// available on the store we created with .createStore(). It will give us the latest
// state snapshot after the store was updated.
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

// Here we're making redux aware of our subscriber function and telling it that that
// function should be executed whenever our state changes. We do this by passing our 
// subscriber function to the .subscribe() method on our store.
store.subscribe(counterSubscriber);

// .dispatch() is a method which dispatches an action. An action is a Javascript object 
// with a "type" property which acts as an identifier. Typically type would be a string
// which identifies which action is being performed. Every time an action runs (or is 
// "dispatched") the reducer function runs again.
store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'DECREMENT'});

// Hwn we run "node redux-demo.js in the console we recieve { counter: 1 } and then 
// { counter: 0 }. This is because we dispatched two actions (seen directly above) where
//  the counter is incremented and then decremented.
