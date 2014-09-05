var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send([
    '<html>',
      '<head><title>Node MDC Example</title></head>',
      '<body>',
        '<button onclick="clearCookie();">Clear Session Cookie</button>',
        '<p>Some random links to create traffic and trigger some logic (see logs):</p>',
        '<ul>',
          '<li><a href="/actions/1">Action 1</a></li>',
          '<li><a href="/actions/2">Action 2</a></li>',
          '<li><a href="/actions/3">Action 3</a></li>',
        '</ul>',
        '<script>',
          '(function() {',
            'var lastActionMatch = window.location.search.match(/\\?.*(?:\\b|&)lastAction=([1-3]).*/);',
            'if (lastActionMatch) {',
              'var p = document.createElement("p");',
              'p.innerHTML = "Action " + lastActionMatch[1] + " executed.";',
              'document.body.appendChild(p);',
            '}',
          '})();',
          '',
          'function clearCookie() {',
            'console.log(document.cookie);',
            'document.cookie = encodeURIComponent("connect.sid") + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";',
            'console.log(document.cookie);',
          '}',
        '</script>',
      '</body>',
    '</html>',
  ].join('\n'));
});

module.exports = router;
