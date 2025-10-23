<template>
    <router-view />
    
    <h1 class="section-title">Все чеки</h1>
    
    <div v-if="loading">
        <h3 class="loading-text">Загрузка...</h3>
    </div>
    <div v-else-if="error" class="error-message">Ошибка: {{ error }}</div>
    <div v-else>
        <div v-if="receipt.length" class="receipts-container">
            <div v-for="receipt in receipt" :key="receipt.id" class="receipt-card card-style">
                <div class="card-header">
                    <h3 class="card-title">🧾 Чек</h3>
                </div>
                <div class="card-content">
                    <div class="info-row">
                        <span class="info-label">Дата:</span>
                        <span class="info-value">{{ formatDate(receipt.data) }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Сеанс:</span>
                        <span class="info-value">{{ receipt.sessionName }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Клиент:</span>
                        <span class="info-value">{{ receipt.customerName }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Зал:</span>
                        <span class="info-value">{{ receipt.hallName }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Организация:</span>
                        <span class="info-value">{{ receipt.organizationName }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no-data">
            <p>Чеков не найдено</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ReceiptComponent',
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
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            if (!dateString) return 'Не указана';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                return dateString;
            }
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

.loading-text {
    text-align: center;
    color: #7c3aed;
    margin: 50px 0;
}

.error-message {
    text-align: center;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
    padding: 15px;
    border-radius: 12px;
    margin: 20px;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.no-data {
    text-align: center;
    color: #6b7280;
    margin: 50px 0;
    font-size: 1.1em;
}

/* Карточки */
.card-style {
    background: linear-gradient(135deg, #f8f4ff 0%, #f0e8ff 100%);
    border: 2px solid #8b5cf6;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
    transition: all 0.3s ease;
}

.card-style:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
}

.card-header {
    margin-bottom: 15px;
    border-bottom: 1px solid #e9d5ff;
    padding-bottom: 10px;
}

.card-title {
    color: #7c3aed;
    font-size: 1.2em;
    font-weight: 600;
    margin: 0;
    text-align: center;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* Элементы карточек */
.info-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.info-label {
    color: #6d28d9;
    font-weight: 500;
    min-width: 100px;
    font-size: 0.9em;
    flex-shrink: 0;
}

.info-value {
    color: #4c1d95;
    background: rgba(139, 92, 246, 0.1);
    padding: 6px 12px;
    border-radius: 12px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    word-break: break-word;
    flex-grow: 1;
    font-size: 0.9em;
}

/* Сетка карточек */
.receipts-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.receipt-card {
    min-height: 200px;
}

/* Адаптивность */
@media (max-width: 1024px) {
    .receipts-container {
        grid-template-columns: 1fr;
        max-width: 600px;
    }
}

@media (max-width: 768px) {
    .receipts-container {
        padding: 15px;
        gap: 15px;
    }
    
    .section-title {
        margin-left: 15px;
        font-size: 1.5em;
    }
    
    .card-style {
        padding: 20px;
    }
    
    .info-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .info-label {
        min-width: auto;
    }
    
    .info-value {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .receipts-container {
        padding: 10px;
        gap: 12px;
    }
    
    .card-style {
        padding: 15px;
    }
    
    .section-title {
        margin-left: 10px;
        font-size: 1.3em;
    }
    
    .info-label {
        font-size: 0.85em;
    }
    
    .info-value {
        font-size: 0.85em;
        padding: 4px 10px;
    }
}
</style>