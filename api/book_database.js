const get_database_info = require('./config');
const book_database = get_database_info.pool

async function checkIfUniqueBook(bookTitle){

    try {
        const unique = await book_database.query("SELECT * FROM books WHERE book_title = '" + bookTitle + "';")
        if (unique.rows[0] == undefined) {
            return "Unique Book"
        } else {
            return "Book already exists"
        }

    } catch {
        console.log("request went wrong")
        return "Exception"
    }
}


//const addBook = async () => {
//    const x = await queryBookInfoFromDB('Harry Potter and the Cursed Child');
//    console.log(x)
//};

//addBook()

async function addBookToDatabase(bookData) {
    const uniqueBook = await checkIfUniqueBook(bookData.Title) 
    if (uniqueBook == "Unique Book") {
        console.log(bookData)
        console.log("INSERT INTO books (book_title, book_authors, book_publisher, book_page_count, " + 
        "book_rating, book_image, book_description, book_rating_count, book_publish_date)" +  " VALUES ('" + bookData.Title + "', '" 
        + bookData.Author + "', '"+ bookData.Publisher + "', '" + bookData.PageCount + "', '" + bookData.averageRating + "', '"
        + bookData.Image + "', '" + bookData.Description + "', '" + bookData.RatingsCount + "' + '" + bookData.PublishDate + "' );")
        book_database.query("INSERT INTO books (book_title, book_authors, book_publisher, book_page_count, " + 
        "book_rating, book_image, book_description, book_rating_count, book_publish_date)" +  " VALUES ('" + bookData.Title + "', '" 
        + bookData.Author + "', '"+ bookData.Publisher + "', '" + bookData.PageCount + "', '" + bookData.averageRating + "', '"
        + bookData.Image + "', '" + bookData.Description + "', '" + bookData.RatingsCount + "', '" + bookData.PublishDate + "' );")
    }    
}

async function queryBookInfoFromDB(bookTitle) {
    try {
        const bookInfo = await book_database.query("SELECT * FROM books WHERE book_title = '" + bookTitle + "';");
        return bookInfo.rows[0]
    } catch {
        return "Database query has failed";
    }
}

module.exports = {
    checkIfUniqueBook,
    addBookToDatabase,
    queryBookInfoFromDB
}