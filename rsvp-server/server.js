const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request for '/'
app.get('/', (req, res) => {
  res.send('Thanks for your RSVP!'); // Replace with your desired response
});

// Handle POST request for '/rsvp'
app.post('/rsvp', (req, res) => {
  const { name, email, number, attendance } = req.body;
  const filePath = path.join(__dirname, 'rsvpData.json');

  try {
    // Read existing data if file exists
    let data = [];
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath);
      data = JSON.parse(existingData);
    }

    // Add new RSVP
    const newRsvp = { name, email, number, attendance };
    data.push(newRsvp);

    // Save updated data to JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Respond with success message
    res.status(200).json({ message: 'RSVP submitted successfully!' });
  } catch (error) {
    console.error('Error saving RSVP:', error);
    res.status(500).json({ message: 'Error saving RSVP. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle GET request for '/'
// app.get('/', (req, res) => {
//   res.send('Thanks for your RSVP!'); // Replace with your desired response
// });

// // Handle POST request for '/rsvp'
// app.post('/rsvp', (req, res) => {
//   const { name, email, attendance } = req.body;
//   const filePath = path.join(__dirname, 'rsvpData.json');

//   try {
//     // Read existing data if file exists
//     let data = [];
//     if (fs.existsSync(filePath)) {
//       const existingData = fs.readFileSync(filePath);
//       data = JSON.parse(existingData);
//     }

//     // Add new RSVP
//     const newRsvp = { name, email, attendance };
//     data.push(newRsvp);

//     // Save updated data to JSON file
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//     console.log(`RSVP received: ${name}, ${email}, ${attendance}`);
//     res.json({ message: 'Thank you for your RSVP!' });
//   } catch (error) {
//     console.error('Error saving RSVP:', error.message);
//     res.status(500).json({ error: 'Failed to save RSVP' });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`RSVP server listening at http://localhost:${port}`);
// });
