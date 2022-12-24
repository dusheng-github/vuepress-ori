# element测试

<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }
    }
  }
</script>


```html
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {     b                 
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }
    }
  }
</script>
```


<div style="width:105px">
<EllipsisTooltip text="这是一段用来做组件示例的文字"></EllipsisTooltip>
</div>

```vue
<div style="width:105px">
<EllipsisTooltip text="这是一段用来做组件示例的文字"></EllipsisTooltip>
</div>
```



<div style="width:105px">
<A  ></A>
</div>



<ImageUpload  ></ImageUpload>



