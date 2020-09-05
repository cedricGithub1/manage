<template>
  <section>
    <el-container>
      <el-header height='70px' v-if="$route.path != '/voteView'">
        <div><img src="../assets/logo.jpg" alt="">管理系统</div>
        <div><img src='../assets/head.jpg' alt=""><span @click="logout">退出登录</span></div>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="$route.path != '/voteView'">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#052341"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template  v-for="(item,index) in $router.options.routes[1].children">
              <el-menu-item v-if="item.show" :key="index" :index="item.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </section>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    }
  },
  created() {
    console.log(this.$router.options.routes);
  }
};
</script>
<style lang="scss">
section {
  height: 100%;
  width: 100%;
}
.el-header,
.el-aside {
  background-color: #052341;
}
.el-header {
  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  div {
    color: #ffffff;
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  div:nth-child(2) {
    img {
      height: 40px;
      width: 40px;
    }
  }
}
</style>


