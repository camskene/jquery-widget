/*
 * jQuery Widget plugin
 * 
 * Author: Cameron Skene
 * Description: List YouTube uploads from specified profile.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
    
    jQuery.fn.widget = function(options) {
        
        elem = $(this);
                  
        defaults = {
            profile: "",
            max: "10"
        };
        
        o = $.extend(defaults, options);
                
        return this.each(function() {
            
            $.getJSON('http://gdata.youtube.com/feeds/users/'+o.profile+'/uploads?alt=json&max-results='+o.max, function(data){
                                                
                var entries = data.feed.entry;
                
                // Title with and link
                var author = data.feed.author[0].name.$t;
                
                var uri = data.feed.link[1].href;
                
                var html = [];
                
                html.push('<h3><a href="'+uri+'">'+author+'</a></h3>');
                
                html.push("<ol>")

                $.each(entries, function(index, value) {
                    var entry = entries[index],
                    thumb = entry.media$group.media$thumbnail[2].url,
                    thumbW = entry.media$group.media$thumbnail[2].width,
                    thumbH = entry.media$group.media$thumbnail[2].height,
                    title = entry.media$group.media$title.$t,
                    vidURL = entry.link[0].href;
                
                    html.push("<li>");
                    html.push("<h4 class='title'>")
                    html.push(title);
                    html.push("</h4>")
                    html.push('<a href="'+vidURL+'"><img src="'+thumb+'" width="'+thumbW+'" height="'+thumbH+'" alt=""/></a>')
                
                });
                
                html.push("</ol>");
                
                elem.append(html.join(''));
                
            })
        })
    };
    
})(jQuery);