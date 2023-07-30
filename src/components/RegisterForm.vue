<!-- frontend/src/components/RegistrationForm.vue -->
<template>
  <form @submit.prevent="register">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <label>Date of Birth</label>
    <input v-model="dob" type="date">
    <button type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name:'RegisterFormComponent',
  data() {
    return {
      username: '',
      password: '',
      dob:'',
      errorMessages: [],
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username: this.username,
          password: this.password,
          dob: this.dob,
        });
        alert(response.data.message);
        // Redirect to the login page after successful registration
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          // Registration failed due to validation errors
          this.errorMessages = error.response.data.errors;

          // Show the error messages in an alert
          alert('Error: ' + this.errorMessages.map(error => error.msg).join(', '));
        } else {
          // Other types of errors 
          console.error('Error during registration:', error);
        }
      }
    },
  },
};
</script>
