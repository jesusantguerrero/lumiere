<template>
  <div class="rounded-md cursor-pointer ">
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="rounded-md avatar image"
      :style="{ height: size, width: size }"
      @click="openFileDialog"
    />
    <div
      v-else
      class="bg-gray-100 rounded-md avatar no-image"
      :style="{ height: size, width: size }"
      @click="openFileDialog"
    />

    <div :style="{ width: size }" v-if="!disabled">
      <label class="block py-1 mt-2 text-center text-white bg-green-500 cursor-pointer" for="single">
        {{ uploading ? "Uploading ..." : "Upload" }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        ref="fileButton"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue"

export default {
  props: {
    path: String,
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "10em"
    }
  },
  emits: ["upload", "update:path"],
  setup(prop, { emit }) {
    const { path } = toRefs(prop)
    const uploading = ref(false)
    const src = ref("")
    const files = ref()

    const downloadImage = async () => {
      // try {
      //   const { data, error } = await supabase.storage
      //     .from("avatars")
      //     .download(path.value)
      //   if (error) throw error
      //   src.value = URL.createObjectURL(data)
      // } catch (error) {
      //   console.error("Error downloading image: ", error.message)
      // }
    }

    const uploadAvatar = async (evt) => {
      files.value = evt.target.files
      try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
          throw new Error("You must select an image to upload.")
        }

        const file = files.value[0]
        const fileExt = file.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file)

        if (uploadError) throw uploadError
        emit("update:path", filePath)
        emit("upload")
      } catch (error) {
        alert(error.message)
      } finally {
        uploading.value = false
      }
    }

    const fileButton = ref(null);
    const openFileDialog = () => {
      if (props.disabled) return
      fileButton.value.click();
    }

    watch(path, () => {
      path.value ? downloadImage() : ""
    }, { immediate: true })

    return {
      path,
      uploading,
      src,
      files,
      fileButton,

      openFileDialog,
      uploadAvatar,
    }
  },
}
</script>