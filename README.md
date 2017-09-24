# Publish-Subscribe in JS

This ECMAScript 2015 module implements the publish-subscribe pattern
for use in client side applications.

## Usage

PubSub in global scope:
```JavaScript
import { publish, subscribe } from 'pubsub';

let sub = subscribe('myEventName', value => {
  console.log(`Hello, ${value}!`);
});

publish('myEventName', 'world');
// Hello, world!

sub.remove();
publish('myEventName', 'you');
// nothing happens
```

Namespaced scopes:
```JavaScript
import pubsub from 'pubsub';
let myObj = {};
pubsub(myObj);

let mySub = myObj.pubsub.subscribe('foo', () => console.log('namespaced foo'));
myObj.pubsub.publish('foo');
// 'namespaced foo'

mySub.remove();
myObj.pubsub.publish('foo');
// nothing happens
```

This implementation also supports an arbitrary number of arguments.
Whatever additional arguments you pass to the `publish` method will
be forwarded to the callbacks provided with the `subscribe` method.