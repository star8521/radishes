import { defineComponent, ref } from 'vue'
import { importIpc } from '@/electron/event/ipc-browser'
import { MiddlewareView } from '@/electron/event/action-types'
import './setting.less'
import { Platform } from '@/config/build'

const { VUE_APP_PLATFORM } = process.env

export const Setting = defineComponent({
  name: 'Setting',
  setup() {
    const color = ref('#ef4a4a')
    const visibleColor = ref(false)
    return {
      color,
      visibleColor
    }
  },
  render() {
    const clickHandler = (value: string) => {
      this.visibleColor = false
      document.documentElement.style.setProperty('--base-color', value)
      document.documentElement.style.setProperty('--primary-theme-text', value)
      if (VUE_APP_PLATFORM === Platform.ELECTRON) {
        importIpc().then(event => {
          event.sendAsyncIpcRendererEvent(
            MiddlewareView.UPDATE_THEME_COLOR,
            value
          )
        })
      }
    }
    const { color } = this
    const ColorPicker = {
      content: () => (
        <ve-color-picker
          simple
          v-model={color}
          onChange={clickHandler}
        ></ve-color-picker>
      ),
      default: () => <icon icon="skin"></icon>
    }

    return (
      <div class="setting">
        <ve-button type="text" class="header-window-btn">
          <icon icon="setting"></icon>
        </ve-button>
        <ve-button type="text" class="header-window-btn">
          <a-popover
            v-model={[this.visibleColor, 'visible']}
            trigger="click"
            v-slots={ColorPicker}
          ></a-popover>
        </ve-button>
      </div>
    )
  }
})
