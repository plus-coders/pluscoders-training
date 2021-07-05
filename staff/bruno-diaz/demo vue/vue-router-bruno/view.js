Vue.component('app-list', {
    props: ['items'],
    template: `<ul>
        <list-item v-for="(item, index) in items" :item="item" :key="index" @removeItem="removeItem(index)">
        </list-item>
    </ul>`,
    methods: {
        removeItem: function(index) {
            this.$emit('removeItem', index)
        }
    }
})

Vue.component('list-item', {
    props: ['item'],
    template: `<li>
            {{ item.text }} <delete-item @removeItem="removeItem"></delete-item>
        </li>`,
    methods: {
        removeItem: function() {
            this.$emit('removeItem')
        }
    }
})

Vue.component('delete-item', {
    props: ['items'],
    template: `<button class="button--delete" @click="deleteItem">
        delete
    </button>`,
    methods: {
        deleteItem: function() {
            this.$emit('removeItem')
        }
    }
})

Vue.component('add-item', {
    props: ['items'],
    template: `<form>
        <p>Add an item in </p>

        <select v-model="type">
            <option v-for="option in options" :value="option.value">{{option.label}}</option>
        </select>
        <p>:</p>
        <input type="text" v-model="text">
        <button @click="addItem" :disabled="!this.type || !this.text">Add</button>
    </form>`,

    data() {
        return {
            type: undefined,
            options: [{value: 'wish', label: 'Wishes'}, {value: 'todo', label: 'Todos'}],
            text: ''
        }
    },

    methods: {
        addItem: function(event) {
            this.$emit('newItem', { type: this.type, text: this.text }, this.type, this.text)
        }
    }
})

const Wishes = {
    template: `<section class="wishes">
        <h2>Wishes</h2>
        <app-list :items="wishes" @removeItem="removeItem"></app-list>
    </section>`,

    data() {
        return {
            wishes: retrieveWishes()
        }
    },

    methods: {
        removeItem: function(index) {
            var j = 0
            for(var fullIndex = 0; fullIndex < data.length; fullIndex++) {
                if(data[fullIndex].type === 'wish') {
                    if(j === index) break
                    j++
                }
            }
            data.splice(fullIndex, 1)
        }
    }
}

const Todos = {
    template: `<section class="todos">
        <h2>Todos</h2>
        <app-list :items="todos" @removeItem="removeItem"></app-list>
    </section>`,

    data() {
        return {
            todos: retrieveTodos()
        }
    },

    methods: {
        removeItem: function(index) {
            var j = 0
            for(var fullIndex = 0; fullIndex < data.length; fullIndex++) {
                if(data[fullIndex].type === 'todo') {
                    if(j === index) break
                    j++
                }
            }
            data.splice(fullIndex, 1)
        }
    }
}

const routes = [
    { path: '/wishes', component: Wishes},
    { path: '/todos', component: Todos}
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

        <add-item @newItem="addItem"></add-item>
    </main>`,
    data: {
        title: 'Choose a list'
    },
    router,
    methods: {
        addItem: function(newItem, type, text) {
            data.push(newItem)

            var form = document.querySelector('form')
            form.reset()

            type = undefined
            text = ''
        }
    }
}


