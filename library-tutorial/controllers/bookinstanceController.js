var BookInstance = require("../models/bookinstance");
var Book = require("../models/book");

const { body, validationResult } = require("express-validator");

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
  try {
    const list_bookinstances = await BookInstance.find()
      .populate("book")
      .exec();
    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookinstance_list: list_bookinstances,
    });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function (req, res, next) {
  try {
    const bookinstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();
    if (bookinstance == null) {
      var err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }
    res.render("bookinstance_detail", {
      title: "Book:",
      bookinstance: bookinstance,
    });
  } catch (err) {
    return next(err);
  }
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function (req, res, next) {
  try {
    const books = await Book.find({}, "title").sort("title").exec();
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      try {
        const books = await Book.find({}, "title").sort("title").exec();
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookinstance.book,
          errors: errors.array(),
          bookinstance: bookinstance,
        });
      } catch (err) {
        return next(err);
      }
      return;
    } else {
      // Data from form is valid
      try {
        await bookinstance.save();
        res.redirect(bookinstance.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = async function (req, res, next) {
  try {
    const bookinstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();
    if (bookinstance == null) {
      res.redirect("/catalog/bookinstances");
      return;
    }
    res.render("bookinstance_delete", {
      title: "Delete BookInstance",
      bookinstance: bookinstance,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = async function (req, res, next) {
  try {
    await BookInstance.findByIdAndDelete(req.body.id).exec();
    res.redirect("/catalog/bookinstances");
  } catch (err) {
    return next(err);
  }
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async function (req, res, next) {
  try {
    const [bookinstance, books] = await Promise.all([
      BookInstance.findById(req.params.id).populate("book").exec(),
      Book.find().sort("title").exec(),
    ]);

    if (bookinstance == null) {
      var err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }

    res.render("bookinstance_form", {
      title: "Update  BookInstance",
      book_list: books,
      selected_book: bookinstance.book._id,
      bookinstance: bookinstance,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle BookInstance update on POST.
exports.bookinstance_update_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped/trimmed data and current id.
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors so render the form again, passing sanitized values and errors.
      try {
        const books = await Book.find({}, "title").sort("title").exec();
        res.render("bookinstance_form", {
          title: "Update BookInstance",
          book_list: books,
          selected_book: bookinstance.book,
          errors: errors.array(),
          bookinstance: bookinstance,
        });
      } catch (err) {
        return next(err);
      }
      return;
    } else {
      // Data from form is valid.
      try {
        const thebookinstance = await BookInstance.findByIdAndUpdate(
          req.params.id,
          bookinstance,
          {}
        ).exec();
        res.redirect(thebookinstance.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];
