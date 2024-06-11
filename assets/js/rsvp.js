document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const attendance = document.getElementById('attendance').value;
    const numppl = document.getElementById('numppl').value;
  
    const rsvpData = {
      name: name,
      email: email,
      attendance: attendance,
      numppl: numppl
    };
  
    // Send data to server
    fetch('https://boiling-bayou-24310-16991f1e258a.herokuapp.com/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rsvpData)
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('rsvpMessage').innerHTML = '<p>Gracias por su respuesta!</p>';
      // Optionally, clear the form fields
      document.getElementById('rsvpForm').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('rsvpMessage').innerHTML = '<p>Ocurrió un error. Por favor, inténtelo de nuevo.</p>';
    });
  });
  