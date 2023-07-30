<!-- frontend/src/views/Profile.vue -->
<template>
    <div>
      <h2>Profile</h2>
      <p v-if="username">Username: {{ username }}</p>
      <button @click="logout">Logout</button>
      <ProfileUpdateForm />
    </div>
  </template>
  
  <script>
  import ProfileUpdateForm from '../components/ProfileUpdateForm.vue';
  import axios from 'axios';
  export default {
    name: 'ProfilePage',
    components: {
      ProfileUpdateForm,
    },
    data() {
      return {
        username: '', // Store the user's username
      };
    },
    methods: {
      async fetchUserProfile() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('User not logged in.');
          }
  
          const response = await axios.get('http://localhost:3000/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          this.username = response.data.username;
        } catch (error) {
          alert(error.response.data.message);
        }
      },
      async logout() {
      try {
        // Clear the authentication token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        this.$router.push('/login');
      } catch (error) {
        alert('Error logging out.');
      }
    },
      showUsernameInAlert() {
        alert(`Username: ${this.username}`);
      },
    },
    created() {
      // Fetch the user's profile information on component creation
      this.fetchUserProfile();
    },
  };
  </script>
  <style>
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: rgb(26, 134, 180);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>