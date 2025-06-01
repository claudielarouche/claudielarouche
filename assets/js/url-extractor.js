console.log("v2");
        function analyze() {
            var inputUrl = document.getElementById('urlInput').value;
            var baseUrl = getBaseUrl(inputUrl);
            var url = inputUrl.trim();
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            fetch(url)
            .then(response => response.text())
            .then(data => {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(data, 'text/html');
                var links = htmlDoc.querySelectorAll('a[href]');
                var result = '';
                links.forEach(link => {
                    var href = link.getAttribute('href');
                    if (href && !href.startsWith('#')) {
                        if (href.startsWith('/')) {
                            href = baseUrl + href;
                        }
                        result += href + '\n';
                    }
                });
                document.getElementById('result').innerText = result;
            })
            .catch(error => {
                document.getElementById('result').innerText = 'Error: ' + error.message;
            });
        }

        function getBaseUrl(url) {
            var parser = document.createElement('a');
            parser.href = url;
            return parser.protocol + '//' + parser.hostname;
        }