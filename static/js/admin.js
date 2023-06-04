Vue.component('admin-vue', {
    template: `<div v-if="requests">
        <div>
            <div class="bar-1">
                <div :class="{active: active == '0' || active == '1'}">Консультация</div>
                <div :class="{active: active == '2' || active == '3'}">Курс</div>
            </div>
            <div class="bar-2">
                <div :class="{active: active == '0'}" @click="changeActive('0')">Мои</div>
                <div :class="{active: active == '1'}" @click="changeActive('1')">Непринятые</div>
                <div :class="{active: active == '2'}" @click="changeActive('2')">Мои</div>
                <div :class="{active: active == '3'}" @click="changeActive('3')">Непринятые</div>
            </div>
            <div class="message" v-if="message">{{ message }}</div>
            <div class="request-container" v-if="active == '0'">
                <div class="request-bar">
                    <div>Имя пользователя</div>
                    <div>Телефон пользователя</div>
                    <div>Статус</div>
                    <div></div>
                </div>
                <div v-for="(request, key) in requests.data_cons_admin" class="request-item" v-if="request.status_id == 2">
                    <div>{{ request.cons_request_name }}</div>
                    <div>{{ request.phone }}</div>
                    <div>{{ request.name_ }}</div>
                    <div @click="closeRequest(request.id_, 0, key)">Закрыть</div>
                </div>
            </div>
            <div class="request-container" v-if="active == '1'">
                <div class="request-bar">
                    <div>Имя пользователя</div>
                    <div>Телефон пользователя</div>
                    <div>Статус</div>
                    <div></div>
                </div>
                <div v-for="(request, key) in requests.data_cons_all" class="request-item" v-if="request.status_id == 1">
                    <div>{{ request.cons_request_name }}</div>
                    <div>{{ request.phone }}</div>
                    <div>{{ request.name_ }}</div>
                    <div @click="takeRequest(request.id_, 0, key)">Взять себе</div>
                </div>
            </div>
            <div class="request-container" v-if="active == '2'">
                <div>

                </div>
            </div>
            <div class="request-container" v-if="active == '3'">
                <div class="request-bar">
                    <div>Имя пользователя</div>
                    <div>Телефон пользователя</div>
                    <div>Статус</div>
                    <div></div>
                </div>
                <div v-for="request in requests.data_cons_all" class="request-item">
                    <div>{{ request.cons_request_name }}</div>
                    <div>{{ request.phone }}</div>
                    <div>{{ request.name_ }}</div>
                    <div @click="takeRequest(request.id_, 1)">Взять себе</div>
                </div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            requests: '',
            message: '',
            active: '0',
            admin_id: ''
        }
    },
    methods: {
        changeActive: function(id) {
            this.active = id;
        },
        takeRequest: function(request_id, request_type, key) {
            var form_data = new FormData();
            form_data.append('request-id', request_id);
            form_data.append('admin-id', this.admin_id);
            form_data.append('request-type', request_type);
            var params = {
                method: 'POST',
                body: form_data
            }
            fetch('/api/take_request', params).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log('response not ok');
                }
            }).then((json) => {
                if(json.ok) {
                    console.log(this.requests.data_cons_all[key]['status_id']);
                    this.message = 'Заявка успешно принята в работу';
                    if(request_type == 0) {
                        this.requests.data_cons_all[key]['status_id'] = 2;
                    } else {
                        this.requests.data_course_all[key]['status_id'] = 2;
                    }
                    console.log(json);
                } else {
                    console.log('json not ok');
                }
            });
        },
        closeRequest: function(request_id, request_type, key) {
            var form_data = new FormData();
            form_data.append('request-id', request_id);
            form_data.append('admin-id', this.admin_id);
            form_data.append('request-type', request_type);
            var params = {
                method: 'POST',
                body: form_data
            }
            fetch('/api/take_request', params).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log('response not ok');
                }
            }).then((json) => {
                if(json.ok) {
            this.message = 'Заявка успешно закрыта';
            if(request_type == 0) {
                this.requests.data_cons_admin[key]['status_id'] = 3;
            } else {
                this.requests.data_course_admin[key]['status_id'] = 3;
            }
                    console.log(json);
                } else {
                    console.log('json not ok');
                }
            });
        }
    },
    created: function() {
        this.admin_id = document.getElementById('admin-id').textContent;
        var form_data = new FormData();
        form_data.append('admin_id', this.admin_id);
        var params = {
            method: 'POST',
            body: form_data
        }
        fetch('/api/init_admin', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('response not ok');
            }
        }).then((json) => {
            if(json.ok) {
                console.log(json);
                this.requests = json;
            } else {
                console.log('json not ok');
            }
        });
    }
});
var va = new Vue({
    el: '#admin'
});