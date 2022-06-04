<script>
import {Line, mixins} from "vue-chartjs";

const {reactiveProp} = mixins;

export default {
  name: "EvolutionMainNumberOpinion",
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "yAxes"],
  data: () => ({
    type: "line",
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      plugins: {
        datalabels: {
          display: true,
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 0,
          bottom: 10,
        },
      },
      showTooltips: false,
      clip: {left: 15, top: false, right: -2, bottom: 0},
      scales: {
        clip: {left: 15, top: false, right: -2, bottom: 0},
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Number of reuses/containers',
            },
            gridLines: {
              drawBorder: false,
              display: false,
            },
          },
        ],
        yAxes: [
        ],
      },
    },
  }),
  watch: {
    "chartData.datasets": {
      deep: true,
      handler() {
        this.render();
      },
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      if (this.yAxes) {
        this.options.scales.yAxes = this.yAxes
      }
      this.renderChart(
          JSON.parse(JSON.stringify(this.chartData)),
          this.options
      );
    },
  },
};
</script>
