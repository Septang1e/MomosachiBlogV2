<script setup lang="ts">
import {onBeforeMount, onMounted, ref, watch} from "vue";

const props = defineProps({
    borderStyle: String,
    margin: String,
    color: String
})
const style = ref({
    border: '',
    margin: '',
    fontSize: '200px',
    color: ''
})
watch(props, updateStyle, { deep: true, immediate: true })
function updateStyle() {
    if (props.borderStyle) style.value.border = props.borderStyle
    if (props.margin) style.value.margin = props.margin
    if (props.color) style.value.color = props.color
}
onMounted(()=>{
    updateStyle()
})


</script>

<template>
    <div :style="style"></div>
</template>

<style scoped>
</style>