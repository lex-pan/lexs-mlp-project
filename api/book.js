async function addToDatabaseOfBooks(data) {
    if (event.key == "Enter") {
        const books = await data   
        console.log(books.items)

        for (let i=0; i < books.items.length; i++){
            const bookInfo = books.items[i].volumeInfo;
            let bookTitle = bookInfo.title;
            bookTitle = bookTitle.replaceAll("'", "")
            const bookAuthor = bookInfo.authors;
            let bookPublisher = bookInfo.publisher;
            if (bookPublisher == undefined) {
                bookPublisher = "Not known"
            }
            bookPublisher = bookPublisher.replaceAll("'", "")
            
            const bookPublishDate = bookInfo.publishedDate;
            const bookPageCount = bookInfo.pageCount;

            let bookRatingsCount = bookInfo.ratingsCount;
            if (bookRatingsCount == undefined) {
                bookRatingsCount = 0;
            }
            
            let bookImage = null;
            if (bookInfo.imageLinks != undefined){
                bookImage = bookInfo.imageLinks.thumbnail;
            } else {
                bookImage = document.createElement('img');
                bookImage.src = "website-images/Image-Not-Available.png";
            }
    
            let bookDescription = bookInfo.description;
            if (bookDescription == undefined) {
                bookDescription = "No description";
            }
            bookDescription = bookDescription.replaceAll("'", "")
    
            let averageRating = bookInfo.averageRating;
            if (averageRating == undefined) {
                averageRating = 0;
            }

            const rawResponse = await fetch('http://localhost:5000/add-to-book-database', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({Title: bookTitle, Author: bookAuthor, Publisher: bookPublisher, 
                PublishDate: bookPublishDate, PageCount:bookPageCount, RatingsCount:bookRatingsCount, 
                Image:bookImage, Description: bookDescription, averageRating: averageRating, publishDate:bookPublishDate})
            });
        }
    }
}

async function renderBookInfo() {
    const getBookTitle = event.target.closest('h3').innerHTML;
    let bookUrl = 'http://localhost:5000/get-book-info?booktitle=' + `${getBookTitle}`; 

    // in nodejs,  in get-book-info,  parse query parameter and get booktile value
    let bookInfo = await fetch(bookUrl, {
        method: 'GET'
    });

    bookInfo = await bookInfo.json()
    displaySingleBook(bookInfo)
}

