<script setup>
import Image from 'primevue/image';
import Barcode from '../widgets/barcode.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';



</script>

<template>
    <div class="w-full h-full">
        <Splitter class="w-full h-full p-1" style="border-radius: 0px; background-color: transparent; border: 0px;" :gutterSize="5" pt:gutter:class="bg-gray-900">
            <SplitterPanel class="" :size="75" :minSize="55">
                <div class="w-full h-full flex flex-col">
                    <Barcode class="m-3" />
                    <div class="w-full h-full pl-3 pr-3 pb-3">
                        <div class="bg-gray-200 w-full h-full rounded-md p-1">
                            <Image pt:image:class="w-4/5 h-4/5" alt="Image" src="src/assets/product_image_sample.jpg" />
                        </div>
                    </div>
                </div>
            </SplitterPanel>
            <SplitterPanel class="" :size="25" :minSize="20">
                <div class="m-3 text-gray-100">
                    Here has to place something....
                </div>
            </SplitterPanel>
        </Splitter>
    </div>
</template>