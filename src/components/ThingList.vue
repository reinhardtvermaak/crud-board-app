<template>
    <div class="thing-list card bg-light">
        <h5 class="card-title">My things</h5>
        
        <div class="text-dark bg-light">
            <!-- Render the items loaded from the db -->
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
                        v-on:remove-thing="removeThing(index, thing.id)"
                        v-on:flag-thing="flagThing(index)"
                        v-on:update-title="updateTitle(arguments, index, thing.id)"
                     />
                </div>
            </div>

            <!-- Show a spinner until things are loaded from db -->
            <div v-else class="thing-list-item">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-secondary" role="status"></div>
                </div>
            </div>
        </div>

        <!-- Creating a new item button/input -->
        <div v-if="!creatingNewItem"
            class="new-thing-button thing-list-item card text-dark m-2"
            @click="addItemMode"
        >
            &#65291; Add a thing
        </div>
        <div v-else v-click-outside="cancelAddItemMode">
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
import axios from "axios";
import Thing from './Thing.vue'

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
        let apiURL = 'http://localhost:5001/api/things';
        axios.get(apiURL).then(res => {
            this.things = res.data;
        }).catch(error => {
            console.log(error)
        });
    },

    computed: {
        hasThings() {
            return this.things.length > 0
        }
    },

    methods: {
        removeThing(index, id) {
            let apiURL = `http://localhost:5001/api/things/delete/${id}`;
            axios.delete(apiURL).then(() => {
                if (this.isFlagged(index)) {
                    this.unflag(index)
                }
                this.things.splice(index, 1)
            }).catch(error => {
                console.log(error)
            });
        },
        flagThing(id) {
            if (this.isFlagged(id)) {
                this.unflag(id)
            } else {
                this.flagged.push(id)
            }
        },
        updateTitle(args, index, id) {
            let apiURL = `http://localhost:5001/api/things/edit/${id}`;
            let newName = args[0];
            let changes = JSON.parse(`{ "name": "${newName}" }`)
            axios.post(apiURL, changes).then(() => {
                this.things.at(index).name = newName;
            }).catch(error => {
                console.log(error)
            });
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
        addItemMode() {
            this.creatingNewItem = true;
        },
        cancelAddItemMode() {
            this.creatingNewItem = false;
        },
        furnishNewThing(title) {
            // We have a new thing. Push to db and component data to be rendered.
            if (title !== "") {
                let apiURL = `http://localhost:5001/api/things/`;
                let changes = JSON.parse(`{ "name": "${title}" }`)
                axios.post(apiURL, changes).then(res => {
                    this.things.push({"name": res.data.name, "keywords": res.data.keywords, "id": res.data.id});
                    this.creatingNewItem = false;
                    this.tempTitle = "";
                }).catch(error => {
                    console.log(error)
                });
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