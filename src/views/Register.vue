<!-- frontend/src/views/Register.vue -->
<template>
    <div>
      <h2>Register</h2>
      <RegistrationForm />
    </div>
</template>
  <script>
  import RegistrationForm from '../components/RegisterForm.vue';
  export default {
    name:'RegisterPage',
    components: {
      RegistrationForm,
    },
  };
  </script>
  