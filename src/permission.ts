import router from './router'
import { useNProgress } from '@/hooks/useProgress'
import { getToken } from '@/utils/token'
import useUser from '@/stores/modules/user'
const { start, done } = useNProgress()

const userStore = useUser()
const whiteList: string[] = []
router.beforeEach(async (to, _, next) => {
  start()
  if (whiteList.indexOf(to.path) !== -1) {
    // 白名单不校验权限
    next(false)
  } else if (getToken()) {
    // debugger;
    // 是否登录
    if (!userStore?.userInfo?.id) {
      userStore.getInfo()
    }
    next()
  } else {
   // 登录
  }
})

router.afterEach(() => {
  done()
})
