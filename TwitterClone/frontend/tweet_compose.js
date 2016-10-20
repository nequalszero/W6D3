class TweetCompose {
  constructor(el) {
    this.$el = $(el);

    this.$el.on("submit", e => this.submit(e));
  }

  submit(e) {
    e.preventDefault();

    let newTweet = this.$el.serializeJSON();

    $.ajax({
      method: "POST",
      url: "/tweets",
      dataType: "json",
      data: newTweet,
      success: (tweet) => {
        this.renderResults(tweet);
      }
    });
  }

  renderResults(tweet) {

  }

}


module.exports = TweetCompose;
