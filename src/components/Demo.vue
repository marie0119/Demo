<template>
  <div class="demo">
    <div class="fix-nav">
      <ul class="nav">
        <li class="nav-item" :class="{active:activeId==0}" @click="tabHandle(0)">SWT交换区</li>
        <li class="nav-item" :class="{active:activeId==1}" @click="tabHandle(1)">JETH交换区</li>
        <li class="nav-item" :class="{active:activeId==2}" @click="tabHandle(2)">CNY交换区</li>
      </ul>
      <ul class="title-box">
        <li class="title-item title-item1 ">市场</li>
        <li class="title-item title-item2">当前价</li>
        <li class="title-item title-item3">日涨跌</li>
        <li class="title-item title-item4">K线</li>
      </ul>
    </div>
    <div class="content">
      <div class="row" v-for="(item,index) in arr">
        <div class="row-item row-item1">
          <div class="name">{{item.name}}/<span v-if="activeId==0">SWT</span><span v-else-if="activeId==1">JETH</span><span v-else-if="activeId==2">CNY</span></div>
          <div class="num">量 {{item.num}}</div>
        </div>
        <div class="row-item row-item2 txtOverflow">
          <div class="txtOverflow" :class="item.updown>0?'color':'original'">{{item.price}}</div>
          <div class="label">￥{{item.price2}}</div>
        </div>
        <div class="row-item row-item3">
          <div :class="{color:item.updown>0}">
            <span v-if="item.updown>0">+</span>{{item.updown}}<span v-if="item.updown!='--'">%</span>
          </div>
        </div>
        <div class="row-item row-item4">
          <div class="btn-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {publicFun} from '@/plugins/public'

  import {getData} from "@/plugins/ajax"

  export default {
    name: "Demo",
    data() {
      return {
        swt: [],
        eth: [],
        cny: [],
        activeId: 0,
        arr:[]
      }
    },
    mounted() {
      this._initData();
    },
    methods: {
      tabHandle(id) {
        this.activeId = id;
        if(id==0){
          this.arr=this.swt;
        }else if(id==1){
          this.arr=this.eth;
        }else if(id==2){
          this.arr=this.cny;
        }
      },
      _initData() {
        let data = {
          // page: 1
        }
        getData(data).then(res => {
          let data = res.data.data;
          for (let key in data) {
            let obj = {}
            obj.key=key;
            obj.name = key.split('-')[0]
            obj.date = data[key][0];
            obj.price = data[key][1];
            if(data[key][1].toString().split('.')[1]!=undefined&&data[key][1].toString().split('.')[1].length>5){
              obj.price2 = data[key][1].toFixed(6);
            } else {
              obj.price2 = data[key][1]
            }
            if(data[key][2]){
              obj.updown =(data[key][2]*100).toFixed(2);
            }else{
              obj.updown ='--'
            }
            obj.topPrice = data[key][3];
            obj.lowPrice = data[key][4];
            obj.num = data[key][5] == undefined ? '--' : data[key][5].toFixed(3);
            if(obj.key.includes('SWT')){
              this.arr.push(obj);
              this.swt.push(obj);
            }
            if(obj.key.includes('JETH')){
              this.eth.push(obj);
            }
            if(obj.key.includes('CNY')){
              this.cny.push(obj);
            }
          }
          console.log(this.arr)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .demo {
    .fix-nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      background-color: #232b34
    }
    .nav {
      color: #fff;
      display: flex;
      border-bottom: .02rem solid #666;
      padding: 0 .3rem;
      box-sizing: border-box;
      .nav-item {
        height: .85rem;
        flex: 1;
        text-align: center;
        line-height: .85rem;
      }
      .active {
        color: #f2963a;
        border-bottom: .06rem solid #f2963a;
        font-weight: 500;
      }
    }
    .title-box {
      display: flex;
      .title-item {
        color: #fff;
        height: .72rem;
        line-height: .72rem;
        font-size: .26rem;
        box-sizing: border-box;
      }
      .title-item1 {
        flex: 0 0 2.3rem;
        padding-left: .3rem;
      }
      .title-item2 {
        flex: 0 0 2.5rem;
        text-align: right;
      }
      .title-item3 {
        flex: 0 0 1.5rem;
        text-align: right;
      }
      .title-item4 {
        flex: 0 0 1.2rem;
        text-align: right;
        padding-right: .2rem;

      }
    }
    .content {
      background: #000;
      color: #fff;
      padding-top: 1.66rem;
      .row {
        display: flex;
        .row-item {
          font-size: .26rem;
          padding: .3rem 0;
          .color{
            color: #d43839;
          }
          .white{
            color: #a1b2ba;
          }
        }
        .row-item1 {
          flex: 0 0 2.3rem;
          padding-left: .3rem;
          box-sizing: border-box;
          .name {
            > span {
              color: #a1b2ba;
              font-size: .24rem;
            }
          }
          .num {
            color: #a1b2ba;
            font-size: .24rem;
            margin-top: .1rem;
          }
        }
        .row-item2 {
          flex: 0 0 2.5rem;
          text-align: right;
          .original {
            color: #16ce79;
          }
          .label {
            color: #a1b2ba;
            margin-top: .1rem;
          }
        }
        .row-item3 {
          flex: 0 0 1.5rem;
          color: #16ce79;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .row-item4 {
          flex: 0 0 1.2rem;
          text-align: right;
          font-size: 0;
          .btn-box {
            display: inline-block;
            width: .4rem;
            height: .3rem;
            border: .02rem solid #666;
            margin-right: .2rem;
          }
        }
      }
    }
  }

</style>
