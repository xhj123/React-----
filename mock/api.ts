export default {
  'GET /user/getUserDetail':{
    status: 200,
    message: 'success',
    data:{
      name: 'xiahaojie',
      age: 27,
      country: 'cn'
    }
  },
  'GET /music/getRecommendMusic':{
    status: 200,
    message: 'success',
    data:{
      name: '天下',
      author: '张杰',
      background: 'https://p1.music.126.net/jJvI8mHDBYOZImfhBOfRVQ==/109951163631692376.jpg?param=400y400',
      type: '电子音乐',
      alias: 'Electronics',
      audio: 'http://m7.music.126.net/20190901013155/5ef9b09c9aa02b5e7c1916592989df85/yyaac/045a/005c/035d/304d9fdd7876033ad72f479b7797aea8.m4a#t=123',
      last: 135,
      id: 9527
    }
  },
  'GET /music/collectMusicById':{
    status: 200,
    message: 'success',
    data:''
  },
  'GET /music/getGroupMusic':{
    status: 200,
    message: 'success',
    data:{
      group1 : [
        {
          name:'电音',
          id:1
        },
        {
          name: '爵士',
          id:2
        },
        {
          name:'古典',
          id:3
        }
      ],
      group2 : [
        {
          name:'最新电音',
          group1Id: 1,
          id:1
        },
        {
          name:'氛围',
          group1Id: 2,
          id:2
        },
        {
          name:'作曲家',
          group1Id: 3,
          id:3
        },
        {
          name:'时代',
          group1Id: 4,
          id:3
        }
      ],
      group3: [
        {
          name:'心墙',
          group2Id:1
        },
        {
          name:'醉赤壁',
          group2Id:1
        },
        {
          name:'告白气球',
          group2Id:1
        },
        {
          name:'天下',
          group2Id:2
        },
        {
          name:'修炼爱情',
          group2Id:2
        },
        {
          name:'红昭愿',
          group2Id:3
        },
        {
          name:'空空如也',
          group2Id:3
        },
        {
          name:'江南',
          group2Id:4
        },
        {
          name:'叹郁孤',
          group2Id:4
        }
      ]
    }
  }
}
