<template>
  <div ref="pieChart" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { type ECOption, useEcharts } from "~/hooks";

const pieOptions = ref({
  title: {
    text: "Referer of a Website",
    subtext: "Fake Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      label: {
        show: true,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}) as Ref<ECOption>;

const { domRef: pieChart } = useEcharts(pieOptions);

function updateData() {
  pieOptions.value = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        label: {
          show: true,
        },
        data: [
          { value: Math.floor(Math.random() * 100), name: "Search Engine" },
          { value: Math.floor(Math.random() * 100), name: "Direct" },
          { value: Math.floor(Math.random() * 100), name: "Email" },
          { value: Math.floor(Math.random() * 100), name: "Union Ads" },
          { value: Math.floor(Math.random() * 100), name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
}


updateData()
</script>
