class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.input = this.$el.find("input");
    this.result = this.$el.find(".users");

    this.input.on("keyup", e => this.handleInput(e));
  }

  handleInput(e) {
    $.ajax({
      method: "GET",
      url: "/users/search",
      dataType: "json",
      data: {
        query: this.input.val()
      },
      success: (users) => {
        this.renderResults(users);
      }
    });
  }

  renderResults(users) {
    this.result.empty();

    users.forEach( (user) => {
      let $li = $(`<li><a href="/users/${user.id}">${user.username}</a></li>`);
      this.result.append($li);
    });
  }
}

module.exports = UsersSearch;
