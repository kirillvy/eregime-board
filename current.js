/* * * * * * * * * * * * * * * *
 * PAGE FUNCTIONALITY CHANGES  *
 * * * * * * * * * * * * * * * */

//hides forums on the front page 
function hideForums() {
  if (typeof hideForumID === 'object' && Array.isArray(hideForumID)) {
    hideForumID.forEach(function (element) {
      $('#forum-' + element).next().next('tr:has(td.c_subforum)').hide();
      $('#forum-' + element + ' td.c_mark').attr('rowspan', '2');
    });
  }
}

//changes the last post format for forums
function changeLastTopic() {
  $('.c_last:contains(", By")').each(function () {
    $(this).html($(this).html().replace(/, By/g, '<br>In: ' + $(this).find('.c_last-title:first-child').prop('outerHTML') + '<br>By:'));
  });
  $('.c_last-title:first-child').remove();
}

//changes the last post format for topics
function changeLastPost() {
  $('.row1:has(.c_cat-lastpost), .row2:has(.c_cat-lastpost)').each(function () {
    $(this).find('.description').before($(this).find('.cat-topicpages'));
    $(this).children('.c_cat-lastpost').html($(this).children('.c_cat-lastpost').html().replace(/Last Post By/g,
      '<strong><a href="' + $(this).find('.c_cat-title a:first-child').attr('href') + '" title="Last Post">Last Post By</a></strong>'));
    $(this).find('.c_cat-title>a').attr('href', $(this).find('.c_cat-title>a').attr('href') + '1/');
  });
}

//moves quote button from the footer to the header
function moveQuoteButton() {
  $('[id*=post-]').each(function () {
    $(this).find('.right').append($(this).next().next().next().find('.right').children());
  });

}

//reorganizes private messages and puts messages inside message header table
function reorganizePM() {
  $('#pm_settings li:first-child').append($('#pm_folders'));
  $('#pm_viewer tbody').append('<tr><td id="inserter" colspan="4"></tr></td>')
  $('#inserter').append($('#conversation'));
}

//opens a new window with emoticons instead of default dropdown window, prevents default behavior
$("#emot_end").click(function () {
  var htmlHead = '<!DOCTYPE html> <meta charset=\"utf-8\"/> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <title>Emoticons ;o</title> <script type=\"text/javascript\" src=\"http://b3.ifrm.com/static/jq171.js?z=4\"><\/script> <style>tr{display: inline-grid; color: #ffffff;}img{cursor: pointer;}div{background-color: tomato; color: #ffffff; position: fixed; right: 0px; top: 0px; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; font-size: 1.5em; opacity: 0.8; margin: 0; cursor: pointer; line-height: 1.5em; padding: 0 6px; }div:hover{opacity:0.95;}</style> <div class=\"close\" onclick=\"window.close()\">&#10006;</div>';
  var htmlFoot = '<script>function insert_emot(text){var textarea=opener.document.getElementById(\"c_post-text\"); text=\" \" + text + \" \"; textarea.value=textarea.value + text;}$(\"img\").click(function(){insert_emot($(this).attr(\"alt\"));}) <\/script>';
  $.get("../keys", function ($txt) {
    $(this).attr('target', '_blank');
    var emotWindow = window.open('', 'emotWindow', "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=1024,height=768");
    emotWindow.document.write(htmlHead + $txt + htmlFoot);
    $("img", emotWindow.document).click(function () {
      emot($(this).attr("title"));
    });
  });
})

function allEmots() {
  return;
}

//saves scroll position
function saveScroll() {
  stateData = {
    scrollTop: $(window).scrollTop()
  };
  window.history.replaceState(stateData, null, window.location.href);
}

/* * * * * * * * * * * * * * * *
 * PAGE LOAD BEHAVIOR CHANGES  *
 * * * * * * * * * * * * * * * */

//checks page url and runs functions above
if ($(location).is('[href*=/index/]')) {
  hideForums();
}
if ($(location).is('[href*=/forum/], [href*=/index/]')) {
  changeLastTopic();
}
if ($(location).is('[href*=/forum/]')) {
  changeLastPost();
}
if ($(location).is('[href*=/topic/]')) {
  moveQuoteButton();
}
if ($(location).is('[href*=/msg/]')) { //check if the URL is an inbox url
  reorganizePM(); // re-organizes the pm page
} //

//fades in on open and scrolls to position
function openPage() {
  mloader = false;
  $('.loader').fadeOut("fast");
  $("#main, #foot_wrap, #copyright").fadeIn("fast", function () {
    if (history.state !== null) {
      $(window).scrollTop(history.state.scrollTop);
    } else if (newTheme && location.hash.length > 1) {
      var moffset = 95;
      if ($(window).width() < 426) {
        moffset = 300;
      }
      $(window).scrollTop($("[name=" + location.hash.substr(1) + "]").first().offset().top - moffset);
    }
  });
}

//loads page
$(function () {
  openPage();
});

/* * * * * * * * * * * * * * * *
 * PAGE LEAVE BEHAVIOR CHANGES *
 * * * * * * * * * * * * * * * */

//fades out on leave
function closePage() {
  $("#main, #foot_wrap, #copyright").fadeOut("fast");
}

//saves scroll position before leaving (if not already saved)
$(window).on('beforeunload ', function () {
  saveScroll();
});

//prevents fade if user opens a new window or tab (win/mac)
var newWin = false;
$(document).keydown(function (event) {
  if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
    newWin = true;
    $(document).keyup(function (event) {
      if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
        newWin = false;
      }
    });
  }

});

$(document).mousedown(function (event) {
  if (event.which == "3") {
    newWin = true;
    $(document).mousedown(function (event) {
      newWin = false;
    })
  }
});


//fades page on click
$("a, :submit").click(function () {
  if ($(this).is('[href*=' + $(location).prop("hostname") + ']:not([href*=#], [id*=preview], [target=_blank])') && newWin == false) {
    closePage();
    window.setTimeout(function () {
      $('.loader').fadeIn(300);
    }, 900);
  }
});

/* * * * * * * * * * * * * * * * * *
 * SPECIALS/LIMITED TIME FUNCTIONS *
 * * * * * * * * * * * * * * * * * */

//april fools easter egg

var a1 = new Date();
if (a1.getDate() == 1 && a1.getMonth() == 3) {
  $('body').append('<img class="mouselogo" src="http://b2.ifrm.com/10755/76/0/a322065/avatar-322065.gif" alt="eregime"><div id="a1"><div>COPY DEEZ NUTZ</div></div>');
  $(document).keydown(function (event) {
    if (event.which == "67" && event.ctrlKey) {
      $("#a1").fadeIn("fast");
      $(document).keyup(function (event) {
        $("#a1").fadeOut("fast");
      });
    }
  });
  $(document).mousemove(function (e) {
    $('.mouselogo').offset({
      left: e.pageX + 10,
      top: e.pageY + 10
    });
  });
}