document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const attendance = document.getElementById('attendance').value;
    const number = document.getElementById('number').value;

    const rsvpData = {
      number: number,
      name: name,
      email: email,
      attendance: attendance,
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
      alert('Gracias por su respuesta!');
      // Optionally, clear the form fields
      document.getElementById('rsvpForm').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Gracias por su respuesta!');
    });
  });
  