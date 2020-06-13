import music from "./music"
let map = {
  music
}
let country = 'cn'

export const setCountry = (ct:string) => {
  country = ct
}

const  il8n = (key:string) => {
  return map[key][country]
}

export default il8n
