class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.library_of_films = {};
        this.library_of_books = {};

    }

    add_item(item) {
        this.library_of_books.push(item)
    }
}