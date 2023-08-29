const { createApp, ref, onMounted } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

const app = createApp({
  setup() {
    const rawData = [
      {
        value: 1,
        isRead: false
      },
      {
        value: 2,
        isRead: false
      },
      {
        value: 3,
        isRead: false
      },
      {
        value: 4,
        isRead: false
      },
      {
        value: 5,
        isRead: true
      }
    ];

    const selectedItem = ref({});
    let myChart = null
    
    function select(index) {
      rawData[index].isRead = true;
      selectedItem.value = rawData[index];
      
      if (myChart) {
        myChart.update();
      }
    }

    const getOrCreateLegendList = (chart, id) => {
      const legendContainer = document.getElementById(id);
      let listContainer = legendContainer.querySelector("ul");

      if (!listContainer) {
        listContainer = document.createElement("ul");
        listContainer.style.display = "flex";
        listContainer.style.flexDirection = "row";
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;

        legendContainer.appendChild(listContainer);
      }

      return listContainer;
    };

    const HtmlLegendPlugin = {
      id: "htmlLegend",
      afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
          ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item) => {
          const li = document.createElement("li");
          li.style.alignItems = "center";
          li.style.cursor = "pointer";
          li.style.display = "flex";
          li.style.flexDirection = "row";
          li.style.marginLeft = "10px";
          li.style.position = "relative";
          li.onclick = () => {
            select(item.index)
          };

          // Color box
          const boxSpan = document.createElement("span");
          boxSpan.style.background = item.fillStyle;
          boxSpan.style.borderColor = item.strokeStyle;
          boxSpan.style.borderWidth = item.lineWidth + "px";
          boxSpan.style.display = "inline-block";
          boxSpan.style.flexShrink = 0;
          boxSpan.style.height = "10px";
          boxSpan.style.marginRight = "6px";
          boxSpan.style.width = "10px";

          // Text
          const textContainer = document.createElement("p");
          textContainer.style.color = item.fontColor;
          textContainer.style.fontSize = '12px';
          textContainer.style.margin = 0;
          textContainer.style.padding = 0;
          textContainer.style.textDecoration = item.hidden
            ? "line-through"
            : "";

          // Unread dot
          const dotContainer = document.createElement("span");
          if (!rawData[item.index].isRead) {
            dotContainer.style.background = "#ff0000";
            dotContainer.style.display = "inline-block";
            dotContainer.style.borderRadius = "50px";
            dotContainer.style.position = "absolute";
            dotContainer.style.top = "0px";
            dotContainer.style.right = "-6px";
            dotContainer.style.height = "6px";
            dotContainer.style.width = "6px";
          }

          const text = document.createTextNode(item.text);
          textContainer.appendChild(text);

          li.appendChild(boxSpan);
          li.appendChild(textContainer);
          li.appendChild(dotContainer);
          ul.appendChild(li);
        });
      }
    };

    const data = {
      labels: ["Blue", "Red", "Orange", "Yellow", "Green"],
      datasets: [
        {
          label: "Dataset 1",
          data: rawData.map(({ value }) => value)
        }
      ]
    };

    const config = {
      type: "doughnut",
      data: data,
      plugins: [ChartDataLabels, HtmlLegendPlugin],
      options: {
        onClick: (event, el) => {
          select(el[0].index)
        },
        responsive: true,
        plugins: {
          datalabels: {
            color: "#ffffff"
          },
          htmlLegend: {
            containerID: "legend-container"
          },
          legend: {
            display: false,
            position: "top"
          },
          title: {
            display: true,
            text: "Chart.js Doughnut Chart"
          }
        }
      }
    };

    Chart.defaults.font.family = "Poppins";

    onMounted(() => {
      const ctx = document.querySelector("#myChart");
      myChart = new Chart(ctx, config);
    });

    return {
      selectedItem
    };
  }
});
app.use(vuetify).mount("#app");
