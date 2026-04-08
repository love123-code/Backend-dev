const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }
}));

app.use((req, res, next) => {
    if (req.session) {
        const timeLeft = req.session.cookie.maxAge;
        if (timeLeft && timeLeft < 60000) {
            console.log("Session about to expire!");
            res.setHeader("X-Session-Warning", "Session expiring soon");
        }
    }
    next();
});

app.post("/auth/step1", (req, res) => {
    req.session.userData = { ...req.body };
    res.json({ message: "Step 1 saved" });
});

app.post("/auth/step2", (req, res) => {
    req.session.userData = {
        ...req.session.userData,
        ...req.body
    };
    res.json({ message: "Step 2 saved" });
});

app.post("/auth/submit", (req, res) => {
    const data = req.session.userData;
    req.session.userData = null;
    res.status(201).json({
        message: "User Registered Successfully",
        data
    });
});

app.get("/set-language/:lang", (req, res) => {
    res.cookie("lang", req.params.lang, {
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
    res.json({ message: "Language set" });
});

app.get("/get-language", (req, res) => {
    const lang = req.cookies.lang || "en";
    res.json({ language: lang });
});

app.post("/login", (req, res) => {
    const { role } = req.body;

    req.session.user = {
        id: 1,
        role: role || "user"
    };

    if (req.cookies.cart) {
        const cookieCart = JSON.parse(req.cookies.cart);
        req.session.cart = [
            ...(req.session.cart || []),
            ...cookieCart
        ];
        res.clearCookie("cart");
    }

    res.json({ message: "Logged in successfully" });
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
});

const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

app.get("/admin/dashboard", auth, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

app.post("/cart/add", (req, res) => {
    const item = req.body;

    if (req.session.user) {
        req.session.cart = req.session.cart || [];
        req.session.cart.push(item);
    } else {
        let cart = req.cookies.cart
            ? JSON.parse(req.cookies.cart)
            : [];

        cart.push(item);
        res.cookie("cart", JSON.stringify(cart));
    }

    res.json({ message: "Item added to cart" });
});

app.get("/cart", (req, res) => {
    if (req.session.user) {
        return res.json({
            cart: req.session.cart || []
        });
    } else {
        const cart = req.cookies.cart
            ? JSON.parse(req.cookies.cart)
            : [];

        return res.json({ cart });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});