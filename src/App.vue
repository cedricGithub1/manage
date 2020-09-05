<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
   @import './style/reset.css';
   #app{
     height: 100%;
     width: 100%
   }
   .el-pagination{
     margin-top: 20px;
     float: right;
   }
</style>
