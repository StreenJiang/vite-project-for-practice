<script setup>
import { ref } from 'vue';
import { useTemplateRef } from 'vue';

const mainStatus = ref("未激活");

const workingStatus = useTemplateRef("workingStatus");
// const element = document.querySelector('.your-element');

if (workingStatus.scrollHeight > workingStatus.clientHeight) {
  console.log('内容溢出');
} else {
  console.log('内容未溢出');
}

</script>

<template>
    <div class="w-full h-full flex flex-col">
        <div ref="workingStatus" class="rounded-md bg-sky-700 flex-grow-[1.4] basis-0 flex flex-col justify-around overflow-hidden">
            <label for="" class="flex-shrink text-center font-bold text-sky-50 fhd:text-7xl hdp:text-4xl sxga:text-5xl sm:text-4xl">{{ mainStatus }}</label>
        </div>
        <div class="flex-grow-[1] basis-0 flex sxga:mt-3 sxga:gap-3 sm:mt-1.5 sm:gap-1.5">
            <div class="flex-grow-[1] basis-0 h-full bg-slate-300 rounded-md flex flex-col justify-between">
                <label for="" class="font-bold fhd:text-5xl sxga:text-3xl sxga:m-2 sm:text-2xl sm:m-1">999.99</label>
                <label for="" class="text-right font-bold fhd:text-lg sxga:text-base sxga:m-1 sm:text-sm sm:m-0.5">扭矩（N·m）</label>
            </div>
            <div class="flex-grow-[1] basis-0 h-full bg-slate-300 rounded-md flex flex-col justify-between">
                <label for="" class="font-bold fhd:text-5xl sxga:text-3xl sxga:m-2 sm:text-2xl sm:m-1">99999</label>
                <label for="" class="text-right font-bold fhd:text-lg sxga:text-base sxga:m-1 sm:text-sm sm:m-0.5">角度（°）</label>
            </div>
        </div>
    </div>
</template>