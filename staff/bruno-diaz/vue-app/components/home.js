const Home = {
  template: `<main id="session">
          <section id="searchComponent">
              <h2 class="searchComponent__title">Start to look for all you want</h2>
              <form class="searchComponent__form" @submit.prevent="searchByQuery">
                  <select v-model="searcher" class="searchComponent__select">
                      <option v-for="option in options" :value="option.value">{{option.label}}</option>
                  </select>
                  <input type="text" v-model="query" class="searchComponent__input">
                  <button type="submit" class="searchComponent__submit">Search</button>
              </form>
          </section>
              
          <section id="resultsWrapper" v-if="resultsList">
              <ul>
                  <li v-for="resultItem in resultsList" class="resultsItem">
                      <a :href="resultItem.url" target="_blank">
                          <p class="resultsItem__title">{{resultItem.title}}</p>
                          <p class="resultsItem__preview">{{resultItem.preview}}</p>
                      </a>
                  </li>
              </ul>
          </section>
      </main>`,

  data() {
    return {
      searcher: "all",
      options: [
        { value: "all", label: "All" },
        { value: "google", label: "Google" },
        { value: "yahoo", label: "Yahoo" },
        { value: "bing", label: "Bing" },
      ],
      query: "",
      page: undefined,
      resultsList: []
    };
  },

  methods: {
    async searchByQuery() {

      try {
        this.resultsList = []

        if (!this.page) this.page = 1;

        if (this.searcher === 'google' || this.searcher === 'all') {

          var { results, page } = await searchInGoogle(this.query, this.page);
          results.forEach(element => this.resultsList.push(element));

        }
        
        if (this.searcher === 'yahoo' || this.searcher === 'all') {

          var { results, page } = await searchInYahoo(this.query, this.page);
          results.forEach(element => this.resultsList.push(element));

        }
        
        if (this.searcher === 'bing' || this.searcher === 'all') {

          var { results, page } = await searchInBing(this.query, this.page);
          results.forEach(element => this.resultsList.push(element));

        }

        return this.resultsList
        
      } catch (error) {
        alert(error);
      }
    },
  },
};
