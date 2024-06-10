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

app.post('/rsvp', (req, res) => {
  const { name, email, attendance } = req.body;
  const filePath = path.join(__dirname, 'rsvpData.json');

  try {
    // Read existing data if file exists
    let data = [];
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath);
      data = JSON.parse(existingData);
    }

    // Add new RSVP
    const newRsvp = { name, email, attendance };
    data.push(newRsvp);

    // Save updated data to JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`RSVP received: ${name}, ${email}, ${attendance}`);
    res.json({ message: 'Thank you for your RSVP!' });
  } catch (error) {
    console.error('Error saving RSVP:', error.message);
    res.status(500).json({ error: 'Failed to save RSVP' });
  }
});

app.listen(port, () => {
  console.log(`RSVP server listening at http://localhost:${port}`);
});
