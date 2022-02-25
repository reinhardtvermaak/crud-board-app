
<template>
    <div class="thing-details">
        <div class="thing-details-id">
            ID: {{ id }}
        </div>
        <div class="thing-details-keys">
            Keywords: 
            <div 
                v-for="keyword in keywords"
                :key="keyword"
                class="keyword"
            >
                {{ keyword }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ThingDetail",
    props: {
        "id": String,
        "keywords": []
    }
}
</script>

<style lang="scss" scoped>
    .thing-details {
        display: flex;
        flex-direction: column;
        margin: 15px 15px 10px 15px;
        background-color: transparent;
        border: none;
        text-align: left;
        font-size: 11pt;

        .thing-details-keys {
            display: flex;
            flex-direction: row;

            .keyword {
                border: 1px solid black;
                border-radius: 5px;
                padding: 0px 8px;
                margin-left: 4px;

                &:hover {
                    background: darkgray;
                }
            }
        }
    }
</style>