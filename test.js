IncomingMessage {
  _readableState:
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: [],
     length: 0,
     pipes: null,
     pipesCount: 0,
     flowing: null,
     ended: false,
     endEmitted: false,
     reading: false,
     sync: true,
     needReadable: false,
     emittedReadable: false,
     readableListening: false,
     defaultEncoding: 'utf8',
     ranOut: false,
     awaitDrain: 0,
     readingMore: false,
     decoder: null,
     encoding: null },
  readable: true,
  domain: null,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined,
  socket:
   Socket {
     _connecting: false,
     _hadError: false,
     _handle:
      TCP {
        _externalStream: {},
        fd: 50,
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        writeQueueSize: 0 },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [],
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        defaultEncoding: 'utf8',
        ranOut: false,
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null,
        resumeScheduled: false },
     readable: true,
     domain: null,
     _events:
      { end: [Object],
        finish: [Function: onSocketFinish],
        _socketEnd: [Function: onSocketEnd],
        drain: [Object],
        timeout: [Function],
        error: [Object],
        close: [Object],
        data: [Function: socketOnData],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 10,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false },
     writable: true,
     allowHalfOpen: true,
     destroyed: false,
     bytesRead: 0,
     _bytesDispatched: 4325,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _connections: 6,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        _pendingResponseData: 0,
        _connectionKey: '6::::3000' },
     _idleTimeout: 120000,
     _idleNext:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 4688,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Object],
        _idlePrev: [Circular],
        _idleStart: 2725,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idlePrev:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 1117,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Circular],
        _idlePrev: [Object],
        _idleStart: 2726,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idleStart: 2725,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        maxHeaderPairs: 2000,
        onIncoming: [Function: parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     read: [Function],
     _consuming: true,
     _httpMessage:
      ServerResponse {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedHeader: {},
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _headers: [Object],
        _headerNames: [Object],
        _onPendingData: [Function: updateOutgoingData],
        req: [Circular],
        locals: {} } },
  connection:
   Socket {
     _connecting: false,
     _hadError: false,
     _handle:
      TCP {
        _externalStream: {},
        fd: 50,
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        writeQueueSize: 0 },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [],
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        defaultEncoding: 'utf8',
        ranOut: false,
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null,
        resumeScheduled: false },
     readable: true,
     domain: null,
     _events:
      { end: [Object],
        finish: [Function: onSocketFinish],
        _socketEnd: [Function: onSocketEnd],
        drain: [Object],
        timeout: [Function],
        error: [Object],
        close: [Object],
        data: [Function: socketOnData],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 10,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false },
     writable: true,
     allowHalfOpen: true,
     destroyed: false,
     bytesRead: 0,
     _bytesDispatched: 4325,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _connections: 6,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        _pendingResponseData: 0,
        _connectionKey: '6::::3000' },
     _idleTimeout: 120000,
     _idleNext:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 4688,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Object],
        _idlePrev: [Circular],
        _idleStart: 2725,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idlePrev:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 1117,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Circular],
        _idlePrev: [Object],
        _idleStart: 2726,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idleStart: 2725,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        maxHeaderPairs: 2000,
        onIncoming: [Function: parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     read: [Function],
     _consuming: true,
     _httpMessage:
      ServerResponse {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedHeader: {},
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _headers: [Object],
        _headerNames: [Object],
        _onPendingData: [Function: updateOutgoingData],
        req: [Circular],
        locals: {} } },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: false,
  headers:
   { host: '127.0.0.1:3000',
     connection: 'keep-alive',
     'content-length': '15',
     pragma: 'no-cache',
     'cache-control': 'no-cache',
     origin: 'http://127.0.0.1:3000',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36',
     'content-type': 'text/plain;charset=UTF-8',
     accept: '*/*',
     referer: 'http://127.0.0.1:3000/sequence/572fbb0b2f91d383c7bce295',
     'accept-encoding': 'gzip, deflate',
     'accept-language': 'en-US,en;q=0.8' },
  rawHeaders:
   [ 'Host',
     '127.0.0.1:3000',
     'Connection',
     'keep-alive',
     'Content-Length',
     '15',
     'Pragma',
     'no-cache',
     'Cache-Control',
     'no-cache',
     'Origin',
     'http://127.0.0.1:3000',
     'User-Agent',
     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36',
     'Content-Type',
     'text/plain;charset=UTF-8',
     'Accept',
     '*/*',
     'Referer',
     'http://127.0.0.1:3000/sequence/572fbb0b2f91d383c7bce295',
     'Accept-Encoding',
     'gzip, deflate',
     'Accept-Language',
     'en-US,en;q=0.8' ],
  trailers: {},
  rawTrailers: [],
  upgrade: false,
  url: '/data/572fbb0b2f91d383c7bce295',
  method: 'POST',
  statusCode: null,
  statusMessage: null,
  client:
   Socket {
     _connecting: false,
     _hadError: false,
     _handle:
      TCP {
        _externalStream: {},
        fd: 50,
        reading: true,
        owner: [Circular],
        onread: [Function: onread],
        onconnection: null,
        writeQueueSize: 0 },
     _parent: null,
     _host: null,
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [],
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: false,
        endEmitted: false,
        reading: true,
        sync: false,
        needReadable: true,
        emittedReadable: false,
        readableListening: false,
        defaultEncoding: 'utf8',
        ranOut: false,
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null,
        resumeScheduled: false },
     readable: true,
     domain: null,
     _events:
      { end: [Object],
        finish: [Function: onSocketFinish],
        _socketEnd: [Function: onSocketEnd],
        drain: [Object],
        timeout: [Function],
        error: [Object],
        close: [Object],
        data: [Function: socketOnData],
        resume: [Function: onSocketResume],
        pause: [Function: onSocketPause] },
     _eventsCount: 10,
     _maxListeners: undefined,
     _writableState:
      WritableState {
        objectMode: false,
        highWaterMark: 16384,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: false,
        bufferProcessing: false,
        onwrite: [Function],
        writecb: null,
        writelen: 0,
        bufferedRequest: null,
        lastBufferedRequest: null,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false },
     writable: true,
     allowHalfOpen: true,
     destroyed: false,
     bytesRead: 0,
     _bytesDispatched: 4325,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _connections: 6,
        _handle: [Object],
        _usingSlaves: false,
        _slaves: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        _pendingResponseData: 0,
        _connectionKey: '6::::3000' },
     _idleTimeout: 120000,
     _idleNext:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 4688,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Object],
        _idlePrev: [Circular],
        _idleStart: 2725,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idlePrev:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 1117,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Circular],
        _idlePrev: [Object],
        _idleStart: 2726,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: null },
     _idleStart: 2725,
     parser:
      HTTPParser {
        '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        '4': [Function: onParserExecute],
        _headers: [],
        _url: '',
        _consumed: true,
        socket: [Circular],
        incoming: [Circular],
        maxHeaderPairs: 2000,
        onIncoming: [Function: parserOnIncoming] },
     on: [Function: socketOnWrap],
     _paused: false,
     read: [Function],
     _consuming: true,
     _httpMessage:
      ServerResponse {
        domain: null,
        _events: [Object],
        _eventsCount: 1,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: false,
        chunkedEncoding: false,
        shouldKeepAlive: true,
        useChunkedEncodingByDefault: true,
        sendDate: true,
        _removedHeader: {},
        _contentLength: null,
        _hasBody: true,
        _trailer: '',
        finished: false,
        _headerSent: false,
        socket: [Circular],
        connection: [Circular],
        _header: null,
        _headers: [Object],
        _headerNames: [Object],
        _onPendingData: [Function: updateOutgoingData],
        req: [Circular],
        locals: {} } },
  _consuming: false,
  _dumped: false,
  next: [Function: next],
  baseUrl: '',
  originalUrl: '/data/572fbb0b2f91d383c7bce295',
  _parsedUrl:
   Url {
     protocol: null,
     slashes: null,
     auth: null,
     host: null,
     port: null,
     hostname: null,
     hash: null,
     search: null,
     query: null,
     pathname: '/data/572fbb0b2f91d383c7bce295',
     path: '/data/572fbb0b2f91d383c7bce295',
     href: '/data/572fbb0b2f91d383c7bce295',
     _raw: '/data/572fbb0b2f91d383c7bce295' },
  params: { id: '572fbb0b2f91d383c7bce295' },
  query: {},
  res:
   ServerResponse {
     domain: null,
     _events: { finish: [Function: resOnFinish] },
     _eventsCount: 1,
     _maxListeners: undefined,
     output: [],
     outputEncodings: [],
     outputCallbacks: [],
     outputSize: 0,
     writable: true,
     _last: false,
     chunkedEncoding: false,
     shouldKeepAlive: true,
     useChunkedEncodingByDefault: true,
     sendDate: true,
     _removedHeader: {},
     _contentLength: null,
     _hasBody: true,
     _trailer: '',
     finished: false,
     _headerSent: false,
     socket:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 4325,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Object],
        _idlePrev: [Object],
        _idleStart: 2725,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: [Circular] },
     connection:
      Socket {
        _connecting: false,
        _hadError: false,
        _handle: [Object],
        _parent: null,
        _host: null,
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: [Object],
        _eventsCount: 10,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: true,
        allowHalfOpen: true,
        destroyed: false,
        bytesRead: 0,
        _bytesDispatched: 4325,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: [Object],
        _idleTimeout: 120000,
        _idleNext: [Object],
        _idlePrev: [Object],
        _idleStart: 2725,
        parser: [Object],
        on: [Function: socketOnWrap],
        _paused: false,
        read: [Function],
        _consuming: true,
        _httpMessage: [Circular] },
     _header: null,
     _headers: { 'x-powered-by': 'Express' },
     _headerNames: { 'x-powered-by': 'X-Powered-By' },
     _onPendingData: [Function: updateOutgoingData],
     req: [Circular],
     locals: {} },
  body: {},
  route:
   Route {
     path: '/data/:id',
     stack: [ [Object] ],
     methods: { post: true } } }

