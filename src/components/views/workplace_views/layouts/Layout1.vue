<script setup>
import Image from 'primevue/image';
import Barcode from '../widgets/barcode.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';



</script>

<template>
    <div class="w-full h-full">
        <Splitter class="w-full h-full sxga:p-1 sm:p-0.5" style="border-radius: 0px; background-color: transparent; border: 0px;" :gutterSize="5" pt:gutter:class="bg-gray-900">
            <SplitterPanel class="" :size="75" :minSize="55">
                <div class="w-full h-full flex flex-col">
                    <Barcode class="sxga:m-3 sm:m-1.5" />
                    <div class="w-full h-full sxga:pl-3 sxga:pr-3 sxga:pb-3 sm:pl-1.5 sm:pr-1.5 sm:pb-1.5">
                        <div class="bg-gray-200 w-full h-full rounded-md sxga:p-1 sm:p-0.5">
                            <Image pt:image:class="w-4/5 h-4/5" alt="Image" src="src/assets/product_image_sample.jpg" />
                        </div>
                    </div>
                </div>
            </SplitterPanel>
            <SplitterPanel class="" :size="25" :minSize="20">
                <div class="text-gray-100 sxga:m-3 sm:m-1.5">
                    Here has to place something....
                </div>
            </SplitterPanel>
        </Splitter>
    </div>
</template>