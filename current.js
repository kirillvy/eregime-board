function changeLastTopic() {
    $('.c_last:contains(", By")').each(function() {
        $(this).html($(this).html().replace(/, By/g, '<br>In: ' + $(this).find('.c_last-title:first-child').prop('outerHTML') + '<br>By:'));
    });
    $('.c_last-title:first-child').remove();
}

function changeLastPost() {
    $('.row1, .row2').each(function() {
        $(this).children('.c_cat-title').append($(this).find('.cat-topicpages'));
        $(this).children('.c_cat-lastpost').html($(this).children('.c_cat-lastpost').html().replace(/Last Post By/g,
            '<strong><a href="' + $(this).find('.c_cat-title a:first-child').attr('href') + '" title="Last Post">Last Post By</a></strong>'));
        $(this).find('.c_cat-title a:first-child').attr('href', $(this).find('.c_cat-title a:first-child').attr('href') + '1/');
    });
}

function moveQuoteButton() {
    $('[id*=post-]').each(function() {
        $(this).find('.right').append($(this).next().next().next().find('.right').children());
    });
}

function reorganizePM() {
    $('#pm_settings li:first-child').append($('#pm_folders'));
    $('#pm_viewer tbody').append('<tr><td id="inserter" colspan="4"></tr></td>')
    $('#inserter').append($('#conversation'));
}

function pageFunc() {
    $("#main, #foot_wrap, #copyright").fadeIn("fast");
}

function closePage() {
    $("#main, #foot_wrap, #copyright").animate({
        opacity: 0
    }, "fast");
}

function reopenPage() {
    $("#main, #foot_wrap, #copyright").animate({
        opacity: 1
    }, 400);
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
}


$(function() {
    pageFunc();
});

$(window).bind("pageshow", function() {
    if ($('#main').css('opacity') == 0) {
        reopenPage();
    }
});

$(window).bind("onbeforeunload", function() {
    closePage();
});


$("a, :submit").click(function() {
    if ($(this).is('[href*=http://eregime.org], :not([href*=#], [id*=preview], [target=_blank])') && newWin == false) {
        closePage();
    }
});

var newWin = false;

$("#emot_end").click(function() {
    var htmlHead = '<!DOCTYPE html> <meta charset=\"utf-8\"/> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <title>Emoticons ;o</title> <script type=\"text/javascript\" src=\"http://b3.ifrm.com/static/jq171.js?z=4\"><\/script> <style>tr{display: inline-grid; color: #ffffff;}img{cursor: pointer;}div{background-color: tomato; color: #ffffff; position: fixed; right: 0px; top: 0px; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; font-size: 1.5em; opacity: 0.8; margin: 0; cursor: pointer; line-height: 1.5em; padding: 0 6px; }div:hover{opacity:0.95;}</style> <div class=\"close\" onclick=\"window.close()\">&#10006;</div>';
    var htmlFoot = '<script>function insert_emot(text){var textarea=opener.document.getElementById(\"c_post-text\"); text=\" \" + text + \" \"; textarea.value=textarea.value + text;}$(\"img\").click(function(){insert_emot($(this).attr(\"alt\"));}) <\/script>';
    $.get("../keys", function($txt) {
        $(this).attr('target', '_blank');
        var emotWindow = window.open('', 'emotWindow', "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=1024,height=768");
        emotWindow.document.write(htmlHead + $txt + htmlFoot);
        $("img", emotWindow.document).click(function() { emot($(this).attr("title")); });
    });
})

$(document).keydown(function(event) {
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
        newWin = true;
        $(document).keyup(function(event) {
            if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
                newWin = false;
            }
        });
    }

});

$(document).mousedown(function(event) {
    if (event.which == "3") {
        newWin = true;
        $(document).mousedown(function(event) {
            newWin = false;
        })
    }
});

var a1 = new Date();
if (a1.getDate() == 1 && a1.getMonth() == 3) {
    $('body').append('<img class="logo" src="http://b2.ifrm.com/10755/76/0/a322065/avatar-322065.gif" alt="eregime"><div id="a1"><div>COPY DEEZ NUTZ</div></div>');
    $(document).keydown(function(event) {
        if (event.which == "67" && event.ctrlKey) {
            $("#a1").fadeIn("fast");
            $(document).keyup(function(event) {
                $("#a1").fadeOut("fast");
            });
        }
    });
    $(document).mousemove(function(e) {
        $('.logo').offset({
            left: e.pageX + 10,
            top: e.pageY + 10
        });
    });
}



function allEmots() {
    return;
}