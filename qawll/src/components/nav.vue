<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Логотип -->
      <router-link to="/" class="nav-logo">
        <img src="../assets/Logo.svg" alt="Кинотеатр" class="logo-img">
        <span class="logo-text">Кинотеатр</span>
      </router-link>

      <!-- Навигационные ссылки -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/customers" class="nav-link">Посетители</router-link>
        <router-link to="/receipt" class="nav-link">Чеки</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  padding: 0;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-container {
  max-width: none; /* Убираем ограничение по ширине */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px; /* Добавляем padding вместо ограничения ширины */
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5em;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  transform: translateY(-2px);
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text {
  color: white;
}

.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1em;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
}

/* Адаптивность */
@media (max-width: 768px) {
  .nav-container {
    height: 60px;
    padding: 0 15px;
  }
  
  .nav-links {
    gap: 15px;
  }
  
  .nav-link {
    font-size: 1em;
    padding: 6px 12px;
  }
  
  .logo-text {
    font-size: 1.3em;
  }
  
  .logo-img {
    height: 35px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 15px;
    gap: 15px;
  }
  
  .nav-links {
    gap: 10px;
  }
  
  .nav-link {
    font-size: 0.9em;
    padding: 5px 10px;
  }
  
  .logo-text {
    display: none;
  }
}
</style>