const modalState = (id) => {
    console.log(id);
    const modal = document.getElementById('deleteModal')
    modal.classList.remove('hidden')
    modal.classList.add('card_open')
    modal.classList.add('flex')
    document.body.classList.add('overflow-hidden')
    document.querySelector("a#deleteModal").setAttribute('href', "/delete/" + id)
    modalBody.innerHTML = `By accepting on this form the flight with id-${id} no longer exists and will be deleted.`
}

const clouseModal = () => {
    const modal = document.getElementById('deleteModal')
    modal.classList.remove('card_open')
    modal.classList.add('hidden')
    document.body.classList.remove('overflow-hidden')

}



const autoLogin = async () => {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    if (email && password) {
        document.querySelector('input#email').value = email
        document.querySelector('input#password').value = password

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        res.status === 200 ? window.location.href = '/admin' : console.log('error')

        // document.querySelector('form#login').submit()
    } else {
        // console.log(no email);
    }
}


 document.querySelector('#down')?.addEventListener('click', () => {
    let id = location.search
    params = new URLSearchParams(id)

    let ticket = document.querySelector("#tm")

    html2pdf().set({
        pagebreak: { mode: 'avoid-all', before: '#breakPage' }
    });

    html2pdf().from(ticket).save()
}) 




card_close?.addEventListener('click', clouseModal) 