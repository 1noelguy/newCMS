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
            //set local storage here
            localStorage.setItem("username", data.username);
            localStorage.setItem("function", data.role);
            location.assign('/home');
            // console.log(data.username, data.userID, data.role);
        }

    } catch (err) {
        console.log(err);
    }

})