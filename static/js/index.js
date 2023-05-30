Vue.component('footer-form', {
    template: `<div class="footer-form-container">
        <div class="footer-form">
            <div>Остались вопросы?</div>
            <div>Заполните форму ниже, мы перезвоним и ответим на них</div>
            <div class="footer-form-inputs">
                <input type="text" placeholder="Имя*" v-model="name" name="name">
                <input type="text" placeholder="Телефон*" v-model="phone" name="phone">
                <input type="text" placeholder="Email*" v-model="email" name="email">
            </div>
            <div class="footer-form-bottom">
                <div @click="show()">Получить консультацию</div>
                <div>Нажимая на кнопку, вы соглашаетесь на обработку ваших персональных данных.</div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            name: '',
            phone: '',
            email: ''
        }
    },
    methods: {
        show: function() {
            console.log(this.name);
            console.log(this.phone);
            console.log(this.email);
        },
        addRequest: function() {
            var form_data = new FormData();
            form_data.append('name', this.name);
            form_data.append('phone', this.phone);
            form_data.append('email', this.email);
            var params = {
                method: 'POST',
                body: form_data,
                credentials: 'include'
            };
            fetch('/add_request', params).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((json) => {

            })
        }
    }
})
var vueSub = new Vue({
    el: '#footer',
});