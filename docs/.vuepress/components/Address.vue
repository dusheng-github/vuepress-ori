<template>
  <el-row :gutter="16" type="flex" justify="space-between">
    <el-col :span="12">
      <el-cascader
        ref="cascader"
        v-model="regionValue"
        :options="regionData"
        style="width: 100%"
        filterable
        :props="{ expandTrigger: 'hover', value: 'label' }"
        @change="handleAddressChange"
      />
    </el-col>
    <el-col v-if="hasAddress" :span="12">
      <el-input
        v-model="address"
        placeholder="请输入地址"
        @change="handleChange"
      />
    </el-col>
  </el-row>
</template>

<script>
import regionData from "./area.json";

export default {
  props: {
    address: {
      type: String,
      default: ""
    },
    region: {
      type: [String],
      default: ""
    },
    joinStr: {
      type: String,
      default: "-"
    },
    hasAddress: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      regionData,
      regionValue: []
    };
  },
  watch: {
    region: {
      handler(val) {
        this.regionValue = val.split(this.joinStr);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleAddressChange(val) {
      this.$emit("update:region", val.join(this.joinStr));
    },
    handleChange(val) {
      this.$emit("update:address", val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
