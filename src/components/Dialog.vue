<template>
  <div class="hello">
    <div class="global">
        <div class="divItem">
            输入Paracraft项目ID或以<span style="font-weight: bolder;">https://</span>开头的网址:
        </div>
        <div class="divItem" style="padding-right: 10px;">
            <input type="text" v-model="url" style="width: 100%;height: 30px;" EmptyText="https://" />
        </div>
        <div class="divItem">
            <button style="margin:3px;" @click="onClickCreateWebview()">创建</button>
        </div>
    </div>
  </div>
</template>

<script>
import dlgFunc from './js/dialog.js'
export default {
  name: 'Dialog',
  data(){
      return {
          url : '',
      }
  },
  methods:{
      onClickCreateWebview(){
          return dlgFunc.onClickCreateWebview(this.url)
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global{
    font-size: 15px;
    min-height: 95%;
    }
.divItem{
    margin-left: 5px;
    margin-bottom: 18px;
    font-size: 15px;
    word-wrap:break-word;
    }
</style>
