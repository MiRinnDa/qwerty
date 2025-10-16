<template>
    <router-view />
  <div class="data-baze">
    <h2>Данные из базы</h2>
    
    
    <div v-if="loading">Загрузка...</div>
    
    <div v-else>

      <div v-if="session.length">
        <h3>Сотрудники:</h3>
        <div v-for="tyu in session" :key="tyu.id">
          {{ tyu.name }} - {{ tyu.startTime }}
        </div>
      </div>

      Продукты
      <div v-if="products.length">
        <h3>Продукты:</h3>
        <div v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.product_type }}
        </div>
      </div>




        <div v-if="supplier.length">
        <h3>Продукты:</h3>
        <div v-for="product in supplier" :key="product.id">
          {{ product.name }} - {{ product.product_type }}
        </div>
      </div>


      
    </div>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  name: 'DataComponent',
  data() {
    return {
      customers: [],
      organization: [],
      hall: [],
      session: [],
      employee: [],
      receipt: [],
      loading: false
    }
  },
  methods: {
    async fetchSession() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/session');
        this.staff = response.data;
      } catch (error) {
        console.error('Ошибка загрузки сотрудников:', error);
      } finally {
        this.loading = false;
      }
    },

        async fetchStaff() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        this.staff = response.data;
      } catch (error) {
        console.error('Ошибка загрузки сотрудников:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOrders() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/orders');
        this.orders = response.data;
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    // Автоматически загружаем данные при монтировании
    this.fetchStaff();
    this.fetchProducts();
    this.fetchSession();
  }
}
</script>

<style scoped>

.data-baze {
  color: white;
}

</style>