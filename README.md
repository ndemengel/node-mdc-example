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


To be somehow representative of a real production app, this example uses
[Express](http://expressjs.com/) and [Bunyan](https://github.com/trentm/node-bunyan).
