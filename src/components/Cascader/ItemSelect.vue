<template>
  <div class="item-select" @click="itemClick">
    <div class="title"><span>{{item.nodeName | itemFilter}}</span></div>
    <i class="el-icon-arrow-right" v-if="hasChildren"></i>
  </div>
</template>

<script>
export default {
  name: "ItemSelect",
  props: {
    item: {
      type: Object,
      require: true
    },
    hasChildren: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
    itemClick(){
      this.$emit("itemChange", {
        hasChildren: this.hasChildren
      })
      this.$emit("itemSelect")
    }
  },
  filters: {
    itemFilter(val){
      return val.replaceAll("|", " ");
    }
  }
}
</script>

<style scoped>
.item-select{
  /* width: 100%; */
  height: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  /* background-color: green; */
  padding: 0 10px 3px 5px;
}

.item-select:hover .title{
  color: #409EFF;
}

.title{
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
