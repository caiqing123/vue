<template>
    <div id="firstcomponent">
        <h1>组件.</h1>
        <a>by {{ author }} </a>
    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {
                author: "测试组件"
            }
        }
    }
</script>

<style>
</style>