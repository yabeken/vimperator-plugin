// 
// A gateway to twitter.js for hatena twitter bookmark feature
// 
// USAGE:
//  :hatwib bookmark-comment
//    execute :twitter bookmark-comment B! %URL%
//  :hatwib [vimp<TAB>
//    list completions starts with "vimp" from your tags 
//
// INSTALL:
//    1. Install Hatena Bookmark Addon for Firefox.
//    https://addons.mozilla.org/ja/firefox/addon/11285
// 
//    2. Install twitter.js
//    http://coderepos.org/share/browser/lang/javascript/vimperator-plugins/trunk/twitter.js
//
//    3. Copy following codes to your .vimperatorrc
//    http://vimperator.g.hatena.ne.jp/teramako/20091117/1258474425
js <<EOM
liberator.modules.hateb_tags = (function(){
  let self = {
    get tags() hBookmark.model("Tag").findDistinctTags(),
    completer: function hatenaBookmarkTagsCompleter(context, args){
      let arg = context.filter;
      let matches = arg.match(/\[([^\]]*)$/);
      if (matches){
        context.offset += matches.index;
        context.filter = matches[0];
        context.title = ["Tag","Tag(count)"];
        context.completions = self.tags.map(function(tag) ["["+tag.name+"]", tag.name + "("+tag.count+")"]);
      }
    }
  };
  return self;
})();
EOM
command hatwib -nargs=* -complete=custom,liberator.modules.hateb_tags.completer twitter <args> B! %URL%
