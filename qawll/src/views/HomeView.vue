<template>
  <div class="home">
    <h1>Добро пожаловать!</h1>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 10%;"><form action="/receipt"><button>Перейти к чекам</button></form></div>
  <div style="display: flex; justify-content: center; margin-top: 2%;"><form action="/customers"><button>Перейти к посетителям</button></form></div>
</template>

<style>
button {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 15px 30px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #725AC1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #725AC1;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #725AC1;
}

button:hover {
  color: white;
  box-shadow: inset 0 -100 0 0 #725AC1;
  background-color: #725AC1;
}

button:active{
  transform: scale(0.9);
}
</style>