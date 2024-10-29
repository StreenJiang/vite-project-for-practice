<script setup>
import Image from 'primevue/image';
import Barcode from '../widgets/barcode.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

const test = (event) => {
    let left = Math.round(event.sizes[0])
    let right = Math.round(event.sizes[1])

    console.log(event.sizes);
    console.log(left, right);
};

</script>

<template>
    <div class="w-full h-full">
        <Splitter class="w-full h-full sxga:p-1 sxga:pt-2.5 sxga:pb-2.5 sm:p-0.5 sm:pt-1.5 sm:pb-1.5" style="border-radius: 0px; background-color: transparent; border: 0px;" :gutterSize="4" pt:gutter:class="bg-gray-900" @resizeend="test" >
            <SplitterPanel class="" :size="75" :minSize="55">
                <div class="w-full h-full flex flex-col">
                    <Barcode class="sxga:m-3 sxga:mt-0 sm:m-1.5 sm:mt-0" />
                    <div class="w-full h-full sxga:pl-3 sxga:pr-3 sxga:pb-0 sm:pl-1.5 sm:pr-1.5 sm:pb-0">
                        <div class="bg-gray-400 w-full h-full rounded-md sxga:p-1 sm:p-0.5">
                            <Image pt:image:class="w-4/5 h-4/5" alt="Image" src="src/assets/product_image_sample.jpg" />
                        </div>
                    </div>
                </div>
            </SplitterPanel>
            <SplitterPanel class="" :size="25" :minSize="20">
                <div class="sxga:m-3 sm:m-1.5">
                    Here has to place something....
                </div>
            </SplitterPanel>
        </Splitter>
    </div>
</template>