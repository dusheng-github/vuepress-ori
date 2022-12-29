# 动画属性介绍

| 属性&emsp;&emsp;          | 描述                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| animation                 | 所有动画属性的简写属性。                                                                 |
| animation-name            | 规定 @keyframes 动画的名称                                                               |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                                         |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"。                                                      |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| animation-delay           | 规定动画何时开始。默认是 0。如果是负数, 这表示动画从n秒的地方开始                                                             |
| animation-iteration-count | 规定动画被播放的次数。默认是 1。                                                         |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"。                                      |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是 "running"。                                           |

<DemoContainer title="示例： 动画演示">
<div style="height: 400px; display: flex; justify-content: space-between">
 <div style="width: 60%">
 <div  class="animate" ref="animate"></div>
 </div>
 <div v-if="show" class="control" style="width: 500px">
<el-form ref="form" :model="form" label-width="180px" size="mini" :rules="rules">
  <el-form-item label="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="duration">
    <el-input v-model="form.duration" type="number"><template slot="append">s</template></el-input>
  </el-form-item>
  <el-form-item label="timing-function">
    <el-select v-model="form.timingFunction" placeholder="请选择播放速度曲线">
      <el-option label="ease" value="ease"></el-option>
      <el-option label="ease-in" value="ease-in"></el-option>
      <el-option label="ease-out" value="ease-out"></el-option>
      <el-option label="ease-in-out" value="ease-in-out"></el-option>
      <el-option label="linear" value="linear"></el-option>
      <el-option label="cubic-bezier函数" value="cubic-bezier"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="delay">
    <el-input v-model="form.delay" type="number"><template slot="append">s</template></el-input>
  </el-form-item>
  <el-form-item label="iteration-count">
    <el-select v-model="form.count" placeholder="请选择动画被播放的次数">
      <el-option label="1" :value="1"></el-option>
      <el-option label="2" :value="2"></el-option>
      <el-option label="infinite" value="infinite"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="direction">
    <el-select v-model="form.direction" placeholder="请选择是否循环交替反向播放动画">
      <el-option label="normal" value="normal"></el-option>
      <el-option label="reverse" value="reverse"></el-option>
      <el-option label="alternate" value="alternate"></el-option>
      <el-option label="alternate-reverse" value="alternate-reverse"></el-option>
      <el-option label="initial" value="initial"></el-option>
      <el-option label="inherit" value="inherit"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="onSubmit" size="mini">执行</el-button>
    <el-button size="mini"  @click="reset">重置</el-button>
  </el-form-item>
</el-form>
 </div>
 </div>

 <style  lang="scss">
    .animate {
	width:100px;
	height:100px;
	background:red;
	position:relative;
	animation: var(--a)
}
@keyframes myfirst
{
	0%   {background:red; left:0px; top:0px;}
	25%  {background:yellow; left:200px; top:0px;}
	50%  {background:blue; left:200px; top:200px;}
	75%  {background:green; left:0px; top:200px;}
	100% {background:red; left:0px; top:0px;}
}
 </style>
<script>
    export default {
        name: 'form',
        mounted() {
        setTimeout(this.onSubmit, 1000)
        },
    data() {
      return {
        form: {
          name: 'myfirst',
          duration: '5',
          timingFunction: 'linear',
          delay: '1',
          count: 'infinite',
          direction: 'alternate'
          },
        show: true,
        rules: {
            name: [
            { type: 'required', required: true, message: '请输入动画名称', trigger: 'blur' }
          ],
            duration: [
            { type: 'required', required: true, message: '请输入动画运行时间', trigger: 'blur' }
          ],
            delay: [
            { type: 'required', required: true, message: '请输入动画延迟时间', trigger: 'blur' }
          ],
        }
        }
      },
        methods: {
            onSubmit() {
            this.$refs.form.validate((valid) => {
                if(!valid) return 
            })
            const { name, duration, timingFunction, delay, count, direction } = this.form
             this.$refs.animate.style.setProperty('--a', `${name} ${duration}s ${timingFunction} ${delay}s ${count} ${direction}`)         
      },
      reset() {
        this.form = this.$options.data().form
        this.onSubmit()
      }
        },
    }
</script>
</DemoContainer>

```css
.animate {
    width:100px;
    height:100px;
    background:red;
    position:relative;
    animation: myfirst 5s linear 1s infinite alternate;
}
@keyframes myfirst
{
	0%   {background:red; left:0px; top:0px;}
	25%  {background:yellow; left:200px; top:0px;}
	50%  {background:blue; left:200px; top:200px;}
	75%  {background:green; left:0px; top:200px;}
	100% {background:red; left:0px; top:0px;}
}
```
