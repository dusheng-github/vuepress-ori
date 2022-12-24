<template>
    <div class="component-upload-image">
      <el-upload
        multiple
        action=""
        list-type="picture-card"
        :on-success="handleUploadSuccess"
        :before-upload="handleBeforeUpload"
        :limit="limit"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        name="file"
        :on-remove="handleRemove"
        :show-file-list="true"
        :headers="headers"
        :file-list="fileList"
        :http-request="changeFile"
        :disabled="disabled"
        :on-preview="handlePictureCardPreview"
        :class="{ hide: fileList.length >= limit }"
      >
        <i class="el-icon-plus" />
      </el-upload>
  
      <!-- 上传提示 -->
      <div v-if="showTip" slot="tip" class="el-upload__tip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的图片
      </div>
  
      <el-dialog
        :visible.sync="dialogVisible"
        title="预览"
        width="800"
        append-to-body
      >
        <img
          :src="dialogImageUrl"
          style="display: block; max-width: 100%; margin: 0 auto"
        >
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { uploadFile } from "../api/index";
  console.log(uploadFile);
  export default {
    name: 'A',
    props: {
      value: [String, Object, Array],
      // 图片数量限制
      limit: {
        type: Number,
        default: 5,
      },
      // 大小限制(MB)
      fileSize: {
        type: Number,
        default: 5,
      },
      // 文件类型, 例如['png', 'jpg', 'jpeg']
      fileType: {
        type: Array,
        default: () => ["png", "jpg", "jpeg", "bmp"],
      },
      // 是否显示提示
      isShowTip: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      isOrigin: {
        type: Boolean,
        default: false,
      },
    },
    data: {
        number: 0,
        uploadList: [],
        dialogImageUrl: "",
        dialogVisible: false,
        hideUpload: false,
        baseUrl: process.env.VUE_APP_BASE_API,
        show: true,
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
        headers: {
        //   token: getToken(),
        },
        fileList: [],
    
    },
    computed: {
      // 是否显示提示
      showTip: {
        get() {
          return this.isShowTip &&  this.show && (this.fileType || this.fileSize);
        },
      },
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            console.log(val, 44);
            // 首先将值转为数组
            let list = Array.isArray(val) ? val : this.value.split(",");
            if (Array.isArray(val) && typeof val[0] === 'object') list = val.map(item => item.path || item.url)
            // 然后将数组转为对象数组
            this.fileList = list.map((item) => {
              if (typeof item === "string") {
                if (!item.startsWith('http')) {
                  item = { name: this.baseUrl + item, url: this.baseUrl + item };
                } else {
                  item = { name: item, url: item };
                }
              }
              return item;
            });
          } else {
            this.fileList = [];
            return [];
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.$nextTick(() => {
        const isDisabled = document.querySelector('.component-upload-image .is-disabled')
        isDisabled && (this.show = false)
      })
    },
    methods: {
      // 自定义上传
      changeFile(file) {
        const fd = new FormData();
        fd.append("file", file.file);
        console.log(uploadFile);
        uploadFile(fd)
          .then((res) => {
            if (res.code === 0) {
              this.handleUploadSuccess(res.data);
            }
          })
          .catch((e) => {
            this.$modal.closeLoading();
            this.handleUploadError();
          });
      },
      // 删除图片
      handleRemove(file, fileList) {
        console.log(this.fileList, file.name);
        const findex = this.fileList.map((f) => f.name).indexOf(file.name);
        if (findex > -1) {
          console.log(findex);
          this.fileList.splice(findex, 1);
          this.$emit("input", this.listToString(this.fileList));
        }
      },
      // 上传成功回调
      handleUploadSuccess(res) {
        console.log(res, this.number, this.uploadList.length);
        this.uploadList.push({ name: res.originalFilename, url: res.url });
        if (this.uploadList.length === this.number) {
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;
          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
        }
      },
      // 上传前loading加载
      handleBeforeUpload(file) {
        let isImg = false;
        if (this.fileType.length) {
          let fileExtension = "";
          if (file.name.lastIndexOf(".") > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
          }
          isImg = this.fileType.some((type) => {
            if (file.type.indexOf(type) > -1) return true;
            if (fileExtension && fileExtension.indexOf(type) > -1) return true;
            return false;
          });
        } else {
          isImg = file.type.indexOf("image") > -1;
        }
  
        if (!isImg) {
          this.$modal.msgError(
            `文件格式不正确, 请上传${this.fileType.join("/")}图片格式文件!`
          );
          return false;
        }
        if (this.fileSize) {
          const isLt = file.size / 1024 / 1024 < this.fileSize;
          if (!isLt) {
            this.$modal.msgError(`上传头像图片大小不能超过 ${this.fileSize} MB!`);
            return false;
          }
        }
        this.$modal.loading("正在上传图片，请稍候...");
        this.number++;
      },
      // 文件个数超出
      handleExceed() {
        this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
      },
      // 上传失败
      handleUploadError() {
        this.$modal.msgError("上传图片失败，请重试");
        this.$modal.closeLoading();
      },
      // 预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //
      listToString(list) {
        if (this.isOrigin) return list
        return this.limit > 1 ? list.map((item) => item.url) : list[0]?.url || "";
      },
    },
  };
  </script>
  <style scoped lang="scss">
  // .el-upload--picture-card 控制加号部分
  ::v-deep.hide .el-upload--picture-card {
    display: none;
  }
  // 去掉动画效果
  ::v-deep .el-list-enter-active,
  ::v-deep .el-list-leave-active {
    transition: all 0s;
  }
  
  ::v-deep .el-list-enter,
  .el-list-leave-active {
    opacity: 0;
    transform: translateY(0);
  }
  
  ::v-deep .is-disabled + .el-upload--picture-card {
    display: none;
  }
  div:has( .is-disabled) + .el-upload__tip {
    display: none;
  }
  </style>
  