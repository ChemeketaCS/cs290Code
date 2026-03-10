var Genre = require("../models/genre");
var Book = require("../models/book");

const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = async function (req, res, next) {
  try {
    const list_genres = await Genre.find().sort([["name", "ascending"]]).exec();
    res.render("genre_list", {
      title: "Genre List",
      list_genres: list_genres,
    });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);

    if (genre == null) {
      var err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: genre_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res, next) {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and santise the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      try {
        const found_genre = await Genre.findOne({ name: req.body.name }).exec();
        if (found_genre) {
          res.redirect(found_genre.url);
          return;
        }

        await genre.save();
        res.redirect(genre.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

// Display Genre delete form on GET.
exports.genre_delete_get = async function (req, res, next) {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);

    if (genre == null) {
      res.redirect("/catalog/genres");
      return;
    }

    res.render("genre_delete", {
      title: "Delete Genre",
      genre: genre,
      genre_books: genre_books,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle Genre delete on POST.
exports.genre_delete_post = async function (req, res, next) {
  try {
    const [genre, genre_books] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);

    if (genre != null && genre_books.length > 0) {
      await Promise.all(
        genre_books.map((book) => {
          book.genre.pull(genre._id);
          return book.save();
        })
      );
    }

    await Genre.findByIdAndDelete(req.body.id).exec();
    res.redirect("/catalog/genres");
  } catch (err) {
    return next(err);
  }
};

// Display Genre update form on GET.
exports.genre_update_get = async function (req, res, next) {
  try {
    const genre = await Genre.findById(req.params.id).exec();
    if (genre == null) {
      var err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    res.render("genre_form", { title: "Update Genre", genre: genre });
  } catch (err) {
    return next(err);
  }
};

// Handle Genre update on POST.
exports.genre_update_post = [
  // Validate and sanitze the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
    var genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      try {
        const thegenre = await Genre.findByIdAndUpdate(
          req.params.id,
          genre,
          {}
        ).exec();
        res.redirect(thegenre.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];
