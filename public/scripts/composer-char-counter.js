$(document).ready(function () {
  // --- our code goes here ---
  const $countUpdate = $('#count-update');
  // number dispay 140 now
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
});
