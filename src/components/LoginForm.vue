<template>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name:'LoginFormComponent',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/auth/login', {
            username: this.username,
            password: this.password,
          });
          alert(response.data.message);
          // Save the token in local storage and redirect to the profile page
          localStorage.setItem('token', response.data.token);
          this.$router.push('/profile');
        } catch (error) {
          alert(error.response.data.message);
        }
      },
    },
  };
  </script>
  