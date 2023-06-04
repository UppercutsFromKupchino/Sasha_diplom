Vue.component('reviews-vue', {
    template: `<div v-if="reviews && courses">
        <div class="review-title">Наши отзывы</div>
        <div class="review-container">
            <div v-for="review in reviews" class="review-item">
                <div>{{ review.review_name }}</div>
                <div>{{ review.course_name }}</div>
                <div class="review-text">{{ review.text_ }}</div>
                <!--div class="review-top">
                    <div>{{ review.review_name }}</div>
                    <div>{{ review.course_name }}</div>
                </div>
                <div class="review-text">«{{ review.text_ }}»</div-->
            </div>
        </div>
        <div class="review-form">
            <div>Добавить отзыв</div>
            <div class="course-list">
                <div @click="changeActive(course.id_)" v-for="course in courses" class="course-item" :class="{focused: course.id_ == active}">{{ course.name_ }}</div>
            </div>
            <div class="message" v-if="message_form">{{ message_form }}</div>
            <div class="review-inputs">
                <div class="review-inputs-top">
                    <input type="text" placeholder="Имя*" v-model="name"/>
                    <input type="text" placeholder="Телефон*" v-model="phone"/>
                </div>
                <input type="text" placeholder="Текст отзыва*" v-model="text"/>
            </div>
            <div @click="sendReview()" class="review-button">Оставить отзыв</div>
        </div>
    </div>`,
    data: function() {
        return {
            reviews: '',
            message: '',
            courses: '',
            active: 1,
            name: '',
            phone: '',
            text: '',
            message_form: ''
        }
    },
    methods: {
        changeActive: function(id) {
           this.active = id;
        },
        sendReview: function() {
            if(!this.name || !this.phone || !this.text) {
                this.message_form = 'Все поля обязательны к заполнению';
                return;
            }
            if(this.phone.length < 11) {
                this.message_form = 'Введите валидный номер телефона';
                return;
            }
            console.log('yo');
            var form_data = new FormData();
            form_data.append('name', this.name);
            form_data.append('phone', this.phone);
            form_data.append('text', this.text);
            form_data.append('course_id', this.active);
            var params = {
                method: 'POST',
                body: form_data
            }
            fetch('/api/add_review', params).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.';
                }
            }).then((json) => {
                if(json.ok) {
                    console.log(json);
                    this.message_form = 'Отзыв успешно добавлен';
                } else {
    
                }
            });
        }
    },
    created: function() {
        var params = {
            methods: 'GET',
        };
        fetch('/api/init_reviews', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.';
            }
        }).then((json) => {
            if(json.ok) {
                console.log(json);
                this.reviews = json.reviews;
            } else {

            }
        });
        fetch('/api/get_courses_review', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.';
            }
        }).then((json) => {
            if(json.ok) {
                console.log(json);
                this.courses = json.courses;
            } else {

            }
        });
    }
})
var vc = new Vue({
    el: '#reviews'
});