const Wishes = {
    template: `<section class="wishes">
        <h2>Wishes</h2>
        <ol>
            <li v-for="wish in wishes">
                {{ wish.text }}
            </li>
        </ol>
    </section>`,

    data() {
        return {
            wishes: retrieveWishes()
        }
    }
}

Vue.component('todo-list', {
    props: ['items'],
    template: `<ol>
        <todo-item v-for="item in items" v-bind:todo="item" v-bind:key="item.text"></todo-item>
    </ol>`
})

const Todos = {
    template: `<section class="todos">
        <h2>Todos</h2>
        <todo-list v-bind:items="todos"></todo-list>
    </section>`,

    data() {
        return {
            todos: retrieveTodos()
        }
    }
}

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

const routes = [
    { path: '/wishes', component: Wishes },
    { path: '/todos', component: Todos }
]

const router = new VueRouter({
    routes
})

var App = {
    el: '#app',
    template: `<main>
        <h1>{{ title }}</h1>

        <nav>
            <router-link to="/wishes">Wishes</router-link>
            <router-link to="/todos">Todos</router-link>
        </nav>

        <router-view></router-view>
    </main>`,
    data: {
        title: 'Hello, App!'
    },
    router
}
