<template>
    <router-view />


    <div class="add-customers">
        <h1>Добавить нового посетителя</h1>
        <form @submit.prevent="addCustomer">
            <input v-model="newCustomer.name" placeholder="Имя" :required>
            <input v-model="newCustomer.passportDetails" placeholder="Паспортные данные" required>
            <button type="submit">Добавить</button>
        </form>
    </div>

    <h1>Все посетители</h1>
    <br>
    <div v-if="loading">
        <h3>Загрузка...</h3>
    </div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else>
        <div v-if="customers.length">
            <div v-for="customers in customers" :key="customers.id" class="customers" style="margin-bottom: 30%; display: flex;">
                <h3>Клиент:</h3> {{ customers.name }}
                <h3>Паспортные данные:</h3> {{ customers.passportDetails }}
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
            loading: false,
            error: null,
            newCustomer: {
                name: '',
                passportDetails: ''
            }
        }
    },
    methods: {
        async fetchReceipt() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3001/api/customers');
                this.customers = response.data;
            } catch (error) {
                console.error('Ошибка загрузки посетителей:', error);
            } finally {
                this.loading = false;
            }
        },
         async addCustomer() {
            try {
                // Отправляем данные на сервер
                const response = await axios.post(
                    'http://localhost:3001/api/customers', 
                    this.newCustomer
                );
                
                // Добавляем нового посетителя в список
                this.customers.push(response.data);
                
                // Очищаем форму
                this.newCustomer = {
                    name: '',
                    passportDetails: ''
                };
                
                console.log('Посетитель добавлен:', response.data);
                
            } catch (error) {
                console.error('Ошибка добавления посетителя:', error);
                this.error = error.message;
            }
        }
    },
    mounted() {
        this.fetchReceipt();
    }
}
</script>

<style scoped>

</style>
