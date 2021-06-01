<template>
  <div class="wrapper">
    <div class="title"><span>{{title}}</span></div>
    <div class="select">
      <ItemSelect 
      v-for="(item, index) in options" 
      :key="index" 
      :item="item"
      @itemChange="itemChange"
      @itemSelect="itemSelect(item, index)"
      :hasChildren="existsChildren(item)"
      :class="currentIndex === index ? 'active' : ''"
    />
    </div>
  </div>
</template>

<script>
import ItemSelect from './ItemSelect'

export default {
  name: "Item",
  props: {
    title: {
      type: String
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    isReset: {
      type: Boolean,
      default: false
    },
    deep: {
      type: Number,
      default: 1
    }
  },
  mounted(){
    // console.log('>>>>>>>');
  },
  data () {
    return {
      // 当前选择的分类
      currentIndex: -1,
      // 当前选项是否有子选项
      hasChildren: false
    }
  },
  components: {
    ItemSelect
  },
  created(){
  },
  methods: {
    itemSelect(item, index){
      // console.log(item);
      this.currentIndex = index;
      this.$emit("itemSelect", {
        cateCode: item.nodeId,
        index: index,
        deep: this.deep,
        hasChildren: this.hasChildren
      })
      this.$emit("menuClick")
    },
    existsChildren (item) {
      if(item.childNodes && item.childNodes.length > 0){
        return true
      }
      return false
    },
    itemChange (payload) {
      // console.log(payload);
      this.hasChildren = payload.hasChildren
    }
  },
  watch: {
    "isReset": function(val){
      this.currentIndex = -1;
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 200px;
  height: 100%;
  /* background-color: gray; */
  border: 2px solid #DCDFE6;
  box-sizing: border-box;
  margin-top: 5px;
  margin-right: 5px;
}

.title{
  text-align: center;
  padding: 8px 0;
  border-bottom: 1px solid #DCDFE6;
}

.select{
  width: 100%;
}

.active{
  color: #409EFF;
}
</style>
