<script setup>
import E from 'wangeditor'
import { onMounted } from 'vue';

const props = defineProps({
    content: String
})
const emit = defineEmits(['event'])
onMounted(() => {
    const editor = new E('#myEditor')
    // 或者 const editor = new E( document.getElementById('div1') )
    // editor.config.width = 500
    editor.create()
    // console.log(prop.content);
    props.content && editor.txt.html(props.content)
    
    editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        emit('event', newHtml)
    };
})
</script>

<template>
    <div id="myEditor"></div>
</template>