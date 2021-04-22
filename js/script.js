const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

let preloading = false;

const getData = () => {
    if (!preloading){
        preloading = true;

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

            for (let user of data) {
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');

                pId.innerText = `User Id: ${user.id}`;
                pName.innerText = `User name: ${user.name}`;
                pWebsite.innerHTML = `User url: ${user.pWebsite}`;

                let body = document.body;
                body.appendChild(pId);
                body.appendChild(pName);
                body.appendChild(pWebsite);
            }
            preloading = false;
            hidePreloader();

            console.log(data)
        })
        .catch(error => {
            console.error(error);
        })
    }
}


const scrollToEndOfPage = () => {

    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);
 
    console.log(`ScrollHeight: ${scrollHeight}`);
    console.log(`ScrollTOP: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`); 

    if (sumScrollTopClientHeight >= scrollHeight) {
        getData();
        showPreloader();
    }
}


window.addEventListener('scroll', scrollToEndOfPage);

