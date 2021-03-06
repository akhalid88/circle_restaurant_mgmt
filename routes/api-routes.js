// requiring models

var db = require("../models");

var passport = require("../config/passport.js");

// Routes
module.exports = function (app) {

    // Redirects User when logging in from main page to admin page
    app.post("/api/main", passport.authenticate("local"), function (req, res) {
        res.redirect("/admin");
    });

    // Log out redirect from admin page to home page
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Item(Admin):GET, return all menu items
    app.get("/api/admin/item", function (req, res) {
        // console.log("YOU ARE GETTING ALL ITEMS")
        db.Items.findAll({}).then(function (dbItems) {
            res.json(dbItems);
        });
    });

    // Item(Admin):GET, return 1 menu item
    app.get("/api/admin/item/:id", function (req, res) {
        db.Items.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Item(Admin):POST, create a new menu item
    app.post("/api/admin/item", function (req, res) {
        db.Items.create({
            name: req.body.name,
            category: req.body.category,
            cost: req.body.cost,
            description: req.body.description
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Item(Admin):PUT, update a menu item
    app.put("/api/admin/item/:id", function (req, res) {

        db.Items.update({
            name: req.body.name,
            category: req.body.category,
            cost: req.body.cost,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Item(Admin):DELETE, delete a menu item
    app.delete("/api/admin/item/:id", function (req, res) {
        db.Items.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Item(User):GET, return all menu items
    app.get("/api/item", function (req, res) {
        db.Items.findAll({}).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // Item(User):POST, return 1 menu item
    app.get("/api/item/:id", function (req, res) {
        db.Items.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Orders(User):GET, get order cart
    app.get("/api/orders/seating/:id", function (req, res) {
        db.Orders.findAll({
            where: {
                SeatingId: req.params.id,
                submitted: 0,
                completed: 0
            },
            include: [
                {
                    model: db.Items,
                    required: false
                }
            ]
        }).then(function (dbItem) {
            res.json(dbItem);
        })
    });

    // Orders(User):POST, post item to order
    app.post("/api/orders", function (req, res) {
        // console.log(req.body.itemId);
        db.Orders.create({
            SeatingId: req.body.seatingId,
            ItemId: req.body.itemId,
            item_quantity: 1
            // complete: false,
            // submitted: false
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

    // Orders (User) Submit Button in Cart changes submitted to true
    app.put("/api/orders/:id", function (req, res) {
        db.Orders.update({
            submitted: 1
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // Orders(Admin):GET, return all orders
    app.get("/admin/orders", function (req, res) {
        db.Items.findAll({}).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // Orders(Admin):PUT, update orders to "complete"
    app.put("/admin/orders/:id", function (req, res) {
        db.Items.update(req.body,
            {
                where: {
                    complete: req.params.complete
                }
            }).then(function (dbItem) {
                res.json(dbItem)
            });
    });

    // Seats: GET
    app.get("/api/seating", function (req, res) {
        db.Seating.findAll({
            attributes: ['id']
        }).then(function (dbItem) {
            res.json(dbItem);
        })
    });

    // Table updates to occupied
    app.put("/api/seating/:id", function (req, res) {
        db.Seating.update({
            occupied: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem)
        });
    });

};

