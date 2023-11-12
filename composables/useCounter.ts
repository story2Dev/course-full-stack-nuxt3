export const useCounter = () => {
    const counter = useState('counter', () => 0)

    function increment() {
        counter.value++
    }
    function decrement() {
        counter.value--
    }
    return {
        counter,
        increment,
        decrement
    }
}