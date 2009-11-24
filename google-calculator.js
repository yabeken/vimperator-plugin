let PLUGIN_INFO = 
<VimperatorPlugin>
    <name>{NAME}</name>
    <description>calculate with Google Sear	ch feature</description>
    <description lang="ja">Google の特殊な検索を用いた計算を行う</description>
    <author mail="yabeken3@gmail.com">yabeken</author>
    <license document="http://www.opensource.org/licenses/bsd-license.php">New BSD License</license>
    <version>0.10</version>
    <minVersion>2.0pre</minVersion>
    <maxVersion>2.0pre</maxVersion>
    <updateURL>http://github.com/yabeken/vimperator-plugin/blob/master/google-calculator.js</updateURL>
    <detail><![CDATA[
== USAGE ==
:gcalc <EXPRESSION>
  calculate expression with google search

:gcalc! <EXPRESSION>
  calculate expression and copy the result to clipboard

== EXAMPLE ==
:gcalc 1 * 2
[Google Calculator] 1 * 2 = 2

:gcalc 0xFF in decimal
[Google Calculator] 0xFF = 255

:gcalc 1坪 m^2
[Google Calculator] 1坪 (メートル^2) = 3.30578512 m^2

:gcalc 100円 ドル
[Google Calculator] 100円 = 1 米ドル
]]></detail>
</VimperatorPlugin>;

(function(){
commands.addUserCommand(['gcalc'],
	'Google Calculator',
	function (args,cp) {
		try{
			var exp = args.string.replace(/\u3000/," ").trim();
			if(exp.length < 3) return;
			if(exp.split(" ").length == 2){
				exp = exp.replace(" "," in ");
			}
			var xhr = new XMLHttpRequest();
			xhr.open('GET','http://www.google.co.jp/search?q=' + encodeURIComponent(exp),false);
			xhr.send(null);
			if(xhr.status != 200){
				throw "Failed to fetch result from 'http://www.google.co.jp/search'";
			}
			var html = (function(htmlstr){
				htmlstr = '<html xmlns="http://www.w3.org/1999/xhtml">'+htmlstr+'</html>';
				
				const Cc = Components.classes;
				const Ci = Components.interfaces;

				var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
				var suh = Cc["@mozilla.org/feed-unescapehtml;1"].getService(Ci.nsIScriptableUnescapeHTML);
				var parser = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser);
				
				var xml = <html xmlns="http://www.w3.org/1999/xhtml"></html>;
				var doc = parser.parseFromString(xml.toXMLString(), "application/xml");
				var uri = ios.newURI("http://www.google.co.jp/", null, null);
				var fragment = suh.parseFragment(htmlstr, false, uri, doc.createElement("xml"));
				doc.documentElement.appendChild(fragment);
				return doc;
			})(xhr.responseText);
			var res = html.evaluate('id("res")//h2[@class="r"]/b/text()',html,null,XPathResult.STRING_TYPE,null);
			if(res.stringValue == ""){
				liberator.echo("[Google Calculator] no result for " + args.string);
				return;
			}
			if(cp){
				var m = res.stringValue.match(/= ([^ ]+)/);
				if(m != null){
					util.copyToClipboard(m[1],true);
				}
			}
			liberator.echo("[Google Calculator] " + res.stringValue);
		}catch(ex){
			liberator.echoerr(ex);
		}
    },
    {
    	bang: true
    }
);

})();