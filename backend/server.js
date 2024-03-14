const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${5000}`);
});

// Define your API routes here
