var Author = require("../models/author");
var Book = require("../models/book");

const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.author_list = async function (req, res, next) {
  try {
    const list_authors = await Author.find()
      .sort([["family_name", "ascending"]])
      .exec();
    res.render("author_list", {
      title: "Author List",
      author_list: list_authors,
    });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res, next) {
  try {
    const [author, authors_books] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);

    if (author == null) {
      var err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    res.render("author_detail", {
      title: "Author Detail",
      author: author,
      author_books: authors_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Display Author create form on GET.
exports.author_create_get = function (req, res, next) {
  res.render("author_form", { title: "Create Author" });
};

// Handle Author create on POST.
exports.author_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    var author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      try {
        await author.save();
        res.redirect(author.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display Author delete form on GET.
exports.author_delete_get = async function (req, res, next) {
  try {
    const [author, authors_books] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }).exec(),
    ]);

    if (author == null) {
      res.redirect("/catalog/authors");
      return;
    }

    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: authors_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle Author delete on POST.
exports.author_delete_post = async function (req, res, next) {
  try {
    const [author, authors_books] = await Promise.all([
      Author.findById(req.body.id).exec(),
      Book.find({ author: req.body.id }).exec(),
    ]);

    if (authors_books.length > 0) {
      res.render("author_delete", {
        title: "Delete Author",
        author: author,
        author_books: authors_books,
      });
      return;
    }

    await Author.findByIdAndDelete(req.body.id).exec();
    res.redirect("/catalog/authors");
  } catch (err) {
    return next(err);
  }
};

// Display Author update form on GET.
exports.author_update_get = async function (req, res, next) {
  try {
    const author = await Author.findById(req.params.id).exec();
    if (author == null) {
      var err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
    res.render("author_form", { title: "Update Author", author: author });
  } catch (err) {
    return next(err);
  }
};

// Handle Author update on POST.
exports.author_update_post = [
  // Validate and santize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data (and the old id!)
    var author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("author_form", {
        title: "Update Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      try {
        const theauthor = await Author.findByIdAndUpdate(
          req.params.id,
          author,
          {}
        ).exec();
        res.redirect(theauthor.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];
