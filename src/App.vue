<template>
  <div id="app">
    <AppNavbar />
    <div class="container mb-5 mt-5">
      <div class="row">
        <div class="col-md-8 col-sm-12 mx-auto">
          <div class="card">
            <div class="card-header">
              <h3 class="text-primary">File Upload Form</h3>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label
                  class="text-primary font-weight-bold font-size-sm"
                  for="single-uploader-component"
                >Single File Uploader</label>
                <SingleUpload api-url="/images/single-upload" id="single-uploader-component" />
              </div>
              <hr />
              <div class="form-group">
                <label
                  class="text-primary font-weight-bold font-size-sm"
                  for="multiple-uploader-component"
                >Multiple File Uploader</label>
                <MultiUpload api-url="/images/multi-upload" id="multiple-uploader-component" />
              </div>
              <hr />
              <div class="form-group">
                <label
                  class="text-primary font-weight-bold font-size-sm"
                  for="dropzone-component"
                >Dropzone</label>
                <Dropzone api-url="/images/single-upload" id="dropzone-component" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Dropzone from "./components/UI_components/Dropzone";
import SingleUpload from "./components/UI_components/SingleUpload";
import MultiUpload from "./components/UI_components/MultipleUpload";
export default {
  name: "App",
  components: {
    Dropzone,
    MultiUpload,
    SingleUpload,
  },
};
</script>
