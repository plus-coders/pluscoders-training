Vue.component('search', {
    template: `<section>
        <h2>Search</h2>
        <form v-on:submit="search">
            <input type="text" name="query" placeholder="query">
            <button>Search</button>
        </form>
        <div v-if="results">
            <ul v-if="results.length">
                <li v-for="result in results" :key="result.id">
                    <p>{{ result.name }}</p>
                </li>
            </ul>
            <p v-else>no results :/</p>
        </div>
    </section>`,
    data: function() {
        return {
            results: null
        }
    },
    methods: {
        search: function(event) {
            event.preventDefault()

            var form = event.target

            var query = form.query.value

            searchVehicles(query, function(error, vehicles) {
                if (error) return alert(error.message)

                this.results = vehicles
            }.bind(this))
        }
    }
})

var App = {
    template: '<main><search /></main>'
}