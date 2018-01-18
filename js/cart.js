//必须写在实例前面，不然会报错Vue.js Failed to resolve filter
//全局过滤器，其实就是再处理操作（此处一般是后台处理好传过来）
Vue.filter("moneyFilter",function(value,type){
  return "¥"+value.toFixed(2)+type;
})
var vm=new Vue({
  el: '#app',
  data:{
    items:[],
    selectAllFlag:false,
    delFlag:false,
    curItem:"",
    totalMoney:0
  },
  //渲染后调用的函数
  mounted:function(){
    this.$nextTick(function(){
      this.cartView();      
    })
  },
  methods:{
    cartView:function(){
      var that=this;
      //then回调函数
      this.$http.get("data/cartData.json").then(function(res){
        that.items=res.data.result.list;
      });
    },
    changeQuantity:function(item,num){
      if(num>0){
         item.productQuantity++;
       }
      else{
        item.productQuantity--;
        if(item.productQuantity<1){
          item.productQuantity=1;
        }
      }
      this.calcTotalPrice();
    },
    selectedProduct:function(item){
      //添加属性
      if(typeof item.checked == "undefined"){
        this.$set(item,"checked",true)
      }
      else{
        item.checked=!item.checked;
      }
      this.calcTotalPrice();
    },
    selectAll:function(flag){
      var that=this;
      this.selectAllFlag=flag;
      // 遍历，注意this
      this.items.forEach(function(item,index){
        if(typeof item.checked == "undefined"){
          that.$set(item,"checked",flag)
        }
        else{
          item.checked=flag;
        }
      })
      //记得加this
      this.calcTotalPrice();
    },
    delConfirm:function(item){
      this.delFlag=true;
      this.curItem=item;
    },
    delProduct:function(){
      //删除数组某一项
      var index=this.items.indexOf(this.curItem);
      this.items.splice(index,1);
      this.delFlag=false;
    },
    calcTotalPrice:function(){
      var that=this;
      this.totalMoney=0;
      this.items.forEach(function(item,index){
        if(item.checked){
          that.totalMoney+=item.productQuantity*item.productPrice
        }
      })
    }
  }
});

