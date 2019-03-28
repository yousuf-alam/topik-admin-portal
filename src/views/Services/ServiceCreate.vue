<template>
    <b-card class="m-4">
        <h5 class="mb-4">Create Service</h5>
        <div class="form-group">
            <label for="name">Name*</label>

            <input type="text" name="name" class="form-control"  id="name">
        </div>


        <div class="form-group">
            <label for="category_description">Short Description</label>
            <textarea class="form-control" name="short_description" id="category_description" rows="3" ></textarea>
        </div>

        <div class="form-group">
            <label for="simpleMde">Long Description</label>
            <textarea class="form-control" name="long_description" rows="10" id="tinyMceExample"></textarea>

        </div>


        <div class="form-group">
            <label for="meta_titile">Meta Title</label>

            <input type="text" name="meta_titile" class="form-control"  id="meta_titile" >
        </div>


        <div class="form-group">
            <label for="meta_description">Meta Description</label>
            <textarea class="form-control" name="meta_description" id="meta_description" rows="10" ></textarea>
        </div>

        <div class="form-group">
            <label for="video_link">video Link</label>

            <input type="text" name="video_link" class="form-control"  id="video_link" >
        </div>

        <div class="custom-control mb-3 custom-checkbox">
            <input type="checkbox" name="published_status" class="custom-control-input" value="1"  id="customCheck1">
            <label class="custom-control-label" for="customCheck1">publish</label>
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile1">Upload Thumbnail*<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)"  type="file" name="thumbnail" class="form-control-file" id="exampleFormControlFile1" required >
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile2">Upload App Thumbnail*<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)" type="file" name="app_thumbnail" class="form-control-file" id="exampleFormControlFile2" required>
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile3">Upload Banner*<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)" type="file" name="banner" class="form-control-file" id="exampleFormControlFile3" required>
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile4">Upload App Banner*<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)" type="file" name="app_banner" class="form-control-file" id="exampleFormControlFile4" required>
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile5">Upload Icon (svg)<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)" type="file" name="icon_svg" class="form-control-file" id="exampleFormControlFile5">
        </div>

        <div class="form-group">
            <label for="exampleFormControlFile6">Upload Icon(png)<p class="text-danger">(Image Size must be less than 1MB)</p></label>
            <input onchange="ValidateSize(this)" type="file" name="icon_png" class="form-control-file" id="exampleFormControlFile6">
        </div>

        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Service</b-button>
    </b-card>
</template>

<script>
    export default {
        name: "ServiceCreate"
    }
</script>

<style scoped>

</style>