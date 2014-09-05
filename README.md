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


To be somehow representative of a real production app, this example uses
[Express](http://expressjs.com/) and [Bunyan](https://github.com/trentm/node-bunyan).
