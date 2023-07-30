<!-- frontend/src/components/ProfileUpdateForm.vue -->
<template>
    <form @submit.prevent="updateProfile">
      <h2>Update Information</h2>
      <input type="text" v-model="username" placeholder="Enter New Username" />
      <input type="password" v-model="password" placeholder="Enter New Password" />
      <button type="submit">Update Profile</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios'; 
  export default {
    name:'ProfileUpdateFormComponent',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
  async updateProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in.');
      }

      const response = await axios.post(
        'http://localhost:3000/auth/update-profile',
        {
          username: this.username,
          password: this.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure "Bearer" is included before the token
          },
        }
      );
          alert(response.data.message);
          // Redirect to the profile page after successful update
          this.$router.push('/profile');
        } catch (error) {
          if (error.response && error.response.data && error.response.data.errors) {
          // Registration failed due to validation errors
          this.errorMessages = error.response.data.errors;
          // Show the error messages in an alert
          alert('Error: ' + this.errorMessages.map(error => error.msg).join(', '));
          }
        }
      },
      showUsernameInAlert() {
      // Access the showUsernameInAlert method from the Profile.vue component
      this.$parent.showUsernameInAlert();
    },
    },
  };
  </script>
  <style>
  </style>