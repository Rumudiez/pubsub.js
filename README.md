# Publish-Subscribe in JS

This ECMAScript 2015 module implements the publish-subscribe pattern for
use in client side applications.

## Usage
```JavaScript
import { publish, subscribe } from 'pubsub';

subscribe('myEventName', (value) => {
  console.log(`Hello, ${value}!`);
});

publish('myEventName', 'world');
// Hello, world!
```