document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const attendance = document.getElementById('attendance').value;
  
    const rsvpData = {
      name: name,
      email: email,
      attendance: attendance
    };
  
    // Send data to server
    fetch('your-server-endpoint-here', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rsvpData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Thank you for your response!');
      // Optionally, clear the form fields
      document.getElementById('rsvpForm').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting your response. Please try again.');
    });
  });
  