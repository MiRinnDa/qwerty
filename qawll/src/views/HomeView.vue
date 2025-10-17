<template>
    <router-view />
    <h1>Мои чеки</h1>
    <br>
    <div v-if="loading">
        <h3>Загрузка...</h3>
    </div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else>
        <div v-if="receipt.length">
            <div v-for="receipts in receipt" :key="receipts.id" class="receipt" style="margin-bottom: 30%;">
                <h3>Дата:</h3> {{ receipts.data }}
                <h3>Сеанс:</h3> {{ receipts.sessionName }}
                <h3>Клиент:</h3> {{ receipts.customerName }}
                <h3>Зал:</h3> {{ receipts.hallName }}
                <h3>Организация:</h3> {{ receipts.organizationName }}
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
            receipt: [],
            loading: false,
            error: null
        }
    },
    methods: {
        async fetchReceipt() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3001/api/receipt');
                this.receipt = response.data;
            } catch (error) {
                console.error('Ошибка загрузки чеков:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchReceipt();
    }
}
</script>

<style scoped></style>