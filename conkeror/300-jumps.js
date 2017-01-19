//hacker news
define_webjump("hackernews", "https://news.ycombinator.com/news");

//shaarli bookmark
define_webjump("shaarli","javascript:location.href='https://shaarli.0xcb0.com/?post=' + encodeURIComponent(window.location)+'&title=' + encodeURIComponent(document.title)+'&source=bookmarklet'");

//from http://www.tobez.org/download/readability.html
define_webjump("readability", "javascript:(function(){readStyle='style-athelas';readSize='size-large';readMargin='margin-medium';_readability_script=document.createElement('SCRIPT');_readability_script.type='text/javascript';_readability_script.src='http://www.tobez.org/download/old-readability.js?x='+(Math.random());document.getElementsByTagName('head')[0].appendChild(_readability_script);_readability_css=document.createElement('LINK');_readability_css.rel='stylesheet';_readability_css.href='http://www.tobez.org/download/old-readability.css';_readability_css.type='text/css';_readability_css.media='all';document.getElementsByTagName('head')[0].appendChild(_readability_css);_readability_print_css=document.createElement('LINK');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://www.tobez.org/download/old-readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')[0].appendChild(_readability_print_css);})();");
