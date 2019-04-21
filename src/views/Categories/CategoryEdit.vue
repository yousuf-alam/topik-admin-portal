<template>
    <b-card class="m-4">

        <b-tabs pills card>
            <b-tab title="Basic Info" active>
                <b-card-text>
                    <div class="form-group">
                        <label for="name">Name*</label>

                        <input type="text" name="name" class="form-control" id="name">
                    </div>


                    <div class="form-group">
                        <label for="category_description">Short Description</label>
                        <textarea class="form-control" name="short_description" id="category_description"
                                  rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="simpleMde">Long Description</label>
                        <textarea class="form-control" name="long_description" rows="10" id="tinyMceExample"></textarea>

                    </div>


                    <div class="form-group">
                        <label for="meta_titile">Meta Title</label>

                        <input type="text" name="meta_titile" class="form-control" id="meta_titile">
                    </div>


                    <div class="form-group">
                        <label for="meta_description">Meta Description</label>
                        <textarea class="form-control" name="meta_description" id="meta_description"
                                  rows="10"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="video_link">video Link</label>

                        <input type="text" name="video_link" class="form-control" id="video_link">
                    </div>

                    <div class="custom-control mb-3 custom-checkbox">
                        <input type="checkbox" name="published_status" class="custom-control-input" value="1"
                               id="customCheck1">
                        <label class="custom-control-label" for="customCheck1">publish</label>
                    </div>
                    <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                    </b-button>
                </b-card-text>
            </b-tab>
            <b-tab title="Change Banner">
                <b-card-text>
                    <form>
                        <div class="form-group row ">
                            <label class="col-md-3 control-label">Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="">
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file"  name="banner">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label class="col-md-3 control-label">App Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="" >
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file" name="app_banner"  data-show-preview="true">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-9">
                                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                                </b-button>
                            </div>
                        </div>
                    </form>
                </b-card-text>
            </b-tab>
            <b-tab title="Change Thumbnail">
                <b-card-text>
                    <form>
                        <div class="form-group row ">
                            <label class="col-md-3 control-label">Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="">
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file"  name="banner">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label class="col-md-3 control-label">App Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="" >
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file" name="app_banner"  data-show-preview="true">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-9">
                                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                                </b-button>
                            </div>
                        </div>
                    </form>
                </b-card-text>
            </b-tab>
            <b-tab title="Change Icon">
                <b-card-text>
                    <form>
                        <div class="form-group row ">
                            <label class="col-md-3 control-label">Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="">
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file"  name="banner">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label class="col-md-3 control-label">App Banner *</label>
                            <div class="col-md-9">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="" >
                                    </div>

                                    <div>
																	<span class="btn default btn-file">
																		<span class="fileinput-new"> Select image </span>
																		<input type="file" name="app_banner"  data-show-preview="true">
																	</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-9">
                                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Service
                                </b-button>
                            </div>
                        </div>
                    </form>
                </b-card-text>
            </b-tab>
        </b-tabs>

    </b-card>
</template>

<script>
    export default {
        name: "CategoryEdit"
    }
</script>

<style scoped>
    .nav-pills .nav-link {
        border-radius: 1.5rem;
        border: 1px solid #d0d2d4;
    }
    .nav-link {
        display: block;
        padding: 0.5rem 2rem;
        margin: 0rem 2rem;
    }
</style>