// Vimperator plugin: "post current URL to twitter with hatena bookmark style"
// Last Change: TODO
// License: New BSD License
// Maintainer: Kentaro YABE <yabeken@gmail.com> - http://d.hatena.ne.jp/yabeken
//
// Commands:
//  :hatwib bookmark-comment
//      post "bookmark-comment B! %URL%"

var PLUGIN_INFO =
<VimperatorPlugin>
<name>{NAME}</name>
<description>post current URL to twitter with hatena bookmark style</description>
<version>1.0.0</version>
<updateURL>http://github.com/yabeken/vimperator-plugin/blob/master/hatena-twitter-bookmark.js</updateURL>
<author>yabeken</author>
<license>Creative Commons</license>
<detail><![CDATA[
:hatwib bookmark-comment
  post "bookmark-comment B! CURRENT_URL"
]]></detail>
</VimperatorPlugin>;

(function(){
    liberator.modules.commands.addUserCommand(
    		["hatwib"],
    		"post current URL to twitter by hatena bookmark style",
    		function(arg){
    		    var [username, password] = (function(){
    		        try {
    		            var logins = (Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager)).findLogins({}, "http://twitter.com", "https://twitter.com", null);
    		            if (logins.length)
    		                return [logins[0].username, logins[0].password];
    		            else
    		                throw "Twitter: account not found";
    		        }
    		        catch (ex){
    		            liberator.echoerr(ex);
    		        }
    		    })();
    		    var msg = arg.string + " B! " + liberator.modules.buffer.URL;
    		    var req = new XMLHttpRequest();
    		    req.open("POST", "https://twitter.com/statuses/update.json", false, username, password);
    		    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    		    req.send("source=Vimperator&status="+encodeURIComponent(msg));
    		    liberator.echo("[HaTwiB] " + liberator.modules.buffer.URL + " is bookmarked with comment " + '"' + arg.string + '"');
    		}
    	);
})();