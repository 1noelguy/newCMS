function toggleMenu(){

    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');


    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');

}

    let Name = document.querySelector('.user');
    let logout = document.querySelector('.logOut');
    
    Name.innerHTML = localStorage.getItem("username");

    logout.addEventListener('click', async()=>{
        // alert('Clicked')
        try {
            const res = await fetch('/api/logout',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json();
            console.log(data);

            if (data.message) {
                // console.log(data.message);
                localStorage.removeItem("username", data.username);
                localStorage.removeItem("function", data.role);
                location.assign('/');
            }

        } catch (err) {
            console.log(err);
        }
    });

    // async function logout1(){
    //     try {
    //         const res = await fetch('/api/logout',{
    //             method: 'GET',
    //             headers: {'Content-Type': 'application/json'}
    //         })
    //         const data = await res.json();
    //         console.log(data);

    //         if (data.message) {
    //             location.assign('/signIn');
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }