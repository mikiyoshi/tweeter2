/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //
  // special text escape
  //
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const backupArr = [];
  const renderTweets = function (tweets) {
    if (backupArr.length === 1) {
      for (let obj of tweets) {
        let tweet = createTweetElement(obj);
        $('.messageBox').append(tweet);
      }
    } else {
      const latestOne = [backupArr[backupArr.length - 1][0]];
      for (let obj of latestOne) {
        let tweet = createTweetElement(obj);
        $('.messageBox').prepend(tweet);
      }
    }
  };

  //
  // tweet element contents
  //
  const createTweetElement = function (tweet) {
    let $tweet = $(`
          <div class="userCard">
            <div class="userCardBody">
              <div class="userCardHeader">
                <div class="userIcon">
                  <img src="${tweet.user.avatars}" />
                </div>
                <div class="userName">${tweet.user.name}</div>
                <div class="userId">${tweet.user.handle}</div>
              </div>
              <div class="userCardMain">
                <div class="userMessage">${escape(tweet.content.text)}</div>
              </div>
              <div class="userCardFooter">
                <div class="userDate">
                  <span class="userDays">${timeago.format(
                    tweet.created_at
                  )}</span>
                </div>

                <div class="userSocial">
                  <ul>
                  <li>
                    <a class="flag" href="javascript:void(0);"><i class="fas fa-flag"></i></a>
                  </li>
                  <li>
                    <a class="retweet" href="javascript:void(0);"><i class="fas fa-retweet"></i></a>
                  </li>
                  <li>
                    <a class="heart" href="javascript:void(0);"><i class="fas fa-heart"></i></a>
                  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  `);
    return $tweet;
  };
  //
  // renderTweets(data);
  //
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' }).then(function (jsonData) {
      const newOrder = jsonData.reverse();
      backupArr.push(newOrder);
      renderTweets(newOrder);
    });
  };
  loadTweets();

  //
  // submit function and error message
  //
  $('form').submit(function (event) {
    event.preventDefault();
    const str = $('form').serialize();
    if ($('#tweet-text').val() === '') {
      $('form')
        .children('#resultPost')
        .addClass('alert fas fa-exclamation-triangle')
        .text(" You can't TWEET empty message")
        .show();
    } else if ($('#tweet-text').val().length > 140) {
      $('form')
        .children('#resultPost')
        .addClass('alert fas fa-exclamation-triangle')
        .text("You can't TWEET over 140 text message")
        .show();
    } else if ($('#tweet-text').val().length <= 140) {
      $('#tweet-text').change(function () {
        $('form')
          .children('#resultPost')
          .addClass('alert fas fa-exclamation-triangle')
          .text('Please click TWEET button')
          .show();
      });
      $.post(
        '/tweets', // url
        str // data to be submit
      ).then(function () {
        loadTweets(str);
      });
      $('#tweet-text').val('');
    }
  });
  //
  // social button on / off
  //
  let socialBtns = ['flag', 'retweet', 'heart'];
  for (socialBtn of socialBtns) {
    $(`.${socialBtn}`).on('click', function (event) {
      $(this).toggleClass('active');
      console.log('click');
      console.log(event);
    });
  }
  $('a[href^="#"]').click(function () {
    var adjust = -130;
    var speed = 400;
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top + adjust;
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });
  //
  // scroll page function form footer
  //
  let pagetop = $('#page_top');
  pagetop.hide();

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
});
