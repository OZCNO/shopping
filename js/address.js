var vm=new Vue({
  el: '.container',
  data: {
    addressList:[],
    shoppingMethod:1,
    limitNum:3,
    loadMoreFlag:true,
    currentIndex: 0,
  },
  mounted: function() {
    this.$nextTick(function(){
      this.getAddressList();
    })
  },
  computed: {
    filterAddress:function(){
      //splice是在数组上操作，slice则不是
      return this.addressList.slice(0,this.limitNum);
    }
  },
  methods: {
    getAddressList:function(){
      var _this=this;
      this.$http.get("data/address.json").then(function(res){
        if(res.data.status=="0"){
          _this.addressList=res.data.result;
        }
      })
    },
    loadMore:function(){
      if(this.loadMoreFlag){
        this.limitNum=this.addressList.length
      }
      else{
        this.limitNum=3
      }
      this.loadMoreFlag=!this.loadMoreFlag
    },
    setDefault:function(addressId){
      this.addressList.forEach(function(address,index){
        if(address.addressId==addressId){
          address.isDefault=true
        }
        else{
          address.isDefault=false
        }
      })
      //或者传一个下标
    }
  }

  
});
