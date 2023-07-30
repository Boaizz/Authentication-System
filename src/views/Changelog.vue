<!-- frontend/src/views/Changelog.vue -->
<template>
    <div>
      <h2>Changelog / Activity Log</h2>
      <ul>
        <li v-for="log in changelog" :key="log.timestamp">
          {{ log.action }} by {{ log.username }} at {{ log.timestamp }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name:'ChangelogPage',
    data() {
      return {
        changelog: [], // Array to store the changelog data
      };
    },
    methods: {
      async fetchChangelog() {
        try {
          const response = await axios.get('http://localhost:3000/auth/changelog');
          this.changelog = response.data;
        } catch (error) {
          alert('Error fetching changelog data.');
        }
      },
    },
    created() {
      this.fetchChangelog(); // Fetch the changelog data on component creation
    },
  };
  </script>

<style>
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  font-size: 14px;
}
</style>
  