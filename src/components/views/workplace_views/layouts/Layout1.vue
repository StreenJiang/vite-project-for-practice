<script setup>
import Barcode from '../widgets/barcode.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import UserId from '../widgets/UserId.vue';
import UserName from '../widgets/UserName.vue';
import ParameterSet from '../widgets/ParameterSet.vue';
import ProductImage from '../widgets/ProductImage.vue';
import WorkingStatus from '../widgets/WorkingStatus.vue';
import WorkingData from '../widgets/WorkingData.vue';

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
                    <ProductImage />
                </div>
            </SplitterPanel>
            <SplitterPanel class="" :size="25" :minSize="20">
                <Splitter class="w-full h-full" style="border-radius: 0px; background-color: transparent; border: 0px;" :gutterSize="4" layout="vertical">
                    <SplitterPanel class="sxga:mb-3 sm:mb-1.5" :size="25" :minSize="25">
                        <div class="bg-gray-400 h-full flex flex-col justify-around rounded-md sxga:ml-3 sxga:mr-3 sm:ml-1.5 sm:mr-1.5">
                            <UserId class="sxga:m-3 sxga:mt-4 sm:m-1.5 sm:mt-2.5" />
                            <UserName class="sxga:m-3 sxga:mt-1 sm:m-1.5 sm:mt-0.5" />
                            <ParameterSet class="sxga:m-3 sxga:mt-1 sm:m-1.5 sm:mt-0.5" />
                        </div>
                    </SplitterPanel>
                    <SplitterPanel class="sxga:mt-3 sxga:mb-3 sm:mt-1.5 sm:mb-1.5" :size="35" :minSize="25">
                        <div class="h-full flex flex-col rounded-md sxga:ml-3 sxga:mr-3 sm:ml-1.5 sm:mr-1.5">
                            <WorkingStatus />
                        </div>
                    </SplitterPanel>
                    <SplitterPanel class="sxga:mt-3 sm:mt-1.5" :size="40" :minSize="30">
                        <div class="bg-gray-400 h-full flex flex-col rounded-md sxga:ml-3 sxga:mr-3 sm:ml-1.5 sm:mr-1.5">
                            <WorkingData />
                        </div>
                    </SplitterPanel>
                </Splitter>

            </SplitterPanel>
        </Splitter>
    </div>
</template>