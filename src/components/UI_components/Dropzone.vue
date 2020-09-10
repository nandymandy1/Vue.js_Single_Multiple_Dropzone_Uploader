<template>
  <div class="dropzone-upload">
    <div class="d-flex flex-column">
      <div class="upload-container d-flex justify-content-center align-items-center">
        <input
          :id="id"
          type="file"
          ref="imageUploader"
          class="input-uploader"
          @change="imageInserted"
        />
        <div class="d-flex flex-column">
          <img class="uploader-icon align-self-center" src="../../assets/img/upload.png" alt />
          <p class="text-muted align-self-center">Drop your file here</p>
        </div>
      </div>
      <div class="flex-grow-1 mt-2 d-flex flex-column justify-content-around">
        <bProgress v-if="isUploading" :value="value" :max="max" show-progress animated />
      </div>
      <div class="d-flex flex-wrap">
        <bImg
          v-for="img in uploadedImages"
          :key="img"
          class="mt-1 mr-2"
          height="80px"
          width="80px"
          :src="img"
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
    uploadedImages: [],
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
      this.uploadedImages = [...this.uploadedImages, data.imagePath];
      this.file = null;
      this.isUploading = false;
    },
  },
};
</script>