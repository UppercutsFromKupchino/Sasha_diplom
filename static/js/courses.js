Vue.component('courses-body', {
    template: `<div v-if="courses" class="courses-body">
        <div class="filter">
            <div class="filter-item">
                <div>Направление</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.707 8.707a1 1 0 0 1-1.414 0l-7-7A1 1 0 1 1 1.707.293L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7Z" fill="#231F20"/>
                </svg>
            </div>
            <div class="filter-item">
                <div>Стоимость</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.707 8.707a1 1 0 0 1-1.414 0l-7-7A1 1 0 1 1 1.707.293L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7Z" fill="#231F20"/>
                </svg>
            </div>
            <div class="filter-item">
                <div>Длительность</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.707 8.707a1 1 0 0 1-1.414 0l-7-7A1 1 0 1 1 1.707.293L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7Z" fill="#231F20"/>
                </svg>
            </div>
            <div class="filter-item">
                <div>Цена</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.707 8.707a1 1 0 0 1-1.414 0l-7-7A1 1 0 1 1 1.707.293L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7Z" fill="#231F20"/>
                </svg>
            </div>
        </div>
        <div class="course-container">
            <div v-for="course in courses" class="course-item">
                <div class="course-item-left">
                    <div class="course-name">{{ course.course_name }}</div>
                    <div class="course-item-left-top">
                        <div>{{ course.duration }} мес.</div>
                        <div>{{ course.price }} руб.</div>
                    </div>
                    <div class="course-item-bottom">{{ course.description }}</div>
                </div>
                <div class="course-item-right">
                    <img :src="path + course.photo"/>
                </div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            courses: '',
            path: '/static/images/photos/'
        }
    },
    methods: {

    },
    created: function() {
        var form_data = new FormData();
        var params = {
            method: 'POST',
            body: form_data
        };
        fetch('/api/get_courses', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('ploho 1');
            }
        }).then((json) => {
            if(json.ok) {
                this.courses = json.courses;
                console.log(this.courses);
            } else {
                this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.';
            }
        });
    }
});
var vc = new Vue({
    el: '#courses'
});