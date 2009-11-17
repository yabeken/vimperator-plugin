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
<description>twitter.js gateway for hatena bookmark feature</description>
<version>1.0.1</version>
<updateURL>http://github.com/yabeken/vimperator-plugin/blob/master/hatena-twitter-bookmark.js</updateURL>
<author>yabeken</author>
<license>Creative Commons</license>
<detail><![CDATA[
:hatwib bookmark-comment
  execute "twitter bookmark-comment B! %URL%"
]]></detail>
</VimperatorPlugin>;

(function(){
    liberator.modules.commands.addUserCommand(
    		["hatwib"],
    		"twitter.js gateway  hatena bookmark feature",
    		function(arg){
    			liberator.execute("twitter " + arg.string + " B! %URL%");
    		}
    	);
})();