export default {
  threeMinuteRead:
  ` Knowing the usage of resources would go a long way in helping identify parts of your system that
    need to be optimized. Since theevent loop is germane to the story, let’s decipher it first.The Event Loop
    Node’s architecture is mainly composed of two major components: V8, the engine that serves as the JavaScript
    interpreter and libuv, the library that provides event loop to Node.js. Also, of importance is the fact that in a
    Node application, everything goes through the event loop. Node.js is an event-based platform, which means that
    everything happens as a reaction to an event. In any given event-driven application, there is generally a main
    loop that listens for events then triggers a callback function when one of those events is detected.
    To really understand the event loop, let’s dive into the various phases of an event loop cycle and what goes on in
    each of them. a. Timers Everything that was scheduled by setTimeout() and setInterval() will be processed here. b.
    Set Immediate Runs all callbacks registered via setImmediate(). c. IO Callbacks Here most of the callbacks are
    processed. d. IO Polling Polls for new events to be processed on the next run.e.
    CloseAll on('close') events are processed here. That’s basically everything you need to know about the event loop.
    But, in case you’d like to get more knowledgeable on the same, check out the Node documentation and/or this blog.
    Big fan of Node.js API Wonderfully, Node.js has built-in modules that make this process easier and fun.
    The Node.js API provides us with Performance Timing API which helps in collection of high resolution performance
    metrics. In this tutorial, we’ll learn how to use the performance hooks module to get the relevant statistics of
    writing to and reading data from a file system. Let’s dive in!
    It’s worth noting that I won’t be using any external dependencies (or modules) in this little project,
    so you’re going to learn how to create a REST API in Node.js without, at any given moment, using npm install.
    Cool, right?
    `,
  oneMinuteRead: `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Quaerat aspernatur deserunt excepturi, libero totam perspiciatis nulla consequuntur ad,
    facilis hic numquam commodi molestias cumque laborum nobis porro mollitia, dicta recusandae!
  `
};
