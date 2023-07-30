<!-- frontend/src/views/Login.vue -->
<template>
    <div>
      <h2>Login</h2>
      <LoginForm />
    </div>
  </template>
  
  <script>
  import LoginForm from '../components/LoginForm.vue';
  export default {
    name:'LoginPage',
    components: {
      LoginForm,
    },
  };
  </script>
  