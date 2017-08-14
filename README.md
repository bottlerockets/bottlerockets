[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

[![Bottlerockets Logo](https://cldup.com/WXo9ouZhmm.png)](https://bottlerockets.github.io/)

Bottlerockets is a priority task queue for Node built with high-availability and persistence.

💽&nbsp; **Easy Setup.** Bottlerockets runs background jobs with advanced management.
<br>
🔥&nbsp; **Scalable.** Scales horizontally and vertically with simple commands.
<br>
🕹&nbsp; **It's highly available.** Complete control of task-flow and failure recovery with sensible defaults.

Getting Started
-----------------

```js
const Bottlerockets = require('bottlerockets')
```

License
-----------------

Please see [LICENSE](https://github.com/bottlerockets/bottlerockets/blob/master/LICENSE) for licensing details.

Roadmap
-----------------

- [ ] Hooks
- [x] Job Classes
- [x] Bottlerockets Config
- [ ] Worker Classes
- [ ] CLI
- [ ] Redis Support
- [ ] Unique Items
- [ ] Indexed Job Search

Author
-----------------

Sam Hunter, [@samhunta](https://github.com/samhunta) / [http://www.pegabyte.com](http://www.pegabyte.com)

[travis-image]: https://travis-ci.org/bottlerockets/bottlerockets.svg?branch=master
[travis-url]: https://travis-ci.org/bottlerockets/bottlerockets
[coveralls-image]: https://img.shields.io/coveralls/bottlerockets/bottlerockets/master.svg
[coveralls-url]: https://coveralls.io/r/bottlerockets/bottlerockets?branch=master
[npm-image]: https://img.shields.io/npm/v/bottlerockets.svg
[npm-url]: https://npmjs.org/package/bottlerockets
