function toggleMenu(){

    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');


    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');

}

    let Name = document.querySelector('.user');
    Name.innerHTML = localStorage.getItem("username");

    async function logout(){
        try {
            const res = await fetch('/api/logout',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json();
            console.log(data);

            if (data.message) {
                location.assign('\signIn')
            }

        } catch (err) {
            console.log(err);
        }
    }