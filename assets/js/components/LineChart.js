import { Line, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default Line.extend({
    mixins: [reactiveProp],
     props: {
      chartData: {
        type: Array,
        required: false
      },
       chartLabels: {
        type: Array,
        required: true
      }
     },
       mixins: [reactiveProp],
    data () {
      return {
      gradient: null,
      options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true,
            callbacks: {
              label: function (tooltipItems, data) {

                return '$ ' + tooltipItems.yLabel
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
       
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
      this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
      this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)')    
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Sales',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: this.gradient,
            data: this.chartData
          }
        ]
      }, this.options)
    },
    created () {

    }
})