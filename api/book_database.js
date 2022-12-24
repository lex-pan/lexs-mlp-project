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

const sampleBook = {
    Title: "AYAYA",
    Author: [ 'Philip Nel' ],
    Publisher: 'Continuum',
    PublishDate: '2001-09-26',
    PageCount: 98,
    RatingsCount: 0,
    Image: 'http://books.google.com/books/content?id=_DStn69ZO_kC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    Description: 'Continuum Contemporaries will be a wonderful source of ideas and inspiration for members of book clubs and readings groups, as well as for literature students.The aim of the series is to give readers accessible and informative introductions to 30 of the most popular, most acclaimed, and most influential novels of recent years. A team of contemporary fiction scholars from both sides of the Atlantic has been assembled to provide a thorough and readable analysis of each of the novels in question. The books in the series will all follow the same structure:a biography of the novelist, including other works, influences, and, in some cases, an interview; a full-length study of the novel, drawing out the most important themes and ideas; a summary of how the novel was received upon publication; a summary of how the novel has performed since publication, including film or TV adaptations, literary prizes, etc.; a wide range of suggestions for further reading, including websites and discussion forums; and a list of questions for reading groups to discuss.',
    averageRating: 0
}

//const addBook = async () => {
//    const x = await checkIfUniqueBook('Harry Potter and the Cursed Child');
//    console.log(x)
//};

//addBook()

async function addBookToDatabase(bookData) {
    const uniqueBook = await checkIfUniqueBook(bookData.Title) 
    console.log(uniqueBook)
    if (uniqueBook == "Unique Book") {
        console.log("INSERT INTO books (book_title, book_authors, book_publisher, book_page_count, " + 
        "book_rating, book_image, book_description, book_rating_count)" +  " VALUES ('" + bookData.Title + "', '" 
        + bookData.Author + "', '"+ bookData.Publisher + "', '" + bookData.PageCount + "', '" + bookData.averageRating + "', '"
        + bookData.Image + "', '" + bookData.Description + "', '" + bookData.RatingsCount + "');")
        book_database.query("INSERT INTO books (book_title, book_authors, book_publisher, book_page_count, " + 
        "book_rating, book_image, book_description, book_rating_count)" +  " VALUES ('" + bookData.Title + "', '" 
        + bookData.Author + "', '"+ bookData.Publisher + "', '" + bookData.PageCount + "', '" + bookData.averageRating + "', '"
        + bookData.Image + "', '" + bookData.Description + "', '" + bookData.RatingsCount + "');")
    }    
}


module.exports = {
    checkIfUniqueBook,
    addBookToDatabase
}