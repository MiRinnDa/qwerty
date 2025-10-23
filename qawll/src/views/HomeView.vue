<template>
  <div class="home" style="display: flex; justify-content: center;">
    <h1>Добро пожаловать!</h1>
  </div>


<div style="margin-top: 10%; display: flex; justify-content: center;">
  <form action = "/receipt"><button>Перейти к чекам</button></form>
  <form action = "/customers"><button>Перейти к посетителям</button></form>
</div>


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
  color: #7c3aed;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #7c3aed;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #7c3aed;
}

button:hover {
  color: white;
  box-shadow: inset 0 -100 0 0 #7c3aed;
  background-color: #7c3aed;
}

button:active{
  transform: scale(0.9);
}
</style>