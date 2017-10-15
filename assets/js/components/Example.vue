<template>
  <div id="app">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Sales Summary</h2>
          
            <div class="Chart__container"  >
             <div class="Chart__title">
          	    <button class="myButton" @click="fillDayWeek()">Day / Week </button>
          	    <button class="myButton" @click="fillMonthYear()">Month / Year </button>
                <div class="alert">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                 Click On A Button to Start  
                </div>
                <hr>
                <h2>Sales {{period}}</h2>
             </div>
             <div class="Chart__content" >
                <linechart v-if="loaded" :chart-data="salesDisplay" :chart-labels="labelsDisplay" chart-id="day"></linechart>
             </div>
            </div>    
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Linechart from './LineChart.js'
import axios from 'axios'
import {
    dateToYear,
    dateToMonth,
    dateToWeek,
    dateToDay,
    dateBeautify
  } from '../utils/dateFormatter'

  import { removeDuplicate, groupData } from '../utils/downloadFormatter.js'



 export default {
    components: {
      Linechart

    },	
    data () {
      return {
        loaded: false,
        loading: false,
        sales: [],
        salesYear: [],
        salesMonth: [],
        salesWeek: [],
        salesDay: [],
        salesDisplay:[],
        labels: [],
        labelsYear: [],
        labelsMonth: [],
        labelsWeek: [],
        labelsDay: [],
        labelsDisplay:[],
        showError: false,
        showSettings: false,
        errorMessage: '',
        period: '',
        rawData: '',
        totalSales: '',
        toggleDay:false,
        toggleMonth:false
      }
    },
    mounted () {    
   
        this.requestData()       
    },
    methods: {
      resetState () {
        this.loaded = false
        this.showError = false
      },
      requestData () {
  
        this.resetState()
   
        this.loading = true
        axios.get('https://private-627474-nulisec.apiary-mock.com/sales')
          .then(response => {
         
            this.SortDate(response.data)
            this.rawData = response.data
            this.sales = response.data.map(function (entry) { var tmp = entry.sale.split('$'); return Number.parseInt(tmp.join('')) })
            this.labels = response.data.map(entry => entry.published_at)
            this.totalSales = this.sales.reduce((total, sale) => total + sale)
            this.groupDataByDate()
            this.loaded = true
            this.loading = false
 
            
            
          })
          .catch(err => {
            this.errorMessage = err.response.data.error
            this.showError = true
          })
      },
      SortDate (data) {
        data.sort(function (a, b) {
          return new Date(a.published_at) - new Date(b.published_at)
        })
      },
      validateDataRequest () {
        console.log('ValidateData')
        if (this.packageName !== '' && this.periodStart !== '') {
          this.requestData()
        }
      },
      groupDataByDate () {
        this.formatYear()
        this.formatMonth()
        this.formatWeek()
        this.formatDay()
      },
      formatYear () {
        this.labelsYear = this.rawData
          .map(entry => dateToYear(entry.published_at))
          .reduce(removeDuplicate, [])
        this.salesYear = groupData(this.rawData, dateToYear)
      },
      formatMonth () {
        this.labelsMonth = this.rawData
          .map(entry => dateToMonth(entry.published_at))
          .reduce(removeDuplicate, [])
        this.salesMonth = groupData(this.rawData, dateToMonth)
      },
      formatWeek () {
        this.labelsWeek = this.rawData
          .map(entry => dateToWeek(entry.published_at))
          .reduce(removeDuplicate, [])
        this.salesWeek = groupData(this.rawData, dateToWeek)
      },
      formatDay () {
        this.labelsDay = this.rawData
          .map(entry => dateToDay(entry.published_at))
          .reduce(removeDuplicate, [])
        this.salesDay = groupData(this.rawData, dateToDay)
      },

      toggleSettings () {
        this.showSettings = !this.showSettings
        this.$ga.event({
          eventCategory: 'Settings',
          eventAction: 'toggle'
        })
      },
      fillDayWeek () {
    
      this.toggleDay ? this.toggleDay = false : this.toggleDay = true
      this.loaded=false
      this.requestData ()
      if(this.toggleDay){
      this.period="per Day"
      this.salesDisplay=this.salesDay
      this.labelsDisplay=this.labelsDay
       
      }else{
      this.period="per Week"
      this.salesDisplay=this.salesWeek
      this.labelsDisplay=this.labelsWeek
      }   
      
      },
      fillMonthYear () {
    
      this.toggleMonth ? this.toggleMonth = false : this.toggleMonth = true
      this.loaded=false
      this.requestData ()
      if(this.toggleMonth){
      this.period="per Month"
      this.salesDisplay=this.salesMonth
      this.labelsDisplay=this.labelsMonth
      }else{
      this.period="per Year"
      this.salesDisplay=this.salesYear
      this.labelsDisplay=this.labelsYear
      }   
      this.loaded=false
      }
      
    }
  


}//end export
</script>

<style>


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/*css reset*/
/*****************/
body{
 background-color:black;
 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 800px;
  margin:  0 auto;
}
.Chart {
  
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}

.myButton {
	-moz-box-shadow: 0px 1px 0px 0px #1c1b18;
	-webkit-box-shadow: 0px 1px 0px 0px #1c1b18;
	box-shadow: 0px 1px 0px 0px #1c1b18;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #eae0c2), color-stop(1, #ccc2a6));
	background:-moz-linear-gradient(top, #eae0c2 5%, #ccc2a6 100%);
	background:-webkit-linear-gradient(top, #eae0c2 5%, #ccc2a6 100%);
	background:-o-linear-gradient(top, #eae0c2 5%, #ccc2a6 100%);
	background:-ms-linear-gradient(top, #eae0c2 5%, #ccc2a6 100%);
	background:linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#eae0c2', endColorstr='#ccc2a6',GradientType=0);
	background-color:#eae0c2;
	-moz-border-radius:15px;
	-webkit-border-radius:15px;
	border-radius:15px;
	
	display:inline-block;
	cursor:pointer;
	color:#505739;
	font-family:Arial;
	font-size:14px;
	font-weight:bold;
	padding:12px 16px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
}
.myButton:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ccc2a6), color-stop(1, #eae0c2));
	background:-moz-linear-gradient(top, #ccc2a6 5%, #eae0c2 100%);
	background:-webkit-linear-gradient(top, #ccc2a6 5%, #eae0c2 100%);
	background:-o-linear-gradient(top, #ccc2a6 5%, #eae0c2 100%);
	background:-ms-linear-gradient(top, #ccc2a6 5%, #eae0c2 100%);
	background:linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ccc2a6', endColorstr='#eae0c2',GradientType=0);
	background-color:#ccc2a6;
}
.myButton:active {
	position:relative;
	top:1px;
}

/* The alert message box */
.alert {
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
}

/* The close button */
.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}

</style>