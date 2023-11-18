<script setup lang="ts">
const msg = 'Hello World!'
const name = 'Vue 3'
const { counter, increment, decrement } = useCounter()

let counter2 = 0

function increment2() {
  counter.value++
  console.log(counter.value)
}


</script>
<template>
    <div>

        <Icon name="uil:github" color="black" />

        <h1>{{msg}}</h1>
        <div>
            <button @click="counter--">-</button>
           (ref) {{ counter }}
            <button @click="increment2()">+</button>
        </div>

        <div>
            <button @click="counter2--">-</button>
           (no ref) {{ counter2 }}
            <button @click="increment()">+</button>
        </div>
    </div>
</template>

<style scoped>

</style>