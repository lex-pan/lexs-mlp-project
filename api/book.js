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

            const rawResponse = await fetch('http://localhost:5000/add-to-collection', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({Title: bookTitle, Author: bookAuthor, Publisher: bookPublisher, 
                PublishDate: bookPublishDate, PageCount:bookPageCount, RatingsCount:bookRatingsCount, 
                Image:bookImage, Description: bookDescription, averageRating: averageRating})
            });
        }
    }
}

async function renderBookInfo() {
    const getBookTitle = event.target.closest('h3').innerHTML;
    console.log(getBookTitle)

    let bookInfo = await fetch('http://localhost:5000/get-book-info', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookTitle: getBookTitle})
    });

    bookInfo = await bookInfo.json()
    displaySingleBook(bookInfo)
}

/*
    <section id="book-display">
        <img class="book-render-image" src="/images/archeon-eon-art.jpg"></img>

        <div class="book-render-info">
          <div class="website-read-stats">
            <p>Average_rating: 3.5/5</p> 
            <p>members: 1,422,888</p>
            <button class="website-read-stats-button"><h3>Add to collection</h3></button>
          </div>
          <div class="book-stats">
            <p>book_authors: 'Neil Mulholland'</p>
            <p>book_authors: 'Neil Mulholland'</p>
            <p>book_page_count: '338'</p>
            <p>Publish date: April 17, 2004</p>
            <p>book_pseudonyms:</p> 
          </div>
        </div> 

        <textarea class="book-render-description">"In a world dotted with World Entrances to a demon world, demons have invaded humans for centuries. Humanity has united and one of the most ancient sects in the world, the Archean Mountain Sect, has set up an entire education system in the form of Dao Academies and defenses at the World Entrances. Meng Chuan,a young genius, is an expert at the swift saber. Despite his noble heritage, he has one goal—kill all demons. Scarred by demons because of how his mother sacrificed her life for him, he strives to enter Archean Mountain Sect to get the best resources and training."</textarea> 

    </section>
*/

/* 
{
  book_title: 'The Psychology of Harry Potter',
  book_authors: 'Neil Mulholland',
  book_publisher: 'BenBella Books',
  book_page_count: '338',
  book_rating: '3.5',
  book_image: 'http://books.google.com/books/content?id=L18VBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  book_description: 'Harry Potter has provided a portal to the wizarding world for millions of readers, but an examination of Harry, his friends and his enemies will take us on yet another journey: through the psyche of the Muggle (and wizard!) mind. The twists and turns of the series, as well as the psychological depth and complexity of J. K. Rowling’s characters, have kept fans enthralled with and puzzling over the many mysteries that permeate Hogwarts and beyond: • Do the Harry Potter books encourage disobedience? • Why is everyone so fascinated by Professor Lupin? • What exactly will Harry and his friends do when they finally pass those N.E.W.T.s? • Do even wizards live by the ticking of the clock? • Is Harry destined to end up alone? And why did it take Ron and Hermione so long to get together? Now, in The Psychology of Harry Potter, leading psychologists delve into the ultimate Chamber of Secrets, analyzing human mind and motivation by examining the themes and characters that make the Harry Potter books the bestselling fantasy series of all time. Grab a spot on the nearest couch, and settle in for some fresh revelations about our favorite young wizard!',
  book_rating_count: '5'
}
*/