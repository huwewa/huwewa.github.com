// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js 
(function ($) {
    var $comments = $('.js-comments');
  
    $('.js-form').submit(function () {
      var form = this;
  
      $(form).addClass('disabled');

      $("#comment-form-submit").html(
        '发表中•••'
        ).addClass("btn--disabled");
  
      $.ajax({
        type: $(this).attr('method'),
        url:  $(this).attr('action'),
        data: $(this).serialize(),
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          // showModal('Comment submitted', '谢谢! 您的留言 <a href="https://github.com/huwewa/huwewa.github.com/pulls">正在处理中</a>。 处理完毕后将会显示。');
          $("#comment-form-submit").html('已发表').addClass("btn--disabled");
          $("#comment-form .js-notice")
            .removeClass("danger")
            .addClass("success");          
          showAlert(
            '<strong>谢谢！</strong>您的留言 <a href="https://github.com/huwewa/huwewa.github.com/pulls">正在处理中</a>。 处理完毕后将会显示。'
          );
          $(form).removeClass('disabled');
        },
        error: function (err) {
          console.log(err);
          // showModal('Error', '抱歉，您的评论提交时出错了！');
          $("#comment-form-submit").html("发表").removeClass("btn--disabled");
          $("#comment-form .js-notice")
            .removeClass("success")
            .addClass("danger");          
          showAlert(
            '<strong>抱歉，您的评论提交时出错了！</strong>请确保已填必填字段，然后重试！'
          );
          $(form).removeClass('disabled');
        }
      });
      return false;
    });
  
    $('.js-close-modal').click(function () {
      $('body').removeClass('show-modal');
    });
  
    // function showModal(title, message) {
    //   $('.js-modal-title').text(title);
    //   $('.js-modal-text').html(message);
    //   $('body').addClass('show-modal');
    // }
    function showAlert(message) {
      $("#comment-form .js-notice").removeClass("hidden");
      $("#comment-form .js-notice-text").html(message);
    }  
  })(jQuery);
  
  // Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
  // modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
  // Released under the GNU General Public License - https://wordpress.org/about/gpl/
  // addComment.moveForm is called from comment.html when the reply link is clicked.
  var addComment = {
    moveForm: function( commId, parentId, respondId, postId ) {
      var div, element, style, cssHidden,
      t           = this,                    //t is the addComment object, with functions moveForm and I, and variable respondId
      comm        = t.I( commId ),                                //whole comment
      respond     = t.I( respondId ),                             //whole new comment form
      cancel      = t.I( 'cancel-comment-reply-link' ),           //whole reply cancel link
      parent      = t.I( 'comment-replying-to' ),                 //a hidden element in the comment
      post        = t.I( 'comment-post-slug' ),                   //null
      commentForm = respond.getElementsByTagName( 'form' )[0];    //the <form> part of the comment_form div
  
      if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
        return;
      }
  
      t.respondId = respondId;
      postId = postId || false;
  
      if ( ! t.I( 'sm-temp-form-div' ) ) {
        div = document.createElement( 'div' );
        div.id = 'sm-temp-form-div';
        div.style.display = 'none';
        respond.parentNode.insertBefore( div, respond ); //create and insert a bookmark div right before comment form
      }
  
      comm.parentNode.insertBefore( respond, comm.nextSibling );  //move the form from the bottom to above the next sibling
      if ( post && postId ) {
        post.value = postId;
      }
      parent.value = parentId;
      cancel.style.display = '';                        //make the cancel link visible
  
      cancel.onclick = function() {
        var t       = addComment,
        temp    = t.I( 'sm-temp-form-div' ),            //temp is the original bookmark
        respond = t.I( t.respondId );                   //respond is the comment form
  
        if ( ! temp || ! respond ) {
          return;
        }
  
        t.I( 'comment-replying-to' ).value = null;      //forget the name of the comment
        temp.parentNode.insertBefore( respond, temp );  //move the comment form to its original location
        temp.parentNode.removeChild( temp );            //remove the bookmark div
        this.style.display = 'none';                    //make the cancel link invisible
        this.onclick = null;                            //retire the onclick handler
        return false;
      };
  
      /*
       * Set initial focus to the first form focusable element.
       * Try/catch used just to avoid errors in IE 7- which return visibility
       * 'inherit' when the visibility value is inherited from an ancestor.
       */
      try {
        for ( var i = 0; i < commentForm.elements.length; i++ ) {
          element = commentForm.elements[i];
          cssHidden = false;
  
          // Modern browsers.
          if ( 'getComputedStyle' in window ) {
            style = window.getComputedStyle( element );
          // IE 8.
          } else if ( document.documentElement.currentStyle ) {
          style = element.currentStyle;
          }
  
        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
          if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
            cssHidden = true;
          }
  
          // Skip form elements that are hidden or disabled.
          if ( 'hidden' === element.type || element.disabled || cssHidden ) {
            continue;
          }
  
          element.focus();
          // Stop after the first focusable element.
          break;
        }
  
      } catch( er ) {}
  
      return false;
    },
  
    I: function( id ) {
      return document.getElementById( id );
    }
  };

// 随机摘录
var quoteData;
var xhrPosts = new XMLHttpRequest();
xhrPosts.open('GET', '/quotes.json', true);
xhrPosts.onreadystatechange = function () {
  if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
    quoteData = JSON.parse(xhrPosts.responseText);
    randomQuotes(relatedPosts(quoteData));
  }
}
xhrPosts.send(null);

function randomPosts(quotes) {
  var used = [];
  var counter = 0;
  var html = '';
  while (counter < 1) {
    var index = Math.floor(Math.random() * quotes.length);
    if (used.indexOf(index) == '-1') {
      html += '<h2>' + quotes[index].content + '</h2>';
      used.push(index);
      counter++;
    }
  }
  document.querySelector('#random-quote').insertAdjacentHTML('beforeend', html);
}