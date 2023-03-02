import { HYEventStore } from 'hy-event-store'
import { getRankings } from '../api/api-music'
export const rankingStore= new HYEventStore({
  state:{
    hotRanking:{}
  },
  actions:{
    getRankingDataAction(ctx){
      getRankings(1).then(res=>{
        ctx.hotRanking=res
      })
    }
  }
})