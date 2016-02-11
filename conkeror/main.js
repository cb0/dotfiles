//allow for 'contrib' stuff
load_paths.unshift("chrome://conkeror-contrib/content/");

//make session availiable
require("session.js");
//session_dir = /home/mpuchalla/.sessions
//session_save_buffer_access_order = true
//session_auto_save_auto_load = "prompt"

// teach me something whenever I start my browser
homepage = "http://en.wikipedia.org/wiki/Special:Random";

// give me new tabs; open buffers (tabs) in the background
require("new-tabs.js");
require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND; 
clicks_in_new_buffer_button = 1; //  midclick links in new buffers with

// auto completion in the minibuffer
minibuffer_auto_complete_default = true;
url_completion_use_history = true; // should work since bf05c87405
url_completion_use_bookmarks = true;

require("mode-line.js");
// funky icons in the modeline
require("mode-line-buttons.js");
mode_line_mode(true);
mode_line_add_buttons(standard_mode_line_buttons, true);

// we'd like to see the # of buffers being loaded 
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);
// we don't need a clock
//remove_hook("mode_line_hook", mode_line_adder(clock_widget));

//Bind Number Keys to Switch to Buffers 1-10
function define_switch_buffer_key (key, buf_num) {
    define_key(default_global_keymap, key,
               function (I) {
                   switch_to_buffer(I.window,
                                    I.window.buffers.get_buffer(buf_num));
               });
}
for (let i = 0; i < 10; ++i) {
    define_switch_buffer_key(String((i+1)%10), i);
}


// some bookmarks
define_webjump("conk",  "http://conkeror.org");
define_webjump("efu",   "http://emacs-fu.blogspot.com");
define_webjump("lkml",  "http://lkml.org");
define_webjump("ew",    "http://emacswiki.org");

define_webjump("so",    "http://stackoverflow.com/search?q=%s");
define_webjump("yts",   "http://www.youtube.com/results?search_query=%s&aq=f");
define_webjump("imbd",  "http://www.imdb.com/find?s=all&q=%s");g
define_webjump("j",    "http://jira.app.activate.de/browse/http://service01.rz1.fer.xres.de/xres_fer/xadmin/%s");
define_webjump("d",   "https://dict.leo.org/ende/index_de.html#/search=%s&searchLoc=0&resultOrder=basic&multiwordShowSingle=on");

editor_shell_command = "emacsclient -c";

// copy url with C-c u
interactive("copy-url",
        "Copy the current buffer's URL to the clipboard",
        function(I) {
            var text = I.window.buffers.current.document.location.href;
            writeToClipboard(text);
            I.window.minibuffer.message("copied: " + text);
        }
);
define_key(default_global_keymap, "C-c u", "copy-url");


// reload conkerorrc with C-c r
interactive("reload-config", "reload conkerorrc",
       function(I) {
          load_rc();
          I.window.minibuffer.message("config reloaded");
       }
);
define_key(default_global_keymap, "C-c r", "reload-config");

define_key(content_buffer_normal_keymap, "C-f", "forward");
define_key(content_buffer_normal_keymap, "C-b", "back");

// make M-f and M-b switch to next and previous buffers
define_key(content_buffer_normal_keymap, "C-page_down", "buffer-next");
define_key(content_buffer_normal_keymap, "C-page_up", "buffer-previous");

// Use M-l to follow link in new background buffer
define_key(default_global_keymap, "M-l", "follow-new-buffer-background");


cwd=get_home_directory(); 
cwd.append("Downloads");

// xkcd add mouse-over text
xkcd_add_title = true;

// No new window for downloads
download_buffer_automatic_open_target=OPEN_NEW_BUFFER_BACKGROUND;

// Make sure I don't close by accident
 add_hook("before_quit_hook",
           function () {
               var w = get_recent_conkeror_window();
               var result = (w == null) ||
                   "y" == (yield w.minibuffer.read_single_character_option(
                       $prompt = "Quit Conkeror? (y/n)",
                       $options = ["y", "n"]));
               yield co_return(result);
           });

can_kill_last_buffer = false;
