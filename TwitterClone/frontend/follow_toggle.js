class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");

    this.render();
    this.$el.on("click", e => this.handleClick(e));
    }

  render() {
    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else { this.$el.text("Follow!"); }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.followState === "unfollowed") {
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow.json`,
        success: () => {
          this.followState = "followed";
          this.render();
        }
      });
    } else {
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
