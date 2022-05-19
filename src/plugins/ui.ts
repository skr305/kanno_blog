import { App } from 'vue'
import { User, Badge, Spacer, GridGroup, Grid, Link, Avatar, Card, Image, Dot, Tabs, Tab, Code } from '@fect-ui/vue'

Image.name = 'feImg'

const UI = [User, Badge, Spacer, GridGroup, Grid, Link, Avatar, Card, Image, Dot, Tabs, Tab, Code]

export default function (instance: App) {
  UI.forEach((_) => instance.use(_))
  return instance
}
