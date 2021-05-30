<template>
    <div class="app-wrapper">
        <el-container class="app-box">
            <el-aside :width="asideShow ? '64px' : '200px'" class="main-aside">
                <sidebar class="sidebar-container" :collapse="asideShow"></sidebar>
            </el-aside>
            <el-container class="main">
                <el-header class="heads" height='50px'>
                    <Headers :asideShow.sync="asideShow" @targetIcon='targetIcon'></Headers>
                </el-header>
                <el-main class="main-container">
                    <TagsViews />
                    <div class="main-container-views">
                        <transition name="nodebook" mode="out-in">
                            <router-view />
                        </transition>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-backtop target=".main-container-views" :bottom="100">
            <div class="scrollTop" >
            <i class="el-icon-upload2" ></i>
            </div>
        </el-backtop>
        
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar/index.vue'
import Headers from '../components/Headers/Headers.vue'
import TagsViews from '../components/TagView/TagsView.vue'

export default {
    data(){
        return {
            asideShow: true
        }
    },
    components: {
        Sidebar,
        Headers,
        TagsViews
    },
    methods:{
        targetIcon(boole){
            this.asideShow = boole
        }
    }
}
</script>

<style>
.app-wrapper{
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.app-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 2s;
}
.heads{
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #dcdfe6;
}
.main{
    width: 100%;
    height: 100%;
    overflow: hidden!important;
}
.main-aside{
    height: 100%;
    background: #304156;
    transition:  all 0.5s;
}
.main-container{
    width: 100%;
    height: 100%;
    padding: 0 !important;
}
.el-menu{
    border: none !important;
}
.main-container-views{
    width: 100%;
    height: calc(100% - 35px);
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none; 
    overflow: '-moz-scrollbars-none';
    scrollbar-width: none;  /*  火狐   */
    background: #F5F7F9;
}
.main-container-views::-webkit-scrollbar {
    display: none;  /*  Chrome  */
    width: 0 !important ; /*  Chrome  */
  }

.scrollTop{
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .5);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
    font-size: 30px;
    font-weight: bolder;
}

.nodebook-enter, .nodebook-leave-to{
    transform: scale(0.9);
    opacity: 0;
}

.nodebook-enter-to, .nodebook-leave{
    transform: scale(1);
    opacity: 1;
}
.nodebook-enter-active, .nodebook-leave-active {
    transition: all 0.3s;
}
</style>