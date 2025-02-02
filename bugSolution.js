// Correct way to handle Firebase data with async/await
async function fetchData(userId) {
  const snapshot = await db.ref(`/users/${userId}`).once('value');
  const userData = snapshot.val();
  if (userData) {
    console.log('User data:', userData);
    // Access userData safely here
  } else {
    console.log('User not found');
  }
}

fetchData('someUser').catch(error => {
  console.error('Error fetching data:', error);
});

// Incorrect way (will often cause errors)
function fetchDataIncorrectly(userId) {
  db.ref(`/users/${userId}`).once('value', (snapshot) => {
    const userData = snapshot.val();  //Error: userData might be undefined here.
    console.log('User data:', userData); // Data might not be ready yet
  });
  //Attempting to use userData at this point will lead to errors because the listener isn't done yet
  console.log(userData); //This is likely to cause an error
}
fetchDataIncorrectly('someUser');