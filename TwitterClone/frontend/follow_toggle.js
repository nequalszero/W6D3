class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = (this.$el.data("initial-follow-state") || options.followState);

    this.render();
    this.$el.on("click", e => this.handleClick(e));
    }

  render() {
    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "following") {
      this.$el.text("Following...");
      this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowing") {
      this.$el.text("Unfollowing...");
      this.$el.prop("disabled", true);
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();

      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow.json`,
        success: () => {
          this.followState = "followed";
          this.render();
        }
      });
    } else {
      this.followState = "unfollowing";
      this.render();

      $.ajax({
        method: "DELETE",
        url: `/users/${this.userId}/follow.json`,
        success: () => {
          this.followState = "unfollowed";
          this.render();
        }
      });
    }
  }
}

module.exports = FollowToggle;
