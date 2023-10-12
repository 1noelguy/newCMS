const form = document.querySelector('form');
const errorMsg = document.querySelector('.errorN');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    errorMsg.textContent = '';    
    const username = form.username.value;
    const password = form.password.value;

    // console.log(username, password)

    try {
        const res = await fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })

        const data = await res.json();
        console.log(data);

        if (data.message) {
            errorMsg.textContent = data.message;
        }
        if (data.userID) {
            location.assign('/home')
        }

    } catch (err) {
        console.log(err);
    }

})