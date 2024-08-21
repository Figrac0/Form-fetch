const forms = (state) =>{
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]'),
          nameInputs = document.querySelectorAll('input[name="user_name"]');
          
    phoneInputs.forEach(item =>{
        item.addEventListener('input', () =>{
            item.value = item.value.replace(/[^\d+-]/g, '');
        });
    });

    nameInputs.forEach(function(item) {
        item.addEventListener('input', function() {
            item.value = item.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
        });
    });;

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        fail: 'Что-то пошло не так...'
    };

    const postData = async (url, data) =>{
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item =>{
        item.addEventListener('submit', (e) =>{
            e.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res =>{
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(()=>statusMessage.textContent = message.fail)
                .finally(() =>{
                    clearInputs();
                    setTimeout(() => {
                       statusMessage.remove(); 
                    }, 5000);
                });
        });
    });
};

export default forms;