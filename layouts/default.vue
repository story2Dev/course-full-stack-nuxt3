<template>
    <div>
        <nav>
            <nuxt-link to="/">Home</nuxt-link> |
            <nuxt-link to="/products">Product</nuxt-link> |
            <nuxt-link to="/about-us">About Us</nuxt-link> |
            <nuxt-link to="/login">Login</nuxt-link> |
            <nuxt-link to="/settings">settings</nuxt-link> 
        </nav>
       <slot /> 
    </div>
</template>

<style>
a {
    text-decoration: none;
}
</style>