Vue.component('teachers-vue', {
    template: `<div class="teachers-body">
        <div class="teachers-list" v-if="listOfCourses">
            <div class="courses-item" v-for="course in listOfCourses">{{ course.name }}</div>
        </div>
        <div class="courses-list" v-if="listOfTeachers">
            <div v-for="listOfTeachers" class="teachers-item"></div>
        </div>
    </div>`,
    data: function() {
        return {
            listOfCourses: '',
            listOfTeachers: '',
        }
    },
    methods: {
        getListOfCourseGroups: function() {
    },
    activated: function() {
        var params = {
            method: 'GET',
            body: form_data,
        }
        fetch('/api/get_course_groups', params).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('Ошибка взаимодействия с базой данных');
            }
        }).then((json) => {
            
        })
    }
    }
});
var vt = new Vue({
    el: '#teachers'
});