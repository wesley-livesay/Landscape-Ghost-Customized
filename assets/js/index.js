/**
 * Main JS file for Landscape behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function landscapeFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        landscapeFullImg();
        $(window).smartresize(landscapeFullImg);

    });

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

$("#search-field").ghostHunter({
    results: "#results",
    onKeyUp: true,
    zeroResultsInfo: false,
    dateFormat: "DD MMM YYYY",
    onComplete: function () {
        if (results.childElementCount > 1)
        {
            HidePosts();
        } else {
            ShowPosts();
        }
    },
    info_template: '<p class="search-meta">Number of posts found: {{amount}}</p>',
    result_template:
        '<main class="content" role="main">\
        <article class="post">\
        <header class="post-header"> \
            <h2 class="post-title"><a href="{{link}}">{{title}}</a></h2>\
            <span class="post-meta"><time datetime="{{pubDate format="YYYY-MM-DD"}}">{{pubDate}}</time> {{category}}</span>\
         </header>\
        <section class="post-excerpt">\
            <p>{{excerpt}}...</p>\
        </section>\
    </article></main>'
});

function HidePosts() {
    $("#postlist").hide();
}

function ShowPosts() {
    $("#postlist").show();
}

function GetCategories(post) {
    var CatString = 'on ';
    var formattedtag;
    $.each(post.find('category'),
        function (intVal, currentElement)
        {
            formattedtag = currentElement.textContent.toLowerCase().replace(" ", "-");
            if (intVal < post.find('category').length - 1)
            {
                CatString += "<a href='/tag/" + formattedtag + "'>" + currentElement.textContent + "</a>, "
            } else {
                CatString += "<a href='/tag/" + formattedtag + "'>" + currentElement.textContent + "</a>"
            }
        });

    return CatString;
}

function GetFormattedDate(pubDate, dateformat) {
    var formatteddate = moment(pubDate);
    formatteddate = formatteddate.format(dateformat);
    return formatteddate;
}