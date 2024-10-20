/**
 * Provides a RESTful API for managing a collection of clothes.
 *
 * The API supports the following operations:
 * - GET /clothes: Retrieve a paginated list of clothes
 * - POST /clothes: Create a new clothing item
 * - PUT /clothes/:id: Update an existing clothing item
 * - DELETE /clothes/:id: Delete a clothing item
 *
 * The API uses a local JSON file (`db.json`) as the data store.
 */
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Enable JSON parsing for incoming requests
app.use(express.json());

/**
 * Retrieves a paginated list of clothing items from the data store.
 *
 * @param {number} [page=0] - The page number to retrieve (default is 0).
 * @param {number} [perPage=10] - The number of items to retrieve per page (default is 10).
 * @returns {Object} - An object containing the paginated list of clothing items, the total number of items, the current page, the number of items per page, and the total number of pages.
 */
app.get("/clothes", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  // Read the data from the JSON file
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const start = page * perPage;
    const end = start + perPage;

    // Slice the items array to get the paginated result
    const result = jsonData.items.slice(start, end);

    // Send the paginated result as a JSON response
    res.status(200).json({
      items: result,
      total: jsonData.items.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.items.length / perPage),
    });
  });
});

/**
 * Adds a new clothing item to the data store.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the new clothing item data.
 * @param {string} req.body.name - The name of the new clothing item.
 * @param {string} req.body.image - The URL of the image for the new clothing item.
 * @param {number} req.body.price - The price of the new clothing item.
 * @param {number} req.body.rating - The rating of the new clothing item.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The newly created clothing item.
 */
app.post("/clothes", (req, res) => {
  const { name, image, price, rating } = req.body;

  // Read the data from the JSON file
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // Find the maximum ID in the existing items
    const maxId = jsonData.items.reduce(
      (max, item) => Math.max(max, item.id),
      0
    );

    // Create a new item with a unique ID
    const newItem = {
      id: maxId + 1,
      name,
      image,
      price,
      rating,
    };

    // Add the new item to the items array
    jsonData.items.push(newItem);

    // Write the updated data back to the JSON file
    fs.writeFile("db.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Send the newly created item as a JSON response
      res.status(201).json(newItem);
    });

  });
});

/**
 * Updates an existing clothing item in the data store.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the clothing item to update.
 * @param {Object} req.body - The request body containing the updated clothing item data.
 * @param {string} req.body.name - The updated name of the clothing item.
 * @param {string} req.body.image - The updated URL of the image for the clothing item.
 * @param {number} req.body.price - The updated price of the clothing item.
 * @param {number} req.body.rating - The updated rating of the clothing item.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The updated clothing item.
 */
app.put("/clothes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, image, price, rating } = req.body;

  // Read the data from the JSON file
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // Find the index of the item to update
    const index = jsonData.items.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    // Update the item with the new data
    jsonData.items[index] = {
      id,
      name,
      image,
      price,
      rating,
    };

    // Write the updated data back to the JSON file
    fs.writeFile("db.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Send the updated item as a JSON response
      res.status(200).json(jsonData.items[index]);
    });

  });
});

/**
 * Deletes a clothing item from the database by its ID.
 *
 * @param {Object} req.params - The request parameters.
 * @param {number} req.params.id - The ID of the clothing item to delete.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - A 204 No Content response if the item was deleted successfully, or a 404 Not Found response if the item was not found.
 */
app.delete("/clothes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Read the data from the JSON file
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    // Find the index of the item to delete
    const index = jsonData.items.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    // Remove the item from the items array
    jsonData.items.splice(index, 1);

    // Write the updated data back to the JSON file
    fs.writeFile("db.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      // Send a 204 No Content response
      res.status(204).send();
    });

  });
});

/**
 * Starts the server and listens for incoming requests on the specified port.
 *
 * @param {number} port - The port number to listen on.
 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
