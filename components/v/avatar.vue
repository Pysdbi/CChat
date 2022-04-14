<template>
    <div
        class="flex items-center justify-center"
        :style="{
            height: `${size}${typeof +size === 'number' ? 'px': ''}`,
            width: `${size}${typeof +size === 'number' ? 'px': ''}`,
        }"
    >
        <div
            class="rounded-full border border-white/10 overflow-hidden flex items-center"
            :style="{
                height: `${size}${typeof +size === 'number' ? 'px': ''}`,
                width: `${size}${typeof +size === 'number' ? 'px': ''}`,
            }"
        >
            <img
                class="object-cover"
                :src="src"
                alt=""
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AvatarComponent",
    props: {
        src: {
            type: String,
            default: ""
        },
        size: {
            type: [String, Number],
            default: 42
        }
    },
    computed: {
        bgSrc() {
            return `bg-[url('${this.src}')]`;
        }
    }
};
</script>

