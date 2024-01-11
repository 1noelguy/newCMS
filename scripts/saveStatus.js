document.getElementById('saveStatus').addEventListener('click', async () => {
    const selectedStatus = document.getElementById('status').value;

    try {
      const response = await fetch(`/certs/updateCertStatus/${certificateID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: selectedStatus,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message);
        // Handle success, e.g., display a success message to the user
      } else {
        console.error('Error:', data.message);
        // Handle error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle general error
    }
  });