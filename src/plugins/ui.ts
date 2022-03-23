import {
  User,
  Badge,
  Spacer,
  GridGroup,
  Grid,
  Link,
  Avatar,
  Card,
  Image,
  Dot,
  Tabs,
  Tab,
  Skeleton,
  SkeletonItem
} from '@fect-ui/vue'

Image.name = 'feImg'

import '@fect-ui/themes'
import '@fect-ui/vue/lib/main.css'

const UI = [User, Badge, Spacer, GridGroup, Grid, Link, Avatar, Card, Image, Dot, Tabs, Tab, Skeleton, SkeletonItem]

export const UIRegister = (instance) => UI.map((_) => instance.use(_))
