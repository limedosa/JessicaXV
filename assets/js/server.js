const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/rsvp', (req, res) => {
  const rsvpData = req.body;

  // Read existing data
  fs.readFile('rsvp.json', (err, data) => {
    if (err) throw err;
    const rsvps = JSON.parse(data);

    // Add new RSVP
    rsvps.push(rsvpData);

    // Save updated data
    fs.writeFile('rsvp.json', JSON.stringify(rsvps, null, 2), (err) => {
      if (err) throw err;
      res.status(200).send({ message: 'RSVP received' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
