Vue.component('footer-vue', {
    template:`<div class="footer-top">
        <div>Остались вопросы?</div>
        <div>Заполните форму ниже, мы перезвоним и ответим на них</div>
        <div v-if="message" class="message">
            {{message}}
        </div>
        <div class="footer-inputs">
            <input placeholder="Имя*" v-model="name"/>
            <input placeholder="Телефон*" v-model="phone"/>
            <input placeholder="Email*" v-model="email"/>
        </div>
        <div class="footer-form-bottom">
            <div @click="sendPost()">Получить консультацию</div>
            <div>Нажимая на кнопку, вы соглашаетесь на обработку ваших персональных данных.</div>
        </div>
    </div>`,
    data: function() {
        return {
            name: '',
            phone: '',
            email: '',
            message: ''
        }
    },
    methods: {
        sendPost: function() {
            if(!this.name || !this.phone || !this.email) {
                this.message = 'Все поля обязательны к заполнению';
                return;
            }
            if((this.phone.length != 12 && this.phone.slice(0, 2) == '+7') || (this.phone.length != 11 && this.phone.slice(0, 1) == '8')) {
                this.message = 'Введите валидный номер телефона';
                return;
            }
            var form_data = new FormData();
            form_data.append('phone', this.phone);
            form_data.append('name', this.name);
            form_data.append('email', this.email);
            var params = {
                method: 'POST',
                body: form_data
            };
            fetch('/api/add_request', params).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    this.message = 'Ошибка взаимодействия с сервером. Проверьте подключение к сети.';
                }
            }).then((json) => {
                if(json.message == 'ok') {
                    this.message = 'Заявка успешно отправлена.';
                } else {
                    this.message = 'Ошибка записи данных. Обратитесь к администратору.';
                }
            })
        }
    }
});
var vm = new Vue({
    el: '#footer'
});