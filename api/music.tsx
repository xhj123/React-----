import server from '../config/request'


export const getRecommendMusic = (params:object) => server.get('/music/getRecommendMusic',params)

export const getCollectMusicById = (params:object) => server.get('/music/collectMusicById',params)

export const getGroupMusic = (params:object) => server.get('/music/getGroupMusic',params)
