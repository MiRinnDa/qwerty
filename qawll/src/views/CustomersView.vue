<template>
    <router-view />

    <div class="add-customers-section">
        <h1 class="section-title">Добавить нового посетителя</h1>
        <div class="form-container card-style">
            <form @submit.prevent="addCustomer" class="customer-form">
                <div class="form-group">
                    <div class="inputGroup">
                        <input type="text" v-model="newCustomer.name" required autocomplete="off">
                        <label>Имя</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="inputGroup">
                        <input type="text" v-model="newCustomer.passportDetails" required autocomplete="off">
                        <label>Паспортные данные</label>
                    </div>
                </div>
                <button type="submit" class="submit-btn">Добавить</button>
            </form>
        </div>
    </div>

    <h1 class="section-title">Все посетители</h1>
    <div v-if="loading">
        <h3>Загрузка...</h3>
    </div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else>
        <div v-if="customers.length" class="customers-container">
            <div v-for="customer in customers" :key="customer.id" class="customer-card card-style">
                <div class="card-header">
                    <h3 class="card-title">👤 Клиент</h3>
                    <div class="card-actions">
                        <button class="action-btn edit-btn" @click="startEdit(customer)">✏️</button>
                        <button class="action-btn delete-btn" @click="deleteCustomer(customer.id)">🗑️</button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="info-row">
                        <span class="info-label">Имя:</span>
                        <span class="info-value" v-if="!customer.editing">{{ customer.name }}</span>
                        <input v-else v-model="customer.editName" class="edit-input" type="text">
                    </div>
                    <div class="info-row">
                        <span class="info-label">Паспорт:</span>
                        <span class="info-value" v-if="!customer.editing">{{ customer.passportDetails }}</span>
                        <input v-else v-model="customer.editPassport" class="edit-input" type="text">
                    </div>
                    <div v-if="customer.editing" class="edit-actions">
                        <button class="save-btn" @click="saveEdit(customer)">Сохранить</button>
                        <button class="cancel-btn" @click="cancelEdit(customer)">Отмена</button>
                    </div>
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
                this.customers = response.data.map(customer => ({
                    ...customer,
                    editing: false,
                    editName: customer.name,
                    editPassport: customer.passportDetails
                }));
            } catch (error) {
                console.error('Ошибка загрузки посетителей:', error);
            } finally {
                this.loading = false;
            }
        },
        async addCustomer() {
            try {
                const response = await axios.post('http://localhost:3001/api/customers', this.newCustomer);
                this.customers.push({
                    ...response.data,
                    editing: false,
                    editName: response.data.name,
                    editPassport: response.data.passportDetails
                });
                this.newCustomer = { name: '', passportDetails: '' };
                console.log('Посетитель добавлен:', response.data);
            } catch (error) {
                console.error('Ошибка добавления посетителя:', error);
                this.error = error.message;
            }
        },
        async deleteCustomer(id) {
            if (!confirm('Вы уверены, что хотите удалить этого посетителя?')) {
                return;
            }
            
            try {
                await axios.delete(`http://localhost:3001/api/customers/${id}`);
                this.customers = this.customers.filter(customer => customer.id !== id);
                console.log('Посетитель удален:', id);
            } catch (error) {
                console.error('Ошибка удаления посетителя:', error);
                this.error = error.message;
            }
        },
        startEdit(customer) {
            customer.editing = true;
            customer.editName = customer.name;
            customer.editPassport = customer.passportDetails;
        },
        async saveEdit(customer) {
            try {
                const response = await axios.put(`http://localhost:3001/api/customers/${customer.id}`, {
                    name: customer.editName,
                    passportDetails: customer.editPassport
                });
                
                customer.name = response.data.name;
                customer.passportDetails = response.data.passportDetails;
                customer.editing = false;
                
                console.log('Посетитель обновлен:', response.data);
            } catch (error) {
                console.error('Ошибка обновления посетителя:', error);
                this.error = error.message;
            }
        },
        cancelEdit(customer) {
            customer.editing = false;
            customer.editName = customer.name;
            customer.editPassport = customer.passportDetails;
        }
    },
    mounted() {
        this.fetchReceipt();
    }
}
</script>

<style scoped>
/* Общие стили */
.section-title {
    text-align: left;
    color: #7c3aed;
    font-size: 1.8em;
    font-weight: 600;
    margin: 30px 0 20px 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e9d5ff;
}

/* Карточки */
.card-style {
    background: linear-gradient(135deg, #f8f4ff 0%, #f0e8ff 100%);
    border: 2px solid #8b5cf6;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
    transition: all 0.3s ease;
    position: relative;
}

.card-style:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
}

.card-header {
    margin-bottom: 15px;
    border-bottom: 1px solid #e9d5ff;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    color: #7c3aed;
    font-size: 1.2em;
    font-weight: 600;
    margin: 0;
}

/* Кнопки действий */
.card-actions {
    display: flex;
    gap: 5px;
}

.action-btn {
    background: none;
    border: none;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
}

.edit-btn:hover {
    background: rgba(139, 92, 246, 0.1);
    transform: scale(1.1);
}

.delete-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: scale(1.1);
}

/* Форма редактирования */
.edit-input {
    border: 1px solid #c4b5fd;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.9em;
    width: 100%;
    background: white;
}

.edit-input:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
}

.edit-actions {
    display: flex;
    gap: 8px;
    margin-top: 10px;
}

.save-btn, .cancel-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s ease;
}

.save-btn {
    background: #10b981;
    color: white;
}

.save-btn:hover {
    background: #059669;
    transform: translateY(-1px);
}

.cancel-btn {
    background: #6b7280;
    color: white;
}

.cancel-btn:hover {
    background: #4b5563;
    transform: translateY(-1px);
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* Форма добавления */
.add-customers-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.form-container {
    max-width: 500px;
}

.customer-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

/* Инпуты */
.inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    position: relative;
}

.inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid #c4b5fd;
    background: transparent;
    border-radius: 20px;
    width: 100%;
    transition: all 0.3s ease;
    color: #4c1d95;
}

.inputGroup input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.inputGroup label {
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #6d28d9;
    font-weight: 500;
}

.inputGroup :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0;
    margin-left: 1.3em;
    padding: 0.4em;
    background: #f8f4ff;
    color: #7c3aed;
}

/* Кнопка добавления */
.submit-btn {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    align-self: flex-start;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
}

/* Элементы карточек */
.info-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.info-label {
    color: #6d28d9;
    font-weight: 500;
    min-width: 60px;
    font-size: 0.9em;
}

.info-value {
    color: #4c1d95;
    background: rgba(139, 92, 246, 0.1);
    padding: 4px 12px;
    border-radius: 12px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    word-break: break-word;
}

/* Сетка карточек */
.customers-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.customer-card {
    min-height: 150px;
}

/* Адаптивность */
@media (max-width: 1024px) {
    .customers-container {
        grid-template-columns: repeat(2, 1fr);
        max-width: 800px;
    }
    .form-container { max-width: 400px; }
}

@media (max-width: 768px) {
    .customers-container {
        grid-template-columns: 1fr;
        max-width: 500px;
    }
    .form-container { 
        max-width: 100%;
        margin: 0 20px;
    }
    .section-title {
        margin-left: 20px;
        font-size: 1.5em;
    }
    .card-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .customers-container {
        padding: 10px;
        gap: 15px;
    }
    .card-style { padding: 20px; }
    .info-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    .info-label { min-width: auto; }
    .form-container {
        padding: 20px;
        margin: 0 10px;
    }
    .section-title {
        margin-left: 10px;
        font-size: 1.3em;
    }
}
</style>