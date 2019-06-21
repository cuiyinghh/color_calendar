
var app = new Vue({
  el: '#app',
  data: {
    days: [],
    today: null,
    numToWeek: {0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"},
    numToMonth: {0:"一",1:"二",2:"三",3:"四",4:"五",5:"六",6:"七",7:"八",8:"九",9:"十",10:"十一",11:"十二",},
    colorArr: [
      {
        name: "月白",
        value: "#D6ECF0",
        other: "#95c0c8"
      },
      {
        name: "霜色",
        value: "#E9F1F6",
        other: "#b8d8eb"        
      },
      {
        name: "妃色",
        value: "#ED5736",
        other: "#d14729"
      },
      {
        name: "绛紫",
        value: "#8C4356",
        other: "#722e40"
      },
      {
        name: "胭脂",
        value: "#9D2933",
        other: "#87232c"
      },
      {
        name: "茜色",
        value: "#CB3A56",
        other: "#a02b41"
      },
      {
        name: "缃色",
        value: "#F0C239",
        other: "#ba9012"
      }
    ],
    randomIndex: 0
  },
  created: function () {
    this.today = new Date();
    this.today.setHours(8,0,0,0);
    this.initData(this.formatDate(new Date().getFullYear(), new Date().getMonth() + 1, 1));
  },
  
  mounted() {
    this.initColor();
  },

  methods: {
    initColor: function() {
      // 随机选取colorArr中的颜色作为背景色，并且渲染装饰色
      var bodyDom = document.body;
      var colorDom = document.getElementsByClassName('js-color');
      var lineDom = document.getElementsByClassName('js-line');
      var todayDom = document.getElementsByClassName('js-today');
      this.randomIndex = Math.floor(Math.random()*this.colorArr.length);
      bodyDom.style.background = this.colorArr[this.randomIndex].value;
      colorDom[0].style.color = this.colorArr[this.randomIndex].other;
      lineDom[0].style.background = this.colorArr[this.randomIndex].other;
      lineDom[1].style.background = this.colorArr[this.randomIndex].other;
      todayDom[0].style.background = this.colorArr[this.randomIndex].other;
    },

    initData: function(cur) {
      var firstDay = new Date(cur);                 // 当前页，当前月的1号
      var firstWeek = firstDay.getDay();         // 1...6,0
      if (firstWeek == 0) {
        firstWeek = 7;
      }
      this.days.length = 0;

      // 初始化本月1号以前的day
      for (var i = firstWeek - 1; i >= 0; i--) {
        var d = new Date(firstDay);
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }

      // 初始化本月1号以后的day
      for (var i = 1; i <= 42 - firstWeek; i++) {
        var d = new Date(firstDay);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },
    
    // 格式化年月日为2019-01-01
    formatDate: function(year, month, day){
      var y = year;
      var m = month;
      if(m < 10) {m = "0" + m;}
      var d = day;
      if(d < 10) {d = "0" + d;}
      return y + "-" + m + "-" + d;
    }
  }
});