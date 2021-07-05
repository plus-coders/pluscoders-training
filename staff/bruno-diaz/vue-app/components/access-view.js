const LoginView = {
    template: `<form id='loginForm' @submit.prevent="onLogin">
        <span v-if="feedback.lenght">
            {feedback}
        </span>
        <span class="form__element">
            <label for="#email">Email</label>
            <input
                v-model="email"
                id="email"
                type="email"
                class="form__element--input"
                required
            >
        </span>
        <span class="form__element">
            <label for="#password">Password</label>
            <input
                v-model="password"
                id="password"
                type="password"
                class="form__element--input"
                required
            >
        </span>
        <button type="submit" class='button button__cta'>Log in</button>
    </form>`,

    // props: ["feedback"],

    data() {
        return {
            email: null,
            password: null,
            feedback: []
        };
    },

    methods: {
        onLogin() {
            // this.feedback = [];

            this.$emit("onLogin", this.email, this.password);
        }
    }
}


const RegisterView = {
    template: `<form id='RegisterForm' @submit.prevent="onRegister">
        <span v-if="feedback">
            {this.feedback}
        </span>
        <span class="form__element">
            <label for="#fullname">Fullname</label>
            <input
                v-model="fullname"
                id="fullname"
                type="text"
                class="form__element--input"
                required
            >
        </span>
        <span class="form__element">
            <label for="#email">Email</label>
            <input
                v-model="email"
                id="email"
                type="email"
                class="form__element--input"
                required
            >
        </span>
        <span class="form__element">
            <label for="#password">Password</label>
            <input
                v-model="password"
                id="password"
                type="password"
                class="form__element--input"
                required
            >
        </span>
        <button type="submit" class='button button__cta'>Register</button>
    </form>`,
  
    props: ["feedback"],
  
    data() {
        return {
            fullname: null,
            email: null,
            password: null,
        };
    },
  
    methods: {
        onRegister() {
            // this.feedback = null;
    
            this.$emit("onRegister", this.fullname, this.email, this.password);
        }
    }
}


Vue.component("access-view", {
    template: `<section class="access-panel" v-if="this.$route.name !== 'session'">
        <nav class="access-panel__tabs" v-if="this.$route.name !== 'session'">
            <router-link to="/login">Log in</router-link>
            <router-link to="/register">Register</router-link>
        </nav>

        <router-view class="access-panel__content" @onLogin="onLogin" @onRegister="onRegister"></router-view>
    </section>`,

    router: new VueRouter({
        routes: [
            {
            path: "/login",
            component: LoginView,
            name: "login",
            props: { default: true },
            },
            {
            path: "/register",
            component: RegisterView,
            name: "register",
            }
        ]
    }),

    props: ["feedback"],

    methods: {
        onLogin(email, password) {
            this.$emit("onLogin", email, password);
        },
        onRegister(fullname, email, password) {
            this.$emit("onRegister", fullname, email, password);
        }
    }
})