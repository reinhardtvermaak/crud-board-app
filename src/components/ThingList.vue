<template>
    <div class="thing-list card bg-light">
        <h5 class="card-title">My things</h5>
        
        <div class="text-dark bg-light">
            <!-- <button @click="fetchList">Refresh</button> -->
            <div v-if="hasThings">
                <div 
                    v-for="(thing, index) in things" 
                    :key="index"
                    @click="selectThing(index)"
                >
                    <thing 
                        :title="thing.name" 
                        :flagged="isFlagged(index)"
                        :info="thing"
                        v-on:remove-thing="removeThing(index)"
                        v-on:flag-thing="flagThing(index)"
                        v-on:update-title="updateTitle(arguments, index)"
                     />
                </div>
            </div>

            <div v-else class="thing-list-item">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-secondary" role="status"></div>
                </div>
            </div>
        </div>

        <div v-if="!creatingNewItem"
            class="new-thing-button thing-list-item card text-dark m-2"
            @click="addItem"
        >
            &#65291; Add a thing
        </div>
        <div v-else v-click-outside="cancelAddItem">
            <span
                class="new-thing-button thing-list-item card text-dark m-2"
            >
                <span class="input-group input-group-sm">
                    <input autoFocus type="text" v-model="tempTitle">
                </span>
            </span>
            <button class="btn" @click="furnishNewThing(tempTitle)">Add</button>
        </div>
    </div>
</template>

<script>
import Thing from './Thing.vue'
// import ThingDetail from './ThingDetail.vue'
import { getThings } from '../api/'

export default {
	components: { Thing },
    
    name: "ThingList",

    data() {
        return {
            things: [],
            flagged: [],
            selectedId: null,
            creatingNewItem: false,
            tempTitle: ""
        }
    },

    mounted() {
        this.fetchList()
    },
    computed: {
        hasThings() {
            return this.things.length > 0
        }
    },
    methods: {
        removeThing(id) {
            // mutates the state and removes the thing
            if (this.isFlagged(id)) {
                this.unflag(id)
            }
            this.things.splice(id, 1)
        },
        flagThing(id) {
            if (this.isFlagged(id)) {
                this.unflag(id)
            } else {
                this.flagged.push(id)
            }
        },
        updateTitle(args, index) {
            this.things.at(index).name = args[0];
        },
        unflag(id) {
            this.flagged = this.flagged.filter( i => i !== id)
        },
        isFlagged(id) {
            return this.flagged.includes(id)
        },
        selectThing(id) {
            this.selectedId = this.isSelected(id) ? null : id
        },
        isSelected(id) {
            return this.selectedId === id
        },
        async fetchList() {
            this.things = await getThings()
        },
        addItem() {
            this.creatingNewItem = true;
        },
        cancelAddItem() {
            this.creatingNewItem = false;
        },
        furnishNewThing(title) {
            if (title !== "") {
                this.things.push({"name": title, "keywords": [], "id": ""})
                this.creatingNewItem = false;
                this.tempTitle = "";
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .thing-list {
        display: flex;
        flex-direction: column;
        max-width: 350px;
        border: none;
        margin: 0.5rem auto;
        box-shadow: 0px 2px 3px lightgray;

        .card-title {
            margin-top: 0.9rem;
        }

        .thing-list-item {
            display: flex;
            flex-direction: column;
            padding: 8px;
            border: none;
            border-bottom: 1px solid darkgrey;

            &:hover {
                background:lightgrey;
            }
        }

        button {
            min-width: 96px;
            border-radius: 4px;
            border: 1px solid darkgray;
            outline: none;
            margin-bottom: 0.5rem;
            &:hover {
                background-color: white;
            }
        }

        ::v-deep input {
            outline: none;
            border-width: 0em;
            background-color: transparent;
            text-align: center;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }

        .new-thing-button {
            cursor: pointer;
        }
    }
</style>