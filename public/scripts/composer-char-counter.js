$(document).ready(function () {
  // --- our code goes here ---

  //
  // input tweet conuter
  //
  const $countUpdate = $('#count-update');
  const $tweetText = $('#tweet-text');

  // text area
  const $button = $('#update-button');
  // submit

  $tweetText.on('input', function () {
    const tweetCount = $tweetText.val().length;
    if (tweetCount >= 140) {
      const $findCounter = $(this)
        .siblings('.tweetCounter')
        .find('#count-update')
        .addClass('red')
        .html(140 - tweetCount);
    } else if (tweetCount < 140) {
      const $findCounter = $(this)
        .siblings('.tweetCounter')
        .find('#count-update')
        .removeClass('red')
        .html(140 - tweetCount);
    }
    const $findCounter = $(this)
      .siblings('.tweetCounter')
      .find('#count-update')
      .html(140 - tweetCount);
  });
  //
  // social button on / off
  //
  let socialBtns = ['flag', 'retweet', 'heart'];
  for (socialBtn of socialBtns) {
    $(`.${socialBtn}`).on('click', function (event) {
      $(this).toggleClass('active');
    });
  }
});
