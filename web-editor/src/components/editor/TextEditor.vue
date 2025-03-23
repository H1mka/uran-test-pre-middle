<template>
  <div class="text-editor">
    <div class="editor-actions">
      <div class="left-side">
        <button
          v-for="(button, index) in editorActions"
          class="editor-action-btn"
          :key="index"
          :class="{ isActive: isActiveButton(button.command) }"
          @click="applyCommand(button.command)"
        >
          {{ button.label }}
        </button>
        <button class="editor-action-btn" @click="createLink">
          Create link
        </button>
      </div>
      <div class="right-side">
        <button class="editor-action-btn editor-save" @click="saveText">
          Save text
        </button>
      </div>
    </div>

    <div
      class="editor-content"
      ref="editorContent"
      contenteditable="true"
      @mouseup="checkSelectionStyle"
      @keyup="checkSelectionStyle"
      @click="handleEditorClick"
    ></div>
  </div>
</template>

<script>
import { LocalStorageService } from '@/api'
import { TEXT_EDITOR_STORAGE_NAME } from '@/constants/constants'
import { helper } from '@/helpers/helper'

export default {
  data: () => ({
    activeStyles: {
      bold: false,
      italic: false,
      insertUnorderedList: false,
      insertOrderedList: false
    },
    editorActions: [
      { command: 'bold', label: 'Bold' },
      { command: 'italic', label: 'Italic' },
      { command: 'insertUnorderedList', label: 'Unordered list' },
      { command: 'insertOrderedList', label: 'Ordered list' }
    ]
  }),
  mounted() {
    this.getText()
  },
  methods: {
    applyCommand(command, value = null) {
      this.$refs.editorContent.focus()

      document.execCommand(command, false, value)
      this.checkSelectionStyle()
    },
    createLink() {
      const url = prompt('Enter link', 'https://')
      if (!url || url.endsWith('https://')) return

      this.applyCommand('createLink', url)
    },
    checkSelectionStyle() {
      // сheck if the style is applied
      Object.keys(this.activeStyles).forEach((key) => {
        this.activeStyles[key] = document.queryCommandState(key)
      })
    },
    isActiveButton(key) {
      return this.activeStyles[key] || false
    },
    handleEditorClick(event) {
      if (event.target.tagName === 'A') {
        helper.openLinkInNewTab(event.target)
      }
    },
    saveText() {
      const text = this.$refs.editorContent.innerHTML || ''
      LocalStorageService.set(TEXT_EDITOR_STORAGE_NAME, text)
    },
    getText() {
      const value = LocalStorageService.get(TEXT_EDITOR_STORAGE_NAME) || ''
      this.$refs.editorContent.innerHTML = value
    }
  }
}
</script>

<style lang="scss">
.text-editor {
  .editor-content {
    border: 1px solid black;
    border-radius: 4px;
    min-height: 200px;
    padding: 4px 8px;
    outline: none;
    font-size: 16px;

    a {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }

    ul,
    ol {
      margin: 8px 0;
      padding: 0 0 0 32px;
    }
  }

  .editor-actions {
    display: flex;
    margin-bottom: 10px;

    .left-side {
      flex: 1 0 auto;
      display: flex;
      gap: 6px;
    }

    .editor-action-btn {
      font-size: 18px;
      padding: 6px 12px;
      border: 1px solid gray;
      border-radius: 6px;
      cursor: pointer;

      &.isActive {
        font-weight: bold;
      }

      &.editor-save {
        background-color: #27ae60;

        &:hover {
          background-color: #1d8247;
        }
      }
    }
  }
}
</style>
