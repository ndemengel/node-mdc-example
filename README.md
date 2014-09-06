node-mdc-example
================

Example implementation of a java-like Mapped Diagnostic Context (MDC) for
logging contextual information in a Web application.

Common Java loggers (Log4j, Logback, etc.) implement a Mapped Diagnostic
Context (MDC), i.e. a simple map that is associated to the current thread. This
allows for storing contextual information to be logged together with whatever
message is emitted by the application.  
Typically one will want to log:
- which user/session is responsible for the currently logged statement (for
audit purposes)
- which request led to a given action (for debugging purposes, how actions are
correlated one to each-other)

Being fully asynchronous, nodejs does not allow for attaching such a context to
a thread. Fortunately, some smart people are currently [introducing into node]
(http://nodejs.org/docs/v0.11.11/api/process.html#process_async_listeners) a
way of following asynchronous execution stacks, to which a context map can be
attached.  
For now, [a shim is available](https://github.com/othiym23/async-listener), and
[node-continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)
already allows for persisting contexts.

This example uses `continuation-local-storage` to initiate a logging context
for each request, that will then be accessed every time something is logged. To
demonstrate that the logging context is correctly persisted, the logging
utility is used within asynchronous actions.

To be somehow representative of a real production app, this example uses
[Express](http://expressjs.com/) and [Bunyan](https://github.com/trentm/node-bunyan).

Points of interest are:

- context initialization: [middlewares/log-ctx.js](middlewares/log-ctx.js) (loaded in [app.js](app.js#31))
- logging utility: [util/log.js](util/log.js)
- logging example: [dummy-actions.js](dummy-actions.js)

You can run the demo as follow:

- Run `npm install` to load the dependencies.
- Run `./bin/www` to start the application.
- To display nice logs instead of raw JSON ones, you may want to pipe the
output of the previous command into the `bunyan` utility:  
`./bin/www | ./node_modules/.bin/bunyan`
- Open your favorite browser and navigate to [http://localhost:3000](http://localhost:3000).
- Click on the various "Action" links, and clear the session cookie at will
with the dedicated button.
- Observe the logs:
    - the requestId and sessionId fields are persisted across asynchronous calls ;
    - the requestId field is unique to each request ;
    - the sessionId field is unique to each session.

Additionally, you can observe that concurrent uses of the asynchronous
functions do not mix logging contexts by running the following command:

`./bin/concurrency-test | ./node_modules/.bin/bunyan`
