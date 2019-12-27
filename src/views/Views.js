import Film from './film/Film'; //电影
import TvSeries from './tvSeries/TvSeries'; //电视剧
import Anime from './anime/Anime'; //动漫
import Variety from './variety/Variety'; //综艺
import TabarDetail from './tabarDetail/TabarDetail'; //底部菜单明细
// 底部菜单路由
const TabNav = {
  Film: {
    screen: Film,
  },
  TvSeries: {
    screen: TvSeries,
  },
  Variety: {
    screen: Variety,
  },
  Anime: {
    screen: Anime,
  },
};
// 页面路由
const Pages = {
  TabarDetail: {
    screen: TabarDetail,
  },
};
module.exports = {TabNav, Pages};
