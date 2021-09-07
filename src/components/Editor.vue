<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch } from '@vue/runtime-core';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: '<p>I’m running tiptap with Vue.js. 🎉</p>',
    extensions: [
      StarterKit,
    ],
    onUpdate() {
      emit('update:modelValue', editor.value.getHTML())
    }
})

watch(() => props.modelValue, () => {
  if (editor.value && props.modelValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(props.modelValue)
  }
}, { immediate: true })
</script>