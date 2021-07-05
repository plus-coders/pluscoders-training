const Foo = { template: '<div class="foo">Foo</div>' }
const Bar = { template: '<div class="bar">Bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes
})

var App = {
    template: `<main>
        <h1>Hello App!</h1>
        <p>
            <router-link to="/foo">Foo</router-link>
            <router-link to="/bar">Bar</router-link>
        </p>
        <router-view></router-view>
    </main>`,
    router
}