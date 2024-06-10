const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files (if any) from 'public' directory
// app.use(express.static('public'));

// Endpoint to handle RSVP submissions
app.post('/rsvp', (req, res) => {
  const { name, email, attendance } = req.body;

  // Prepare new RSVP object
  const newRsvp = { name, email, attendance };

  // Read existing RSVP data from JSON file
  const filePath = path.join(__dirname, 'rsvpData.json');
  let data = [];
  
  try {
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath);
      data = JSON.parse(existingData);
    }
  } catch (error) {
    console.error('Error reading RSVP data:', error.message);
    res.status(500).json({ error: 'Failed to read RSVP data' });
    return;
  }

  // Add new RSVP to the data array
  data.push(newRsvp);

  // Write updated RSVP data back to JSON file
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`RSVP received: ${name}, ${email}, ${attendance}`);
    res.json({ message: 'Thank you for your RSVP!' });
  } catch (error) {
    console.error('Error saving RSVP data:', error.message);
    res.status(500).json({ error: 'Failed to save RSVP data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`RSVP server listening at http://localhost:${port}`);
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
