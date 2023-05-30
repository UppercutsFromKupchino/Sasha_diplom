Vue.component('teachers-vue', {
    template: `<div><div class="teachers-comp" v-if="listOfCourses && listOfTeachers">
            <div class="courses-list">
                <div class="courses-item" v-for="course in listOfCourses" :class="{active: course.id_ == activeId}" @click="changeActive(course.id_)">{{ course.name_ }}</div>
            </div>
            <div class="teachers-list" v-if="Object.keys(listOfTeachers).length != 0">
                <div v-for="teacher in listOfTeachers" class="teachers-item">
                    <img :src="staticFolder + teacher.photo"/>
                    <div class="teacher-name">{{teacher.name_}}</div>
                    <div class="teacher-description">{{teacher.description}}</div>
                </div>
            </div>
            <div class="empty-teachers" v-else>Упс, преподавателей, подходящих под условия, не обнаружено</div>
        </div>
        <div v-else class="message">{{message}}</div>
    </div>`,
    data: function() {
        return {
            listOfCourses: '',
            listOfTeachers: '',
            message: '',
            activeId: '0',
            staticFolder: '/static/images/photos/'
        }
    },
    methods: {
        getListOfCourseGroups: function(id) {
            form_data = new FormData();
            form_data.append('id', id);
            var params = {
                method: 'POST',
                body: form_data,
            };
            fetch('/api/get_teachers', params).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log('Ошибка взаимодействия с базой данных');
                }
            }).then((json) => {
                console.log(json);
                if(json.ok) {
                    this.listOfTeachers = json['teachers'];
                } else {
                    this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.'
                }
            });
        },
        changeActive: function(id) {
            this.activeId = id;
            this.getListOfCourseGroups(id);
        }
    },
    created: function() {
        form_data = new FormData();
        var params = {
            method: 'POST',
            body: form_data,
        };
        fetch('/api/init_teachers', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('Ошибка взаимодействия с базой данных');
            }
        }).then((json) => {
            console.log(json);
            if(json.ok) {
                this.listOfCourses = json['course_groups'];
                this.listOfTeachers = json['teachers'];
                this.activeId = '0';
                console.log(this.listOfCourses, this.listOfTeachers);
            } else {
                this.message = 'Ошибка взаимодействия с базой данных. Обратитесь к администратору.'
            }
        });
    }
});
var vt = new Vue({
    el: '#teachers'
});