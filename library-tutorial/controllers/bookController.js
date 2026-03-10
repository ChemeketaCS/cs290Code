var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

const { body, validationResult } = require("express-validator");

exports.index = async function (req, res) {
  try {
    const [
      book_count,
      book_instance_count,
      book_instance_available_count,
      author_count,
      genre_count,
    ] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

    res.render("index", {
      title: "Local Library Home",
      error: null,
      data: {
        book_count,
        book_instance_count,
        book_instance_available_count,
        author_count,
        genre_count,
      },
    });
  } catch (err) {
    res.render("index", {
      title: "Local Library Home",
      error: err,
      data: {},
    });
  }
};

// Display list of all books.
exports.book_list = async function (req, res, next) {
  try {
    const list_books = await Book.find({}, "title author")
      .sort("title")
      .populate("author")
      .exec();
    res.render("book_list", { title: "Book List", book_list: list_books });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific book.
exports.book_detail = async function (req, res, next) {
  try {
    const [book, book_instance] = await Promise.all([
      Book.findById(req.params.id)
        .populate("author")
        .populate("genre")
        .exec(),
      BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book == null) {
      var err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("book_detail", {
      title: book.title,
      book: book,
      book_instances: book_instance,
    });
  } catch (err) {
    return next(err);
  }
};

// Display book create form on GET.
exports.book_create_get = async function (req, res, next) {
  try {
    const [authors, genres] = await Promise.all([
      Author.find().sort("family_name").exec(),
      Genre.find().sort("name").exec(),
    ]);
    res.render("book_form", {
      title: "Create Book",
      authors: authors,
      genres: genres,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      try {
        const [authors, genres] = await Promise.all([
          Author.find().exec(),
          Genre.find().exec(),
        ]);

        for (let i = 0; i < genres.length; i++) {
          if (book.genre.indexOf(genres[i]._id) > -1) {
            genres[i].checked = "true";
          }
        }

        res.render("book_form", {
          title: "Create Book",
          authors: authors,
          genres: genres,
          book: book,
          errors: errors.array(),
        });
      } catch (err) {
        return next(err);
      }
      return;
    } else {
      // Data from form is valid. Save book.
      try {
        await book.save();
        res.redirect(book.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display book delete form on GET.
exports.book_delete_get = async function (req, res, next) {
  try {
    const [book, book_bookinstances] = await Promise.all([
      Book.findById(req.params.id)
        .populate("author")
        .populate("genre")
        .exec(),
      BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book == null) {
      res.redirect("/catalog/books");
      return;
    }

    res.render("book_delete", {
      title: "Delete Book",
      book: book,
      book_instances: book_bookinstances,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle book delete on POST.
exports.book_delete_post = async function (req, res, next) {
  try {
    await BookInstance.deleteMany({ book: req.body.id }).exec();
    await Book.findByIdAndDelete(req.body.id).exec();
    res.redirect("/catalog/books");
  } catch (err) {
    return next(err);
  }
};

// Display book update form on GET.
exports.book_update_get = async function (req, res, next) {
  try {
    const [book, authors, genres] = await Promise.all([
      Book.findById(req.params.id)
        .populate("author")
        .populate("genre")
        .exec(),
      Author.find().exec(),
      Genre.find().exec(),
    ]);

    if (book == null) {
      var err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    for (var all_g_iter = 0; all_g_iter < genres.length; all_g_iter++) {
      for (var book_g_iter = 0; book_g_iter < book.genre.length; book_g_iter++) {
        if (
          genres[all_g_iter]._id.toString() ===
          book.genre[book_g_iter]._id.toString()
        ) {
          genres[all_g_iter].checked = "true";
        }
      }
    }

    res.render("book_form", {
      title: "Update Book",
      authors: authors,
      genres: genres,
      book: book,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle book update on POST.
exports.book_update_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and santitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      try {
        const [authors, genres] = await Promise.all([
          Author.find().exec(),
          Genre.find().exec(),
        ]);

        for (let i = 0; i < genres.length; i++) {
          if (book.genre.indexOf(genres[i]._id) > -1) {
            genres[i].checked = "true";
          }
        }

        res.render("book_form", {
          title: "Update Book",
          authors: authors,
          genres: genres,
          book: book,
          errors: errors.array(),
        });
      } catch (err) {
        return next(err);
      }
      return;
    } else {
      // Data from form is valid. Update the record.
      try {
        const thebook = await Book.findByIdAndUpdate(req.params.id, book, {}).exec();
        res.redirect(thebook.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];
