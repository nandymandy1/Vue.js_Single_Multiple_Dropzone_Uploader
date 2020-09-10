<template>
  <div class="single-upload">
    <div class="d-flex justify-content-around">
      <div class="upload-container d-flex justify-content-center align-items-center">
        <input
          :id="id"
          type="file"
          ref="imageUploader"
          class="input-uploader"
          @change="imageInserted"
        />
        <img class="uploader-icon" src="../../assets/img/upload.png" alt />
      </div>
      <div class="flex-grow-1 d-flex flex-column px-3 justify-content-around">
        <bProgress v-if="isUploading" :value="value" :max="max" show-progress animated />
        <bImg
          v-if="uploadedImage"
          class="mt-1"
          height="80px"
          width="80px"
          :src="uploadedImage"
          thumbnail
          fluid
          alt="Responsive image"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import API from "../../services";
export default {
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    value: 0,
    max: 100,
    file: null,
    isUploading: false,
    uploadedImage: null,
  }),
  methods: {
    imageInserted() {
      this.file = this.$refs.imageUploader.files[0];
      this.$refs.imageUploader.value = null;
      this.uploadImageMethod();
    },
    async uploadImageMethod() {
      let formData = new FormData();
      formData.append("file", this.file);
      this.isUploading = true;
      let { data } = await API.post(this.apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ total, loaded }) => {
          this.value = (loaded / total).toFixed(2) * 100;
        },
      });
      this.uploadedImage = data.imagePath;
      this.file = null;
      this.isUploading = false;
    },
  },
};
</script>