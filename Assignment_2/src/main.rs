// Enum
enum Publication {
    Book(Book),
    Magazine(Magazine),
}

// Book struct
struct Book {
    title: String,
    author: String,
    page_count: u32,
}

// Magazine Struct
struct Magazine {
    title: String,
    issue: u32,
    topic: String,
}

//print book format
fn print_book_format(book: &Book) {
    println!("Book: {} Author: {}, {} Page:", book.title, book.author, book.page_count);
}

//print magazine format
fn print_magazine_format(magazine: &Magazine) {
    println!("Title: {} - Issue: {}, Topic: {}", magazine.title, magazine.issue, magazine.topic);
}

// publications
fn print_publications(publications: Vec<Publication>) {
    for publication in publications {
        match publication {
            Publication::Book(book) => print_book_format(&book),
            Publication::Magazine(magazine) => print_magazine_format(&magazine),
        }
    }
}

fn main() {
    // Create books and magazine samples
    let book1 = Book {
        title: String::from("Rust Programming"),
        author: String::from("Bedirhan Kural"),
        page_count: 200,
    };

    let magazine1 = Magazine {
        title: String::from("Tech Magazine"),
        issue: 45,
        topic: String::from("Rust Programming"),
    };

    // create Vec<Publication> 
    let publications = vec![Publication::Book(book1), Publication::Magazine(magazine1)];


    print_publications(publications);
}
