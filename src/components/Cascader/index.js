/**
 * 根据deep获取对应的数据集合
 * data 数据
 * path 查找数据的路径
 */
export function getData(data,path){
  let res = [];
  path = path.slice(1, path.length);
  res = depthSearch(data, 0,path);
  return res;
}

/**
 * 
 * @param {*} data 数据
 * @param {*} deep 上一次的深度
 * @param {*} path 目标路径 
 * @param {*} res 查找结果
 */
function depthSearch(data, deep,path){
  let res = [];
  let currentDeep = deep;
  currentDeep++;
  let targetDeep = path.length;
  if(targetDeep === 0){
    res.push(...data)
  }else{
    let index = path[currentDeep-1];
    let item = data[index];
    if(item && item.childNodes){
      if(currentDeep < targetDeep){
        res = depthSearch(item.childNodes, currentDeep, path);
      }else{
        res = item.childNodes;
      }
    }
  }
  return res;
}

/**
 * 根据分类编码查询分类
 * @param {*} data 分类树
 * @param {*} cateCode 分类编码
 */
export function dfs(data, cateCode){
  if(data === null || data.length === 0){
    return null;
  }else{
    let res
    data.some(item => {
      if(item.nodeId === cateCode){
        // 如果存在符号| , 则替换为空格
        item.nodeName = item.nodeName.replaceAll('|', ' ')
        res = item
        // 返回true结束当前循环
        return true
      }else{
        res = dfs(item.childNodes, cateCode)
        if(res){
          return true
        }
      }
    })
    return res;
  }
}
