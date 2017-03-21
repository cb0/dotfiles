//hacker news
define_webjump("hackernews", "https://news.ycombinator.com/news");

//shaarli bookmark
define_webjump("shaarli","javascript:location.href='https://shaarli.0xcb0.com/?post=' + encodeURIComponent(window.location)+'&title=' + encodeURIComponent(document.title)+'&source=bookmarklet'");

//from http://www.tobez.org/download/readability.html
define_webjump("readability", "javascript:(function(){readStyle='style-athelas';readSize='size-large';readMargin='margin-medium';_readability_script=document.createElement('SCRIPT');_readability_script.type='text/javascript';_readability_script.src='http://www.tobez.org/download/old-readability.js?x='+(Math.random());document.getElementsByTagName('head')[0].appendChild(_readability_script);_readability_css=document.createElement('LINK');_readability_css.rel='stylesheet';_readability_css.href='http://www.tobez.org/download/old-readability.css';_readability_css.type='text/css';_readability_css.media='all';document.getElementsByTagName('head')[0].appendChild(_readability_css);_readability_print_css=document.createElement('LINK');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://www.tobez.org/download/old-readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')[0].appendChild(_readability_print_css);})();");

define_webjump("q", "javascript:(function(){function%20loadScript()%7Bif(console%20%26%26%20typeof(console.log)===%27function%27)%7Bconsole.log(%27SpritzletInit%20v1.1.8%20-%20Loading%20https://sdk.spritzinc.com/bookmarklet/latest/js/SpritzletOuter.js%27);}var%20script=document.createElement(%27script%27);script.setAttribute(%27type%27,%27text/javascript%27);script.setAttribute(%27charset%27,%27UTF-8%27);script.setAttribute(%27async%27,%27true%27);script.setAttribute(%27src%27,%27https://sdk.spritzinc.com/bookmarklet/latest/js/SpritzletOuter.js%3F%27+(new%20Date().getTime()).toString().substring(0,7));document.documentElement.appendChild(script);setTimeout(function()%7Bif(Spritzlet.timedOut===true)%7Balert(%22Sorry,%20it%20looks%20like%20this%20site%20doesn%27t%20allow%20bookmarklets%20to%20be%20run%20or%20Spritz%20servers%20aren%27t%20responding.%22);}},3000);script.onload=function()%7BSpritzlet.timedOut=false;var%20rs=script.readyState;if(!rs%20||%20rs===%27loaded%27%20||%20rs===%27complete%27)%7Bscript.onload=script.onreadystatechange=null;Spritzlet.init();}};}if(window.Spritzlet)%7BSpritzlet.activate();}else%7Bwindow.Spritzlet=window.Spritzlet%20||%7B};window.Spritzlet=%7Borigin:window.location.protocol+%27//%27+window.location.host,loaderVersion:1.1,timedOut:true};loadScript();}})();");

//search php.net for function definitions
define_webjump("php", "http://php.net/search.php?%s");

//translate from english
define_webjump("trans", "http://translate.google.com/translate_t#auto|de|%s");

// selection searches
function create_selection_search(webjump, key) {
    interactive(webjump+"-selection-search",
                "Search " + webjump + " with selection contents",
                "find-url-new-buffer",
                $browser_object = function (I) {
                    return webjump + " " + I.buffer.top_frame.getSelection();});
    define_key(content_buffer_normal_keymap, key.toUpperCase(), webjump + "-selection-search");

    interactive("prompted-"+webjump+"-search", null,
                function (I) {
                    var term = yield I.minibuffer.read_url($prompt = "Search "+webjump+":",
                                                           $initial_value = webjump+" ",
                                                           $select = false);
                    browser_object_follow(I.buffer, FOLLOW_DEFAULT, term);
                });
    define_key(content_buffer_normal_keymap, key, "prompted-" + webjump + "-search");
}
// examples
// create_selection_search("g","l");
create_selection_search("wikipedia","w");
// create_selection_search("php","p");
// create_selection_search("dictionary","d");
// create_selection_search("myspace","y");
// create_selection_search("amazon","a");
// create_selection_search("youtube","u");


// magick-options is a webjump for imagemagick command line options.
//
// magick-options caches its completions in a preference.  To clear the cache
// and force magick-options to fetch the information anew, just do:
//
//   clear_pref('conkeror.webjump.magick-options.cache');
//

chickadee_completer = function() {
    completer.call(this);
}

chickadee_completer.prototype = {
    __proto__: completer.prototype,
    constructor: chickadee_completer,
    toString: function () "#<chickadee_completer>",
    complete: function (input, pos) {
        var completions = [];
        var content = yield send_http_request(
            load_spec({uri: "http://api.call-cc.org/cdoc/ajax/prefix?q="+
                       encodeURIComponent(input)}));
        if (content.responseText) {
            var parser = Cc["@mozilla.org/xmlextras/domparser;1"]
                .createInstance(Ci.nsIDOMParser);
            var doc = parser.parseFromString(content.responseText, "text/xml");
            var res = doc.getElementsByTagName("li")
            for (let i = 0, n = res.length; i < n; ++i) {
                completions.push(res[i].textContent);
            }
        }

        yield co_return((new prefix_completer($completions = completions)).complete(input, pos));
    }
};

define_webjump("chickadee",
    "http://api.call-cc.org/cdoc?q=%s&query-name=Lookup",
    $alternative = "http://api.call-cc.org/doc/",
    $completer = new chickadee_completer());

//php completer
php_completer = function() {
    completer.call(this);
}

php_completer.prototype = {
    __proto__: completer.prototype,
    constructor: php_completer,
    toString: function () "#<php_completer>",
    complete: function (input, pos) {
        var completions = [];
        var content = yield send_http_request(
            load_spec({uri: "http://php.net/manual-lookup.php?scope=quickref&pattern=load?q="+
                       encodeURIComponent(input)}));
        if (content.responseText) {
            var parser = Cc["@mozilla.org/xmlextras/domparser;1"]
                .createInstance(Ci.nsIDOMParser);
            var doc = parser.parseFromString(content.responseText, "text/xml");
            var res = doc.getElementsByTagName("b#quickref_functions");
            // var res = doc.querySelectorAll("#quickref_functions li a b")
            for (let i = 0, n = res.length; i < n; ++i) {
                completions.push(res[i].textContent);
            }
        }

        yield co_return((new prefix_completer($completions = completions)).complete(input, pos));
    }
};

define_webjump("tphp",
    "http://php.net/manual/en/function.%s.php",
    $alternative = "http://php.net/manual/en/",
    $completer = new php_completer());
