<template>
  <div class="multiple-upload">
    <div class="d-flex justify-content-around">
      <div class="upload-container d-flex justify-content-center align-items-center">
        <input
          :id="id"
          multiple
          type="file"
          ref="imageUploader"
          class="input-uploader"
          @change="imagesInserted"
        />
        <img class="uploader-icon" src="../../assets/img/upload.png" alt />
      </div>
      <div class="flex-grow-1 d-flex flex-column px-3 justify-content-around">
        <bProgress v-if="isUploading" :value="value" :max="max" show-progress animated />
      </div>
    </div>
    <div class="d-flex flex-wrap mt-3">
      <bImg
        v-for="img in uploadedImages"
        class="mt-1 mr-2"
        height="80px"
        width="80px"
        :src="img"
        thumbnail
        fluid
        :key="img"
        alt="Responsive image"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from "lodash";
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
    files: null,
    isUploading: false,
    uploadedImages: [],
  }),
  methods: {
    async imagesInserted() {
      this.files = this.$refs.imageUploader.files;
      await this.uploadImagesMethod();
    },
    async uploadImagesMethod() {
      let formData = new FormData();
      console.log("FILES", this.files);
      _.forEach(this.files, (file) => {
        formData.append("files", file);
      });
      this.isUploading = true;
      let { data } = await API.post(this.apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ total, loaded }) => {
          this.value = (loaded / total).toFixed(2) * 100;
        },
      });
      this.uploadedImages = [...this.uploadedImages, ...data];
      this.files = null;
      this.isUploading = false;
      this.$refs.imageUploader.value = null;
    },
  },
};
</script>