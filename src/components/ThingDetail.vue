
<template>
    <div class="thing-details">
        <p> <strong>Details: </strong></p>
        <div class="thing-details-name">
            Name: {{ thing.name }}
        </div>
        <div class="thing-details-id">
            ID: {{ thing.id }}
        </div>
        <div class="thing-details-keys">
            Keywords: 
            <div 
                v-for="keyword in thing.keywords"
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
    props: ["thing"]
}
</script>

<style lang="scss" scoped>
    .thing-details {
        display: flex;
        flex-direction: column;
        margin: 16px;
        background-color: white;
        border: 1px solid darkgray;

        .thing-details-keys {
            display: flex;
            flex-direction: row;
            padding: 8px;

            .keyword {
                border: 1px solid grey;
                border-radius: 5px;
                padding: 0px 8px;
            }
        }
    }
</style>