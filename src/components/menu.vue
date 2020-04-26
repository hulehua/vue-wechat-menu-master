<template>
<div>
<!-- 公众号设置 -->
<el-col :span="24" style=" margin-top: 10px;">
<h2 style="font-weight: 300; margin-left: 20px; font-size: 22px;">公众号设置</h2>
<!-- 预览功能 -->


            <div class="flex" v-if="openpreview"></div>
            <div class="preview" v-if="openpreview">
              <div class="previewcon">
                <img class="previewimg" :src="previewimg" />
                <div class="previewtextbot">
                    <div class="previewli" 
                    :class="{'previewlione':list.length == 1,'previewlitwo':list.length == 2}"  
                    v-for="(item,indx) in list" :key="indx" >
                        <div class="previewtianjia" v-if="previewtext == indx">
                            <a class="previewaddadd" 
                            v-for="(item,index) in item.list"
                            :href="item.http" target="view_window"
                             :key="index">{{item.name}}</a>
                            <div class="previewarrow" v-if="item.list.length > 0"></div>
                        </div>
                        <div class="previewtext" v-if="item.list.length > 0"  @click="preview(item,indx)">{{item.name}}</div>
                        <a class="previewtext" v-if="item.list.length == 0" 
                         :href="item.http" target="view_window"
                        @click="preview(item,indx)">{{item.name}}</a>
                    </div>
                </div>
              </div>
              <el-button type="primary" style="display: block;margin: 10px auto;" @click="out">退出预览</el-button>
            </div>



            <!-- <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple warning">
                    <p>
                        <i class="el-icon-warning tips"></i>温馨提示:
                        <span class="on">立即授权</span>
                    </p>
                    <p>微信公众号提现需要特约商户签约，材料交给我们代为提交。签约费用500元</p>
                </div>
            </el-col> -->
            <el-col :span="24" style=" margin-top: 30px;">
                <el-col :span="5" class="left">
                    <img class="top" :src="top" />
                    <img class="bottom" :src="bottom" />
                    <div style="background: #F4F5F9; min-height: 438px; position: absolute;
                top: 63px; width: 320px;  ">
                    </div>
                    <div class="textbot">
                        <div class="li" v-for="(item,indx) in list" :key="indx" >
                            <div v-if="activeClass == indx">
                                <div class="add" @click="add(indx)">
                                  <i class="el-icon-plus"></i>
                                  <div class="arrow"></div>
                                </div>
                                <div class="tianjia">
                                    <div class="addadd" v-for="(item,index) in item.list" :key="index" 
                                    :class="addindex == index  ? 'active':''" @click="gettem(item,index)">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="text" :class="activeClass == indx ? 'active':''" @click="getItem(item,indx)">{{item.name}}</div>
                        </div>
                        <div class="li" v-if="list.length < 3">
                            <div class="text" @click="addtext"><i class="el-icon-plus"></i></div>
                        </div>
                    </div>
                </el-col>



                <el-col :span="15" style=" padding-left: 20px;">
                    <el-card class="box-card right">
                        <div slot="header" class="clearfix">
                            <span>{{input}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="delet">删除子菜单</el-button>
                        </div>
                        <div style="display: flex;">
                            <label style="line-height: 34px; width:80px;">菜单名称</label>
                            <el-input v-model="input" placeholder="请输入内容" style="width:70%;" ></el-input>
                        </div>
                        <p style="color: #9A8D8D;margin-left: 80px;">仅支持中英文和数字，字数不超过4个汉字或8个字母</p>
                        <div style="display: flex;">
                            <label style="line-height: 34px; width:80px;">菜单内容</label>
                            <el-radio-group v-model="radio" style="line-height: 45px;">
                                <el-radio :label="1">平台模板</el-radio>
                                <el-radio :label="2">跳转的网页</el-radio>
                            </el-radio-group>
                        </div>
                        <div style="background: #fff;padding:10px 0;" v-if="radio == 1">
                            <el-radio-group v-model="radiobottom" style="padding:0 30px;">
                                <p style="margin: 8px 0;" v-for="(item,index) in listlist" :key="index">
                                    <el-radio :label="index">{{item.name}}{{item.http}}</el-radio>
                                </p>
                            </el-radio-group>
                        </div>
                        <div style="background: #fff;padding:10px 0;" v-if="radio == 2">
                            <p style="color: #9A8D8D;margin-left: 30px;">订阅者点击该子菜单会跳到以下链接</p>
                            <div style="display: flex; padding:0 30px;">
                                <label style="line-height: 34px; width:65px;">页面地址</label>
                                <el-input v-model="inputhttp" placeholder="请输入内容" style="width:70%;"></el-input>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="24">
                   <el-button style="display: block;margin: 10px auto;" @click="open">打开预览</el-button>
                    <el-button type="primary" style="display: block;margin: 10px auto;">保存并发布</el-button>
                </el-col>
            </el-col>
        </el-col>
    </div>
</template>
<script>
export default {
  data () {
    return {
      previewimg: '../static/img/previewimg.png',
      previewtext: 0,
      openpreview: false,
      top: '../static/img/top.png',
      bottom: '../static/img/bottom.png',
      activeClass: 0,
      addindex: -1,
      input: '',
      inputhttp: '',
      radio: 1,
      radiobottom: 0,
      shu: 6,
      id: 1,



      list: [
        { name: '菜单一', http: 'https://www.baidu.com/', id: 1, list: [{ 'name': '我是1', http: 'https://www.baidu.com/', id: 4 }] },
        { name: '菜单二', http: 'https://www.baidu.com/', id: 2, list: [{ 'name': '我是2', http: 'https://www.baidu.com/', id: 5 }] },
        { name: '菜单三', http: 'https://www.baidu.com/', id: 3, list: [{ 'name': '我是3', http: 'https://www.baidu.com/', id: 6 }] }
      ],
      listlist: []
    }
  },
  mounted () {
    this.rech()
    this.input = this.list[0].name
    this.inputhttp = this.list[0].http
  },
  watch: {
     // 如果 `input` 发生改变，这个函数就会运行
    input: function () {
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.list[i].list.length; j++) {
          if (this.list[i].list[j].id === this.id) {
            this.list[i].list[j].name = this.input
          }
        }
        if (this.list[i].id === this.id) {
          this.list[i].name = this.input
        }
      }
      this.rech()
    // 限制名字个数
      var temp = 0
      for (var k = 0; k < this.input.length; k++) {
        if (/[\u4e00-\u9fa5]/.test(this.input[k])) {
          temp += 2
        } else {
          temp++
        }
        if (temp > 8) {
          this.input = this.input.substr(0, k)
          this.$message({
            message: '仅支持中英文和数字，字数不超过4个汉字或8个字母',
            type: 'warning'
          })
        }
      }
    },
    inputhttp: function () {
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.list[i].list.length; j++) {
          if (this.list[i].list[j].id === this.id) {
            this.list[i].list[j].http = this.inputhttp
          }
        }
        if (this.list[i].id === this.id) {
          this.list[i].http = this.inputhttp
        }
      }
      this.rech()
    }
  },
  methods: {
    out () {
      this.openpreview = false
    },
    open () {
      this.openpreview = true
    },
    preview (item, index) {
      this.previewtext = index
    },
    //   父元素
    getItem (item, index) {
      this.addindex = -1
      this.activeClass = index  // 把当前点击元素的index，赋值给activeClass
      this.input = item.name
      this.inputhttp = item.http
      this.id = item.id
      this.rech()
    },
    // 子元素
    gettem (item, index) {
      this.addindex = index
      console.log(item)
      this.input = item.name
      this.inputhttp = item.http
      this.id = item.id
      this.rech()
    },
    // 增加
    add (index) {
      this.shu++
      this.list[index].list.push({
        'name': '子菜单' + this.shu, http: 'https://www.baidu.com/', id: this.shu
      })
      this.rech()
    },
    addtext () {
      this.shu++
      this.list.push({
        'name': '菜单' + this.shu, http: 'https://www.baidu.com/', id: this.shu, list: []
      })
      this.rech()
    },
    // 删除
    delet () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].list.length; j++) {
            if (this.list[i].list[j].id === this.id) {
              this.list[i].list.splice(j, 1)
              this.addindex = -1
              this.rech()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          }
          if (this.list[i].id === this.id) {
            this.list.splice(i, 1)
            this.activeClass = -1
            this.rech()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    rech () {
      this.listlist = []
      this.list.forEach(item => {
        this.listlist.push({
          name: item.name,
          http: item.http
        })
        item.list.forEach(item => {
          this.listlist.push({
            name: item.name,
            http: item.http
          })
        })
      })
      for (var i = 0; i < this.listlist.length; i++) {
        if (this.listlist[i].name === this.input) {
          this.radiobottom = i
        }
      }
    }
  }
}
</script>



<style  scoped>
*{
  /* // css页面点击文字出现蓝色底色去掉方法 */
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.flex{
  position: fixed;
  background: #000000;
  opacity: 0.5;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99;
}



.preview{
  position: fixed;
  top: 15%;
  left: 45%;
  z-index: 99;
}
.previewcon{
  position: relative;
}
.previewtextbot {
    position: absolute;
    bottom: 93px;
    left: 65px;
    width: 100%;
}
.previewtext{
    height: 36px;
    display: block;
    text-decoration:none;
    color:#999;
}
.previewli {
    float: left;
    width: 78px;
    line-height: 36px;
    border: 1px solid #E7E7EB;
    background: #FAFAFA;
    text-align: center;
    cursor: pointer;
    color: #999;
    position: relative;
}
.previewlione{
 width: 233px !important;
}
.previewlitwo{
   width: 117px !important;
}
.previewtianjia {
    position: absolute;
    bottom: 55px;
    width: 100%;
    line-height: 36px;
    background: #FAFAFA;
}



.previewaddadd {
    width: 100%;
    line-height: 36px;
    border: 1px solid #E7E7EB;
    background: #fff;
    height: 36px;
    display: block;
    text-decoration:none;
    color:#999;
}
.previewarrow{
    position: absolute;
    bottom: -15px;
    left: 44%;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color:#fff #E6E6E6 #E6E6E6 #E6E6E6;
}
.warning {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 5px 20px;
}



.on {
    text-align: right;
    float: right;
    color: #1890ff;
}



.tips {
    color: #1890ff;
    font-size: 20px;
    margin-right: 10px;
}



.left {
    min-width: 390px;
    min-height: 550px;
    position: relative;
    padding-left: 40px;
}



.top {
    position: absolute;
    top: 0px;
}



.bottom {
    position: absolute;
    bottom: 0px;
}



.textbot {
    position: absolute;
    bottom: 0px;
    left: 82px;
    width: 100%;
}



.active {
    border: 1px solid #44B549 !important;
    color: #44B549 !important;
}



.li {
    float: left;
    width: 93px;
    line-height: 48px;
    border: 1px solid #E7E7EB;
    background: #FAFAFA;
    text-align: center;
    cursor: pointer;
    color: #999;
    position: relative;
}
.text{
    height: 50px;
}
.text:hover {
    color: #000;
}



.add {
    position: absolute;
    bottom: 65px;
    width: 100%;
    line-height: 48px;
    border: 1px solid #E7E7EB;
    background: #FAFAFA;
}
.arrow {
    position: absolute;
    bottom: -16px;
    left: 36px;
    /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 8px;
    border-color:#fff #F4F5F9 #F4F5F9 #F4F5F9;
}
.tianjia {
    position: absolute;
    bottom: 115px;
    width: 100%;
    line-height: 48px;
    background: #FAFAFA;
}



.addadd {
    width: 100%;
    line-height: 48px;
    border: 1px solid #E7E7EB;
    background: #FAFAFA;
    height: 48px;
}



.right {
    background: #F4F5F9;
    min-height: 550px;
 
}
</style>