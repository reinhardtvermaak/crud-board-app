<template>
<div 
    class="thing-list-item card text-dark m-2"
    :class="{'item-flagged' : flagged}"
    @mouseover="hoverOn"
    @mouseleave="hoverOff"
    @click="showDetail"
>
    <div>
        <div v-show=!editingTitle>
            <span>{{ title }}</span>
            
            <span v-show="hoverStatus" class="item-option-group">
                <button @click.stop="editTitle" class="item-options-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>

                <button @click.stop="flagThing" v-if=!flagged class="item-options-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                    </svg>
                </button>
                <button @click.stop="flagThing" v-else class="item-options-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                    </svg>
                </button>
                
                <button @click.stop="removeThing" class="item-options-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>
            </span>
        </div>
        <div v-show=editingTitle v-click-outside="cancelEditTitle">
            <input @click.stop="" autoFocus type="text" class="input-group input-group-sm" v-model="tempTitle">
            <button class="edit-thing-button" @click.stop="updateThing">Done</button>
        </div>
    </div>
    
    <thing-detail 
        v-if="isSelected"
        :id="info.id"
        :keywords="info.keywords"
    >
    </thing-detail>
</div>
</template>

<script>
import ThingDetail from './ThingDetail.vue'

export default {
    components: { ThingDetail },
    name: "Thing",
    props: {
        'title': String,
        'flagged': Boolean,
        'info': Object
    },

    data() {
        return {
            'tempTitle': "",
            'hoverStatus': false,
            'editingTitle': false,
            'isSelected': false
        }
    },

    methods: {
        editTitle: function() {
            this.editingTitle = true;
            this.tempTitle = this.title;
        },
        hoverOn: function() {
            this.hoverStatus = true;
        },
        hoverOff: function() {
            this.hoverStatus = false;
        },
        cancelEditTitle: function() {
            this.editingTitle = false;
        },
        removeThing: function() {
            this.$emit('remove-thing');
        },
        flagThing: function() {
            this.$emit('flag-thing');
        },
        showDetail() {
            this.isSelected = !this.isSelected;
            this.hoverOff();
        },
        updateThing() {
            if (this.tempTitle !== "") {
                this.editingTitle = false;
                this.$emit('update-title', this.tempTitle);
                this.tempTitle = "";
            }
        }
    }
}



</script>

<style lang="scss" scoped>

    .item-option-group {
        position: absolute;
        right: 0;
        background: lightgray;
        box-shadow: -3px 0px 2px 2px lightgray;

        .item-options-button {
            z-index: 1;
            right: 0;
            border-width: 0px;
            outline: none;
            background: transparent;
        }
    }

    .thing-list-item {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: none;
        border-bottom: 1px solid darkgrey;
        cursor: pointer;

        &:hover {
            background:lightgrey;
        }
    }

    .item-flagged {
        background-color: lightcoral;

        &:hover.thing-list-item:hover {
            background:lightcoral;
        }
        .item-option-group {
            background:lightcoral;
            box-shadow: -3px 0px 2px 2px lightcoral;
        }
    }

    .item_flagged >>> .keyword:hover {
        background: black;
    }

    .edit-thing-button {
        position: absolute;
        z-index: 1;
        right: -101px;
        top: 0;
        height: 41px;
        min-width: 96px;
        border-radius: 4px;
        border: 1px solid darkgray;
        outline: none;
        margin-bottom: 0.5rem;
        background: white;
        &:hover {
            background-color: lightgray;
        }
    }
</style>